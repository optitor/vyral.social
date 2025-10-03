use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer, Mint};

declare_id!("cxN2RGR2noQL5XfWtGJbCLQZUgkfFneWqcdJQfnogsd");

// Constants
const SECONDS_PER_DAY: i64 = 86400;
const DAYS_PER_MONTH: i64 = 30;

#[program]
pub mod vesting {
    use super::*;

    // Initialize vesting program
    pub fn initialize(
        ctx: Context<Initialize>,
    ) -> Result<()> {
        let vesting_config = &mut ctx.accounts.vesting_config;
        vesting_config.authority = ctx.accounts.authority.key();
        vesting_config.vcoin_mint = ctx.accounts.vcoin_mint.key();
        vesting_config.total_schedules_created = 0;
        vesting_config.total_vested_amount = 0;
        
        msg!("Vesting program initialized");
        msg!("Authority: {}", ctx.accounts.authority.key());
        
        Ok(())
    }

    // Create vesting schedule
    pub fn create_vesting_schedule(
        ctx: Context<CreateVestingSchedule>,
        total_amount: u64,
        cliff_months: u64,
        vesting_months: u64,
        release_frequency_days: u64,
    ) -> Result<()> {
        require!(total_amount > 0, ErrorCode::InvalidAmount);
        require!(vesting_months > 0, ErrorCode::InvalidVestingPeriod);
        require!(release_frequency_days > 0, ErrorCode::InvalidReleaseFrequency);
        
        let current_time = Clock::get()?.unix_timestamp;
        
        let vesting_schedule = &mut ctx.accounts.vesting_schedule;
        vesting_schedule.beneficiary = ctx.accounts.beneficiary.key();
        vesting_schedule.total_amount = total_amount;
        vesting_schedule.claimed_amount = 0;
        vesting_schedule.start_timestamp = current_time;
        
        // Calculate cliff timestamp
        vesting_schedule.cliff_timestamp = current_time + 
            (cliff_months as i64 * DAYS_PER_MONTH * SECONDS_PER_DAY);
        
        // Calculate end timestamp
        vesting_schedule.end_timestamp = current_time + 
            (vesting_months as i64 * DAYS_PER_MONTH * SECONDS_PER_DAY);
        
        vesting_schedule.release_frequency_seconds = 
            release_frequency_days as i64 * SECONDS_PER_DAY;
        
        vesting_schedule.last_claim_timestamp = 0;
        vesting_schedule.is_revoked = false;
        
        // Transfer tokens to vesting account
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.source_token_account.to_account_info(),
                    to: ctx.accounts.vesting_token_account.to_account_info(),
                    authority: ctx.accounts.authority.to_account_info(),
                },
            ),
            total_amount,
        )?;
        
        // Update config
        let vesting_config = &mut ctx.accounts.vesting_config;
        vesting_config.total_schedules_created = vesting_config
            .total_schedules_created
            .checked_add(1)
            .unwrap();
        
        emit!(VestingScheduleCreated {
            beneficiary: ctx.accounts.beneficiary.key(),
            total_amount,
            cliff_months,
            vesting_months,
            start_timestamp: current_time,
            cliff_timestamp: vesting_schedule.cliff_timestamp,
            end_timestamp: vesting_schedule.end_timestamp,
        });
        
        msg!("Vesting schedule created for: {}", ctx.accounts.beneficiary.key());
        msg!("Total amount: {} lamports", total_amount);
        msg!("Cliff: {} months", cliff_months);
        msg!("Vesting period: {} months", vesting_months);
        
        Ok(())
    }

// Claim vested tokens
pub fn claim_vested_tokens(
    ctx: Context<ClaimVestedTokens>,
) -> Result<()> {
    let vesting_schedule = &mut ctx.accounts.vesting_schedule;
    let current_time = Clock::get()?.unix_timestamp;
    
    // Check schedule is not revoked
    require!(!vesting_schedule.is_revoked, ErrorCode::VestingRevoked);
    
    // Check cliff has passed
    require!(
        current_time >= vesting_schedule.cliff_timestamp,
        ErrorCode::CliffNotReached
    );
    
    // Calculate vested amount
    let vested_amount = calculate_vested_amount(
        vesting_schedule.total_amount,
        vesting_schedule.start_timestamp,
        vesting_schedule.end_timestamp,
        current_time,
    )?;
    
    // Calculate claimable amount (vested - already claimed)
    let claimable_amount = vested_amount
        .checked_sub(vesting_schedule.claimed_amount)
        .unwrap();
    
    require!(claimable_amount > 0, ErrorCode::NoTokensToCliam);
    
    // Transfer vested tokens to beneficiary
    let seeds = &[
        b"vesting_schedule",
        vesting_schedule.beneficiary.as_ref(),
        &[ctx.bumps.vesting_schedule],
    ];
    let signer = &[&seeds[..]];
    
    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.vesting_token_account.to_account_info(),
                to: ctx.accounts.beneficiary_token_account.to_account_info(),
                authority: vesting_schedule.to_account_info(),  // ← FIX HERE
            },
            signer,
        ),
        claimable_amount,
    )?;
    
    // Update schedule
    vesting_schedule.claimed_amount = vesting_schedule
        .claimed_amount
        .checked_add(claimable_amount)
        .unwrap();
    
    vesting_schedule.last_claim_timestamp = current_time;
    
    // Update config
    let vesting_config = &mut ctx.accounts.vesting_config;
    vesting_config.total_vested_amount = vesting_config
        .total_vested_amount
        .checked_add(claimable_amount)
        .unwrap();
    
    emit!(TokensClaimed {
        beneficiary: ctx.accounts.beneficiary.key(),
        amount: claimable_amount,
        total_claimed: vesting_schedule.claimed_amount,
        timestamp: current_time,
    });
    
    msg!("Tokens claimed by: {}", ctx.accounts.beneficiary.key());
    msg!("Amount: {} lamports", claimable_amount);
    msg!("Total claimed: {} lamports", vesting_schedule.claimed_amount);
    
    Ok(())
}

    // Get vested amount (view function)
    pub fn get_vested_amount(
        ctx: Context<GetVestedAmount>,
    ) -> Result<VestedInfo> {
        let vesting_schedule = &ctx.accounts.vesting_schedule;
        let current_time = Clock::get()?.unix_timestamp;
        
        // Check if cliff reached
        if current_time < vesting_schedule.cliff_timestamp {
            return Ok(VestedInfo {
                vested_amount: 0,
                claimable_amount: 0,
                claimed_amount: vesting_schedule.claimed_amount,
                total_amount: vesting_schedule.total_amount,
                cliff_reached: false,
            });
        }
        
        let vested_amount = calculate_vested_amount(
            vesting_schedule.total_amount,
            vesting_schedule.start_timestamp,
            vesting_schedule.end_timestamp,
            current_time,
        )?;
        
        let claimable_amount = vested_amount
            .checked_sub(vesting_schedule.claimed_amount)
            .unwrap();
        
        Ok(VestedInfo {
            vested_amount,
            claimable_amount,
            claimed_amount: vesting_schedule.claimed_amount,
            total_amount: vesting_schedule.total_amount,
            cliff_reached: true,
        })
    }

    // Revoke vesting (emergency function)
    pub fn revoke_vesting(
        ctx: Context<RevokeVesting>,
    ) -> Result<()> {
        let vesting_schedule = &mut ctx.accounts.vesting_schedule;
        
        require!(!vesting_schedule.is_revoked, ErrorCode::AlreadyRevoked);
        
        vesting_schedule.is_revoked = true;
        
        emit!(VestingRevoked {
            beneficiary: vesting_schedule.beneficiary,
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        msg!("Vesting revoked for: {}", vesting_schedule.beneficiary);
        
        Ok(())
    }
}

// ===== HELPER FUNCTIONS =====

fn calculate_vested_amount(
    total_amount: u64,
    start_timestamp: i64,
    end_timestamp: i64,
    current_timestamp: i64,
) -> Result<u64> {
    // If vesting period ended, all tokens are vested
    if current_timestamp >= end_timestamp {
        return Ok(total_amount);
    }
    
    // Calculate elapsed time since start
    let elapsed = current_timestamp
        .checked_sub(start_timestamp)
        .unwrap() as u64;
    
    // Calculate total vesting duration
    let total_duration = end_timestamp
        .checked_sub(start_timestamp)
        .unwrap() as u64;
    
    // Calculate proportional vested amount
    let vested = (total_amount as u128)
        .checked_mul(elapsed as u128)
        .unwrap()
        .checked_div(total_duration as u128)
        .unwrap() as u64;
    
    Ok(vested)
}

// ===== ACCOUNTS STRUCTS =====

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + VestingConfig::INIT_SPACE,
        seeds = [b"vesting_config"],
        bump
    )]
    pub vesting_config: Account<'info, VestingConfig>,
    
    pub vcoin_mint: Account<'info, Mint>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateVestingSchedule<'info> {
    #[account(
        mut,
        seeds = [b"vesting_config"],
        bump
    )]
    pub vesting_config: Account<'info, VestingConfig>,
    
    #[account(
        init,
        payer = authority,
        space = 8 + VestingSchedule::INIT_SPACE,
        seeds = [b"vesting_schedule", beneficiary.key().as_ref()],
        bump
    )]
    pub vesting_schedule: Account<'info, VestingSchedule>,
    
    /// CHECK: Beneficiary of vesting
    pub beneficiary: AccountInfo<'info>,
    
    #[account(
        init,
        payer = authority,
        token::mint = vcoin_mint,
        token::authority = vesting_schedule,
        seeds = [b"vesting_token_account", beneficiary.key().as_ref()],
        bump
    )]
    pub vesting_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = source_token_account.mint == vesting_config.vcoin_mint
    )]
    pub source_token_account: Account<'info, TokenAccount>,
    
    pub vcoin_mint: Account<'info, Mint>,
    
    #[account(
        mut,
        constraint = authority.key() == vesting_config.authority @ ErrorCode::Unauthorized
    )]
    pub authority: Signer<'info>,
    
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct ClaimVestedTokens<'info> {
    #[account(
        mut,
        seeds = [b"vesting_config"],
        bump
    )]
    pub vesting_config: Account<'info, VestingConfig>,
    
    #[account(
        mut,
        seeds = [b"vesting_schedule", beneficiary.key().as_ref()],
        bump
    )]
    pub vesting_schedule: Account<'info, VestingSchedule>,
    
    #[account(
        mut,
        seeds = [b"vesting_token_account", beneficiary.key().as_ref()],
        bump
    )]
    pub vesting_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = beneficiary_token_account.owner == beneficiary.key(),
        constraint = beneficiary_token_account.mint == vesting_config.vcoin_mint
    )]
    pub beneficiary_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = beneficiary.key() == vesting_schedule.beneficiary @ ErrorCode::Unauthorized
    )]
    pub beneficiary: Signer<'info>,
    
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct GetVestedAmount<'info> {
    #[account(
        seeds = [b"vesting_schedule", beneficiary.key().as_ref()],
        bump
    )]
    pub vesting_schedule: Account<'info, VestingSchedule>,
    
    /// CHECK: Beneficiary querying vested amount
    pub beneficiary: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct RevokeVesting<'info> {
    #[account(
        seeds = [b"vesting_config"],
        bump
    )]
    pub vesting_config: Account<'info, VestingConfig>,
    
    #[account(
        mut,
        seeds = [b"vesting_schedule", vesting_schedule.beneficiary.as_ref()],
        bump
    )]
    pub vesting_schedule: Account<'info, VestingSchedule>,
    
    #[account(
        constraint = authority.key() == vesting_config.authority @ ErrorCode::Unauthorized
    )]
    pub authority: Signer<'info>,
}

// ===== STATE =====

#[account]
#[derive(InitSpace)]
pub struct VestingConfig {
    pub authority: Pubkey,
    pub vcoin_mint: Pubkey,
    pub total_schedules_created: u64,
    pub total_vested_amount: u64,
}

#[account]
#[derive(InitSpace)]
pub struct VestingSchedule {
    pub beneficiary: Pubkey,
    pub total_amount: u64,
    pub claimed_amount: u64,
    pub start_timestamp: i64,
    pub cliff_timestamp: i64,
    pub end_timestamp: i64,
    pub release_frequency_seconds: i64,
    pub last_claim_timestamp: i64,
    pub is_revoked: bool,
}

// ===== RETURN TYPES =====

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct VestedInfo {
    pub vested_amount: u64,
    pub claimable_amount: u64,
    pub claimed_amount: u64,
    pub total_amount: u64,
    pub cliff_reached: bool,
}

// ===== EVENTS =====

#[event]
pub struct VestingScheduleCreated {
    pub beneficiary: Pubkey,
    pub total_amount: u64,
    pub cliff_months: u64,
    pub vesting_months: u64,
    pub start_timestamp: i64,
    pub cliff_timestamp: i64,
    pub end_timestamp: i64,
}

#[event]
pub struct TokensClaimed {
    pub beneficiary: Pubkey,
    pub amount: u64,
    pub total_claimed: u64,
    pub timestamp: i64,
}

#[event]
pub struct VestingRevoked {
    pub beneficiary: Pubkey,
    pub timestamp: i64,
}

// ===== ERRORS =====

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid amount")]
    InvalidAmount,
    
    #[msg("Invalid vesting period")]
    InvalidVestingPeriod,
    
    #[msg("Invalid release frequency")]
    InvalidReleaseFrequency,
    
    #[msg("Cliff period not reached")]
    CliffNotReached,
    
    #[msg("No tokens available to claim")]
    NoTokensToCliam,
    
    #[msg("Vesting has been revoked")]
    VestingRevoked,
    
    #[msg("Vesting already revoked")]
    AlreadyRevoked,
    
    #[msg("Unauthorized access")]
    Unauthorized,
}