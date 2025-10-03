use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer, Mint};

declare_id!("BCmS4ysuv5rY6UZMS9vKh7DYucyDfD2DQvzniLNMKdHk");

// Constants
const DAILY_REWARD_POOL: u64 = 1_095_890_000_000_000; // 1,095,890 VCoin with 9 decimals
const MAX_DAILY_REWARD_PER_USER: u64 = 10_000_000_000_000; // 10,000 VCoin with 9 decimals
const REWARD_EXPIRY_SECONDS: i64 = 30 * 24 * 60 * 60; // 30 days

// Silence warnings for documentation constants
#[allow(dead_code)]
const TOTAL_REWARD_POOL: u64 = 2_000_000_000_000_000_000; // 2 billion VCoin with 9 decimals
#[allow(dead_code)]
const DISTRIBUTION_DAYS: u64 = 1825; // 5 years

#[program]
pub mod reward_distribution {
    use super::*;

    // Initialize the reward distribution program
    pub fn initialize(
        ctx: Context<Initialize>,
        rewards_pool_wallet: Pubkey,
    ) -> Result<()> {
        let reward_config = &mut ctx.accounts.reward_config;
        reward_config.authority = ctx.accounts.authority.key();
        reward_config.rewards_pool_wallet = rewards_pool_wallet;
        reward_config.vcoin_mint = ctx.accounts.vcoin_mint.key();
        reward_config.total_rewards_distributed = 0;
        reward_config.total_users_rewarded = 0;
        reward_config.distribution_start_date = Clock::get()?.unix_timestamp;
        reward_config.daily_pool_remaining = DAILY_REWARD_POOL;
        reward_config.last_distribution_date = 0;
        
        msg!("Reward Distribution initialized");
        msg!("Rewards pool wallet: {}", rewards_pool_wallet);
        msg!("VCoin mint: {}", ctx.accounts.vcoin_mint.key());
        msg!("Daily reward pool: {} lamports", DAILY_REWARD_POOL);
        
        Ok(())
    }

    // Initialize user reward account
    pub fn initialize_user_account(
        ctx: Context<InitializeUserAccount>,
    ) -> Result<()> {
        let user_rewards = &mut ctx.accounts.user_rewards;
        user_rewards.user = ctx.accounts.user.key();
        user_rewards.pending_rewards = 0;
        user_rewards.total_claimed = 0;
        user_rewards.last_claim_date = 0;
        user_rewards.rewards_count = 0;
        
        msg!("User reward account initialized for: {}", ctx.accounts.user.key());
        
        Ok(())
    }

    // Record daily rewards for a user (called by backend)
    pub fn record_rewards(
        ctx: Context<RecordRewards>,
        engagement_score: u64,
        date: i64,
    ) -> Result<()> {
        require!(engagement_score > 0, ErrorCode::InvalidEngagementScore);
        
        let reward_config = &mut ctx.accounts.reward_config;
        let user_rewards = &mut ctx.accounts.user_rewards;
        
        // Check if we need to reset daily pool (new day)
        let current_date = date / 86400; // Convert to days
        let last_date = reward_config.last_distribution_date / 86400;
        
        if current_date > last_date {
            // New day - reset daily pool
            reward_config.daily_pool_remaining = DAILY_REWARD_POOL;
            reward_config.last_distribution_date = date;
            msg!("New day - daily pool reset to: {}", DAILY_REWARD_POOL);
        }
        
        // Calculate reward amount based on engagement score
        // This is simplified - backend should calculate the exact share
        let reward_amount = engagement_score
            .checked_mul(1_000_000_000) // Convert to lamports
            .unwrap()
            .min(MAX_DAILY_REWARD_PER_USER); // Cap at 10,000 VCoin per day
        
        // Check if daily pool has enough
        require!(
            reward_amount <= reward_config.daily_pool_remaining,
            ErrorCode::DailyPoolExhausted
        );
        
        // Add to pending rewards
        user_rewards.pending_rewards = user_rewards
            .pending_rewards
            .checked_add(reward_amount)
            .unwrap();
        
        user_rewards.rewards_count = user_rewards
            .rewards_count
            .checked_add(1)
            .unwrap();
        
        // Update daily pool
        reward_config.daily_pool_remaining = reward_config
            .daily_pool_remaining
            .checked_sub(reward_amount)
            .unwrap();
        
        // Store expiry date (30 days from now)
        let expiry_date = date + REWARD_EXPIRY_SECONDS;
        
        emit!(RewardsRecorded {
            user: ctx.accounts.user.key(),
            amount: reward_amount,
            engagement_score,
            date,
            expiry_date,
        });
        
        msg!("Rewards recorded for user: {}", ctx.accounts.user.key());
        msg!("Amount: {} lamports", reward_amount);
        msg!("Expires at: {}", expiry_date);
        
        Ok(())
    }

    // Claim pending rewards
    pub fn claim_rewards(
        ctx: Context<ClaimRewards>,
    ) -> Result<()> {
        let user_rewards = &mut ctx.accounts.user_rewards;
        let reward_config = &mut ctx.accounts.reward_config;
        
        // Check user has pending rewards
        require!(
            user_rewards.pending_rewards > 0,
            ErrorCode::NoPendingRewards
        );
        
        let claim_amount = user_rewards.pending_rewards;
        
        // Transfer from rewards pool to user
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.rewards_pool_account.to_account_info(),
                    to: ctx.accounts.user_token_account.to_account_info(),
                    authority: ctx.accounts.rewards_pool_authority.to_account_info(),
                },
            ),
            claim_amount,
        )?;
        
        // Update user state
        user_rewards.total_claimed = user_rewards
            .total_claimed
            .checked_add(claim_amount)
            .unwrap();
        
        user_rewards.pending_rewards = 0;
        user_rewards.last_claim_date = Clock::get()?.unix_timestamp;
        
        // Update global stats
        reward_config.total_rewards_distributed = reward_config
            .total_rewards_distributed
            .checked_add(claim_amount)
            .unwrap();
        
        reward_config.total_users_rewarded = reward_config
            .total_users_rewarded
            .checked_add(1)
            .unwrap();
        
        emit!(RewardsClaimed {
            user: ctx.accounts.user.key(),
            amount: claim_amount,
            total_claimed: user_rewards.total_claimed,
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        msg!("Rewards claimed by: {}", ctx.accounts.user.key());
        msg!("Amount: {} lamports", claim_amount);
        msg!("Total claimed: {} lamports", user_rewards.total_claimed);
        
        Ok(())
    }

    // Expire old unclaimed rewards (cleanup function)
    pub fn expire_rewards(
        ctx: Context<ExpireRewards>,
        expiry_date: i64,
    ) -> Result<()> {
        let current_time = Clock::get()?.unix_timestamp;
        
        require!(
            current_time > expiry_date,
            ErrorCode::RewardsNotExpired
        );
        
        let user_rewards = &mut ctx.accounts.user_rewards;
        let expired_amount = user_rewards.pending_rewards;
        
        // Reset pending rewards
        user_rewards.pending_rewards = 0;
        
        emit!(RewardsExpired {
            user: ctx.accounts.user.key(),
            amount: expired_amount,
            expiry_date,
            timestamp: current_time,
        });
        
        msg!("Expired rewards for user: {}", ctx.accounts.user.key());
        msg!("Amount expired: {} lamports", expired_amount);
        
        Ok(())
    }

    // Update authority (admin function)
    pub fn update_authority(
        ctx: Context<UpdateAuthority>,
        new_authority: Pubkey,
    ) -> Result<()> {
        let reward_config = &mut ctx.accounts.reward_config;
        
        require!(
            ctx.accounts.authority.key() == reward_config.authority,
            ErrorCode::Unauthorized
        );
        
        let old_authority = reward_config.authority;
        reward_config.authority = new_authority;
        
        msg!("Authority updated from {} to {}", old_authority, new_authority);
        
        Ok(())
    }

    // Get user pending rewards (view function)
    pub fn get_pending_rewards(
        ctx: Context<GetPendingRewards>,
    ) -> Result<u64> {
        Ok(ctx.accounts.user_rewards.pending_rewards)
    }

    // Get global stats (view function)
    pub fn get_stats(
        ctx: Context<GetStats>,
    ) -> Result<RewardStats> {
        let reward_config = &ctx.accounts.reward_config;
        
        Ok(RewardStats {
            total_distributed: reward_config.total_rewards_distributed,
            total_users: reward_config.total_users_rewarded,
            daily_pool_remaining: reward_config.daily_pool_remaining,
            distribution_start: reward_config.distribution_start_date,
        })
    }
}

// ===== ACCOUNTS STRUCTS =====

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + RewardConfig::INIT_SPACE,
        seeds = [b"reward_config"],
        bump
    )]
    pub reward_config: Account<'info, RewardConfig>,
    
    pub vcoin_mint: Account<'info, Mint>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InitializeUserAccount<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + UserRewards::INIT_SPACE,
        seeds = [b"user_rewards", user.key().as_ref()],
        bump
    )]
    pub user_rewards: Account<'info, UserRewards>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RecordRewards<'info> {
    #[account(
        mut,
        seeds = [b"reward_config"],
        bump
    )]
    pub reward_config: Account<'info, RewardConfig>,
    
    #[account(
        mut,
        seeds = [b"user_rewards", user.key().as_ref()],
        bump
    )]
    pub user_rewards: Account<'info, UserRewards>,
    
    /// CHECK: User receiving rewards
    pub user: AccountInfo<'info>,
    
    #[account(
        constraint = authority.key() == reward_config.authority @ ErrorCode::Unauthorized
    )]
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct ClaimRewards<'info> {
    #[account(
        mut,
        seeds = [b"reward_config"],
        bump
    )]
    pub reward_config: Account<'info, RewardConfig>,
    
    #[account(
        mut,
        seeds = [b"user_rewards", user.key().as_ref()],
        bump
    )]
    pub user_rewards: Account<'info, UserRewards>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    #[account(
        mut,
        constraint = rewards_pool_account.mint == reward_config.vcoin_mint
    )]
    pub rewards_pool_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = user_token_account.mint == reward_config.vcoin_mint,
        constraint = user_token_account.owner == user.key()
    )]
    pub user_token_account: Account<'info, TokenAccount>,
    
    /// CHECK: Rewards pool authority (platform wallet)
    pub rewards_pool_authority: Signer<'info>,
    
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct ExpireRewards<'info> {
    #[account(
        mut,
        seeds = [b"user_rewards", user.key().as_ref()],
        bump
    )]
    pub user_rewards: Account<'info, UserRewards>,
    
    /// CHECK: User whose rewards are expiring
    pub user: AccountInfo<'info>,
    
    #[account(
        seeds = [b"reward_config"],
        bump
    )]
    pub reward_config: Account<'info, RewardConfig>,
    
    #[account(
        constraint = authority.key() == reward_config.authority @ ErrorCode::Unauthorized
    )]
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct UpdateAuthority<'info> {
    #[account(
        mut,
        seeds = [b"reward_config"],
        bump
    )]
    pub reward_config: Account<'info, RewardConfig>,
    
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct GetPendingRewards<'info> {
    #[account(
        seeds = [b"user_rewards", user.key().as_ref()],
        bump
    )]
    pub user_rewards: Account<'info, UserRewards>,
    
    /// CHECK: User querying rewards
    pub user: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct GetStats<'info> {
    #[account(
        seeds = [b"reward_config"],
        bump
    )]
    pub reward_config: Account<'info, RewardConfig>,
}

// ===== STATE =====

#[account]
#[derive(InitSpace)]
pub struct RewardConfig {
    pub authority: Pubkey,
    pub rewards_pool_wallet: Pubkey,
    pub vcoin_mint: Pubkey,
    pub total_rewards_distributed: u64,
    pub total_users_rewarded: u64,
    pub distribution_start_date: i64,
    pub daily_pool_remaining: u64,
    pub last_distribution_date: i64,
}

#[account]
#[derive(InitSpace)]
pub struct UserRewards {
    pub user: Pubkey,
    pub pending_rewards: u64,
    pub total_claimed: u64,
    pub last_claim_date: i64,
    pub rewards_count: u64,
}

// ===== RETURN TYPES =====

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct RewardStats {
    pub total_distributed: u64,
    pub total_users: u64,
    pub daily_pool_remaining: u64,
    pub distribution_start: i64,
}

// ===== EVENTS =====

#[event]
pub struct RewardsRecorded {
    pub user: Pubkey,
    pub amount: u64,
    pub engagement_score: u64,
    pub date: i64,
    pub expiry_date: i64,
}

#[event]
pub struct RewardsClaimed {
    pub user: Pubkey,
    pub amount: u64,
    pub total_claimed: u64,
    pub timestamp: i64,
}

#[event]
pub struct RewardsExpired {
    pub user: Pubkey,
    pub amount: u64,
    pub expiry_date: i64,
    pub timestamp: i64,
}

// ===== ERRORS =====

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid engagement score")]
    InvalidEngagementScore,
    
    #[msg("Daily reward pool exhausted")]
    DailyPoolExhausted,
    
    #[msg("No pending rewards to claim")]
    NoPendingRewards,
    
    #[msg("Rewards have not expired yet")]
    RewardsNotExpired,
    
    #[msg("Unauthorized access")]
    Unauthorized,
}