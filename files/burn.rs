use anchor_lang::prelude::*;

declare_id!("HMf4URTq1NJCk7K9KNmPWnwxReFj6HX4wy2RdyXqXJoq");

#[program]
pub mod burn_tracker {
    use super::*;

    // Initialize burn tracker
    pub fn initialize(
        ctx: Context<Initialize>,
    ) -> Result<()> {
        let burn_stats = &mut ctx.accounts.burn_stats;
        burn_stats.authority = ctx.accounts.authority.key();
        burn_stats.total_burned = 0;
        burn_stats.tip_burns = 0;
        burn_stats.marketplace_burns = 0;
        burn_stats.premium_burns = 0;
        burn_stats.withdrawal_burns = 0;
        burn_stats.other_burns = 0;
        burn_stats.burn_count = 0;
        burn_stats.last_burn_timestamp = 0;
        burn_stats.largest_single_burn = 0;
        
        msg!("Burn Tracker initialized");
        msg!("Authority: {}", ctx.accounts.authority.key());
        
        Ok(())
    }

    // Record a burn event
    pub fn record_burn(
        ctx: Context<RecordBurn>,
        amount: u64,
        source: BurnSource,
    ) -> Result<()> {
        require!(amount > 0, ErrorCode::InvalidAmount);
        
        let burn_stats = &mut ctx.accounts.burn_stats;
        let current_time = Clock::get()?.unix_timestamp;
        
        // Update total burned
        burn_stats.total_burned = burn_stats
            .total_burned
            .checked_add(amount)
            .unwrap();
        
        // Update source-specific counter
        match source {
            BurnSource::Tip => {
                burn_stats.tip_burns = burn_stats
                    .tip_burns
                    .checked_add(amount)
                    .unwrap();
            }
            BurnSource::Marketplace => {
                burn_stats.marketplace_burns = burn_stats
                    .marketplace_burns
                    .checked_add(amount)
                    .unwrap();
            }
            BurnSource::Premium => {
                burn_stats.premium_burns = burn_stats
                    .premium_burns
                    .checked_add(amount)
                    .unwrap();
            }
            BurnSource::Withdrawal => {
                burn_stats.withdrawal_burns = burn_stats
                    .withdrawal_burns
                    .checked_add(amount)
                    .unwrap();
            }
            BurnSource::Other => {
                burn_stats.other_burns = burn_stats
                    .other_burns
                    .checked_add(amount)
                    .unwrap();
            }
        }
        
        // Update burn count
        burn_stats.burn_count = burn_stats
            .burn_count
            .checked_add(1)
            .unwrap();
        
        // Update largest single burn
        if amount > burn_stats.largest_single_burn {
            burn_stats.largest_single_burn = amount;
        }
        
        // Update last burn timestamp
        burn_stats.last_burn_timestamp = current_time;
        
        emit!(BurnRecorded {
            amount,
            source: source.clone(),
            total_burned: burn_stats.total_burned,
            burn_count: burn_stats.burn_count,
            timestamp: current_time,
        });
        
        msg!("Burn recorded: {} lamports from {:?}", amount, source);
        msg!("Total burned: {} lamports", burn_stats.total_burned);
        
        Ok(())
    }

    // Record daily burn aggregate (for efficiency)
    pub fn record_daily_aggregate(
        ctx: Context<RecordDailyAggregate>,
        date: i64,
        tip_burns: u64,
        marketplace_burns: u64,
        premium_burns: u64,
        withdrawal_burns: u64,
        other_burns: u64,
    ) -> Result<()> {
        let daily_stats = &mut ctx.accounts.daily_stats;
        
        daily_stats.date = date;
        daily_stats.tip_burns = tip_burns;
        daily_stats.marketplace_burns = marketplace_burns;
        daily_stats.premium_burns = premium_burns;
        daily_stats.withdrawal_burns = withdrawal_burns;
        daily_stats.other_burns = other_burns;
        daily_stats.total_burned = tip_burns
            .checked_add(marketplace_burns)
            .unwrap()
            .checked_add(premium_burns)
            .unwrap()
            .checked_add(withdrawal_burns)
            .unwrap()
            .checked_add(other_burns)
            .unwrap();
        
        emit!(DailyBurnAggregated {
            date,
            total_burned: daily_stats.total_burned,
        });
        
        msg!("Daily burn aggregate recorded for date: {}", date);
        msg!("Total burned: {} lamports", daily_stats.total_burned);
        
        Ok(())
    }

    // Get burn statistics (view function)
    pub fn get_burn_stats(
        ctx: Context<GetBurnStats>,
    ) -> Result<BurnStatistics> {
        let burn_stats = &ctx.accounts.burn_stats;
        
        Ok(BurnStatistics {
            total_burned: burn_stats.total_burned,
            tip_burns: burn_stats.tip_burns,
            marketplace_burns: burn_stats.marketplace_burns,
            premium_burns: burn_stats.premium_burns,
            withdrawal_burns: burn_stats.withdrawal_burns,
            other_burns: burn_stats.other_burns,
            burn_count: burn_stats.burn_count,
            largest_single_burn: burn_stats.largest_single_burn,
            last_burn_timestamp: burn_stats.last_burn_timestamp,
        })
    }

    // Get circulating supply (total supply - burned)
    pub fn get_circulating_supply(
        ctx: Context<GetCirculatingSupply>,
        total_supply: u64,
    ) -> Result<u64> {
        let burn_stats = &ctx.accounts.burn_stats;
        
        let circulating = total_supply
            .checked_sub(burn_stats.total_burned)
            .unwrap();
        
        Ok(circulating)
    }

    // Get daily burn stats
    pub fn get_daily_stats(
        ctx: Context<GetDailyStats>,
    ) -> Result<DailyBurnStats> {
        let daily_stats = &ctx.accounts.daily_stats;
        
        Ok(DailyBurnStats {
            date: daily_stats.date,
            total_burned: daily_stats.total_burned,
            tip_burns: daily_stats.tip_burns,
            marketplace_burns: daily_stats.marketplace_burns,
            premium_burns: daily_stats.premium_burns,
            withdrawal_burns: daily_stats.withdrawal_burns,
            other_burns: daily_stats.other_burns,
        })
    }

    // Update authority
    pub fn update_authority(
        ctx: Context<UpdateAuthority>,
        new_authority: Pubkey,
    ) -> Result<()> {
        let burn_stats = &mut ctx.accounts.burn_stats;
        
        require!(
            ctx.accounts.authority.key() == burn_stats.authority,
            ErrorCode::Unauthorized
        );
        
        let old_authority = burn_stats.authority;
        burn_stats.authority = new_authority;
        
        msg!("Authority updated from {} to {}", old_authority, new_authority);
        
        Ok(())
    }
}

// ===== ACCOUNTS STRUCTS =====

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + BurnStats::INIT_SPACE,
        seeds = [b"burn_stats"],
        bump
    )]
    pub burn_stats: Account<'info, BurnStats>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RecordBurn<'info> {
    #[account(
        mut,
        seeds = [b"burn_stats"],
        bump
    )]
    pub burn_stats: Account<'info, BurnStats>,
    
    #[account(
        constraint = authority.key() == burn_stats.authority @ ErrorCode::Unauthorized
    )]
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
#[instruction(date: i64)]
pub struct RecordDailyAggregate<'info> {
    #[account(
        seeds = [b"burn_stats"],
        bump
    )]
    pub burn_stats: Account<'info, BurnStats>,
    
    #[account(
        init,
        payer = authority,
        space = 8 + DailyBurnStats::INIT_SPACE,
        seeds = [b"daily_stats", date.to_le_bytes().as_ref()],
        bump
    )]
    pub daily_stats: Account<'info, DailyBurnStats>,
    
    #[account(
        mut,
        constraint = authority.key() == burn_stats.authority @ ErrorCode::Unauthorized
    )]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct GetBurnStats<'info> {
    #[account(
        seeds = [b"burn_stats"],
        bump
    )]
    pub burn_stats: Account<'info, BurnStats>,
}

#[derive(Accounts)]
pub struct GetCirculatingSupply<'info> {
    #[account(
        seeds = [b"burn_stats"],
        bump
    )]
    pub burn_stats: Account<'info, BurnStats>,
}

#[derive(Accounts)]
#[instruction(date: i64)]
pub struct GetDailyStats<'info> {
    #[account(
        seeds = [b"daily_stats", date.to_le_bytes().as_ref()],
        bump
    )]
    pub daily_stats: Account<'info, DailyBurnStats>,
}

#[derive(Accounts)]
pub struct UpdateAuthority<'info> {
    #[account(
        mut,
        seeds = [b"burn_stats"],
        bump
    )]
    pub burn_stats: Account<'info, BurnStats>,
    
    pub authority: Signer<'info>,
}

// ===== STATE =====

#[account]
#[derive(InitSpace)]
pub struct BurnStats {
    pub authority: Pubkey,
    pub total_burned: u64,
    pub tip_burns: u64,
    pub marketplace_burns: u64,
    pub premium_burns: u64,
    pub withdrawal_burns: u64,
    pub other_burns: u64,
    pub burn_count: u64,
    pub last_burn_timestamp: i64,
    pub largest_single_burn: u64,
}

#[account]
#[derive(InitSpace)]
pub struct DailyBurnStats {
    pub date: i64,
    pub total_burned: u64,
    pub tip_burns: u64,
    pub marketplace_burns: u64,
    pub premium_burns: u64,
    pub withdrawal_burns: u64,
    pub other_burns: u64,
}

// ===== ENUMS =====

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, PartialEq)]
pub enum BurnSource {
    Tip,
    Marketplace,
    Premium,
    Withdrawal,
    Other,
}

// ===== RETURN TYPES =====

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct BurnStatistics {
    pub total_burned: u64,
    pub tip_burns: u64,
    pub marketplace_burns: u64,
    pub premium_burns: u64,
    pub withdrawal_burns: u64,
    pub other_burns: u64,
    pub burn_count: u64,
    pub largest_single_burn: u64,
    pub last_burn_timestamp: i64,
}

// ===== EVENTS =====

#[event]
pub struct BurnRecorded {
    pub amount: u64,
    pub source: BurnSource,
    pub total_burned: u64,
    pub burn_count: u64,
    pub timestamp: i64,
}

#[event]
pub struct DailyBurnAggregated {
    pub date: i64,
    pub total_burned: u64,
}

// ===== ERRORS =====

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid burn amount")]
    InvalidAmount,
    
    #[msg("Unauthorized access")]
    Unauthorized,
}
