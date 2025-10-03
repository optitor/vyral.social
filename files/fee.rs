use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer, Burn, Mint};

declare_id!("2PwKNf6dqE9S94VeSkiZc9JgVDmjD4psx6KVzGCwNR3d");

#[program]
pub mod fee_collection {
    use super::*;

    // Initialize the fee collection program
    pub fn initialize(
        ctx: Context<Initialize>,
        platform_wallet: Pubkey,
    ) -> Result<()> {
        let fee_config = &mut ctx.accounts.fee_config;
        fee_config.authority = ctx.accounts.authority.key();
        fee_config.platform_wallet = platform_wallet;
        fee_config.vcoin_mint = ctx.accounts.vcoin_mint.key();
        fee_config.total_tips_processed = 0;
        fee_config.total_marketplace_sales = 0;
        fee_config.total_subscriptions = 0;
        fee_config.total_burned = 0;
        
        msg!("Fee Collection initialized");
        msg!("Platform wallet: {}", platform_wallet);
        msg!("VCoin mint: {}", ctx.accounts.vcoin_mint.key());
        
        Ok(())
    }

    // Process tip: 80% creator, 19% platform, 1% burn
    pub fn process_tip(
        ctx: Context<ProcessTip>,
        amount: u64,
    ) -> Result<()> {
        require!(amount > 0, ErrorCode::InvalidAmount);
        
        // Calculate splits
        let creator_amount = amount
            .checked_mul(80)
            .unwrap()
            .checked_div(100)
            .unwrap();
        
        let platform_amount = amount
            .checked_mul(19)
            .unwrap()
            .checked_div(100)
            .unwrap();
        
        let burn_amount = amount
            .checked_sub(creator_amount)
            .unwrap()
            .checked_sub(platform_amount)
            .unwrap();
        
        // Validate it adds up
        require!(
            creator_amount + platform_amount + burn_amount == amount,
            ErrorCode::InvalidSplit
        );
        
        // Transfer to creator (80%)
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.sender_token_account.to_account_info(),
                    to: ctx.accounts.creator_token_account.to_account_info(),
                    authority: ctx.accounts.sender.to_account_info(),
                },
            ),
            creator_amount,
        )?;
        
        // Transfer to platform (19%)
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.sender_token_account.to_account_info(),
                    to: ctx.accounts.platform_token_account.to_account_info(),
                    authority: ctx.accounts.sender.to_account_info(),
                },
            ),
            platform_amount,
        )?;
        
        // Burn (1%)
        token::burn(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Burn {
                    mint: ctx.accounts.vcoin_mint.to_account_info(),
                    from: ctx.accounts.sender_token_account.to_account_info(),
                    authority: ctx.accounts.sender.to_account_info(),
                },
            ),
            burn_amount,
        )?;
        
        // Update stats
        let fee_config = &mut ctx.accounts.fee_config;
        fee_config.total_tips_processed = fee_config
            .total_tips_processed
            .checked_add(1)
            .unwrap();
        fee_config.total_burned = fee_config
            .total_burned
            .checked_add(burn_amount)
            .unwrap();
        
        // Emit event
        emit!(TipProcessed {
            sender: ctx.accounts.sender.key(),
            creator: ctx.accounts.creator.key(),
            amount,
            creator_amount,
            platform_amount,
            burn_amount,
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        msg!("Tip processed: {} VCoin", amount);
        msg!("Creator received: {} VCoin", creator_amount);
        msg!("Platform fee: {} VCoin", platform_amount);
        msg!("Burned: {} VCoin", burn_amount);
        
        Ok(())
    }

    // Process marketplace sale: 95% seller, 4% platform, 1% burn
    pub fn process_marketplace_sale(
        ctx: Context<ProcessMarketplaceSale>,
        amount: u64,
    ) -> Result<()> {
        require!(amount > 0, ErrorCode::InvalidAmount);
        
        // Calculate splits
        let seller_amount = amount
            .checked_mul(95)
            .unwrap()
            .checked_div(100)
            .unwrap();
        
        let platform_amount = amount
            .checked_mul(4)
            .unwrap()
            .checked_div(100)
            .unwrap();
        
        let burn_amount = amount
            .checked_sub(seller_amount)
            .unwrap()
            .checked_sub(platform_amount)
            .unwrap();
        
        require!(
            seller_amount + platform_amount + burn_amount == amount,
            ErrorCode::InvalidSplit
        );
        
        // Transfer to seller (95%)
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.buyer_token_account.to_account_info(),
                    to: ctx.accounts.seller_token_account.to_account_info(),
                    authority: ctx.accounts.buyer.to_account_info(),
                },
            ),
            seller_amount,
        )?;
        
        // Transfer to platform (4%)
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.buyer_token_account.to_account_info(),
                    to: ctx.accounts.platform_token_account.to_account_info(),
                    authority: ctx.accounts.buyer.to_account_info(),
                },
            ),
            platform_amount,
        )?;
        
        // Burn (1%)
        token::burn(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Burn {
                    mint: ctx.accounts.vcoin_mint.to_account_info(),
                    from: ctx.accounts.buyer_token_account.to_account_info(),
                    authority: ctx.accounts.buyer.to_account_info(),
                },
            ),
            burn_amount,
        )?;
        
        // Update stats
        let fee_config = &mut ctx.accounts.fee_config;
        fee_config.total_marketplace_sales = fee_config
            .total_marketplace_sales
            .checked_add(1)
            .unwrap();
        fee_config.total_burned = fee_config
            .total_burned
            .checked_add(burn_amount)
            .unwrap();
        
        emit!(MarketplaceSaleProcessed {
            buyer: ctx.accounts.buyer.key(),
            seller: ctx.accounts.seller.key(),
            amount,
            seller_amount,
            platform_amount,
            burn_amount,
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        msg!("Marketplace sale processed: {} VCoin", amount);
        
        Ok(())
    }

    // Process subscription: 95% creator, 5% platform, no burn
    pub fn process_subscription(
        ctx: Context<ProcessSubscription>,
        amount: u64,
    ) -> Result<()> {
        require!(amount > 0, ErrorCode::InvalidAmount);
        
        // Calculate splits (no burn on subscriptions)
        let creator_amount = amount
            .checked_mul(95)
            .unwrap()
            .checked_div(100)
            .unwrap();
        
        let platform_amount = amount
            .checked_sub(creator_amount)
            .unwrap();
        
        require!(
            creator_amount + platform_amount == amount,
            ErrorCode::InvalidSplit
        );
        
        // Transfer to creator (95%)
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.subscriber_token_account.to_account_info(),
                    to: ctx.accounts.creator_token_account.to_account_info(),
                    authority: ctx.accounts.subscriber.to_account_info(),
                },
            ),
            creator_amount,
        )?;
        
        // Transfer to platform (5%)
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.subscriber_token_account.to_account_info(),
                    to: ctx.accounts.platform_token_account.to_account_info(),
                    authority: ctx.accounts.subscriber.to_account_info(),
                },
            ),
            platform_amount,
        )?;
        
        // Update stats
        let fee_config = &mut ctx.accounts.fee_config;
        fee_config.total_subscriptions = fee_config
            .total_subscriptions
            .checked_add(1)
            .unwrap();
        
        emit!(SubscriptionProcessed {
            subscriber: ctx.accounts.subscriber.key(),
            creator: ctx.accounts.creator.key(),
            amount,
            creator_amount,
            platform_amount,
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        msg!("Subscription processed: {} VCoin", amount);
        
        Ok(())
    }

    // Process withdrawal: 98% user, 2% platform, no burn
    pub fn process_withdrawal(
        ctx: Context<ProcessWithdrawal>,
        amount: u64,
    ) -> Result<()> {
        require!(amount > 0, ErrorCode::InvalidAmount);
        
        // Calculate splits
        let user_amount = amount
            .checked_mul(98)
            .unwrap()
            .checked_div(100)
            .unwrap();
        
        let fee_amount = amount
            .checked_sub(user_amount)
            .unwrap();
        
        require!(
            user_amount + fee_amount == amount,
            ErrorCode::InvalidSplit
        );
        
        // Transfer to user external wallet (98%)
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.platform_token_account.to_account_info(),
                    to: ctx.accounts.user_external_account.to_account_info(),
                    authority: ctx.accounts.platform_authority.to_account_info(),
                },
            ),
            user_amount,
        )?;
        
        // Fee (2%) stays in platform wallet automatically
        
        emit!(WithdrawalProcessed {
            user: ctx.accounts.user.key(),
            amount,
            user_amount,
            fee_amount,
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        msg!("Withdrawal processed: {} VCoin", amount);
        
        Ok(())
    }

    // Process premium feature payment: 70% platform, 30% burn
    pub fn process_premium_payment(
        ctx: Context<ProcessPremiumPayment>,
        amount: u64,
    ) -> Result<()> {
        require!(amount > 0, ErrorCode::InvalidAmount);
        
        // Calculate splits
        let platform_amount = amount
            .checked_mul(70)
            .unwrap()
            .checked_div(100)
            .unwrap();
        
        let burn_amount = amount
            .checked_sub(platform_amount)
            .unwrap();
        
        require!(
            platform_amount + burn_amount == amount,
            ErrorCode::InvalidSplit
        );
        
        // Transfer to platform (70%)
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.user_token_account.to_account_info(),
                    to: ctx.accounts.platform_token_account.to_account_info(),
                    authority: ctx.accounts.user.to_account_info(),
                },
            ),
            platform_amount,
        )?;
        
        // Burn (30%)
        token::burn(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Burn {
                    mint: ctx.accounts.vcoin_mint.to_account_info(),
                    from: ctx.accounts.user_token_account.to_account_info(),
                    authority: ctx.accounts.user.to_account_info(),
                },
            ),
            burn_amount,
        )?;
        
        // Update stats
        let fee_config = &mut ctx.accounts.fee_config;
        fee_config.total_burned = fee_config
            .total_burned
            .checked_add(burn_amount)
            .unwrap();
        
        emit!(PremiumPaymentProcessed {
            user: ctx.accounts.user.key(),
            amount,
            platform_amount,
            burn_amount,
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        msg!("Premium payment processed: {} VCoin", amount);
        
        Ok(())
    }
}

// ===== ACCOUNTS STRUCTS =====

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + FeeConfig::INIT_SPACE,
        seeds = [b"fee_config"],
        bump
    )]
    pub fee_config: Account<'info, FeeConfig>,
    
    pub vcoin_mint: Account<'info, Mint>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ProcessTip<'info> {
    #[account(
        mut,
        seeds = [b"fee_config"],
        bump
    )]
    pub fee_config: Account<'info, FeeConfig>,
    
    #[account(mut)]
    pub sender: Signer<'info>,
    
    /// CHECK: Creator wallet
    pub creator: AccountInfo<'info>,
    
    #[account(
        mut,
        constraint = sender_token_account.mint == fee_config.vcoin_mint
    )]
    pub sender_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = creator_token_account.mint == fee_config.vcoin_mint
    )]
    pub creator_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = platform_token_account.mint == fee_config.vcoin_mint
    )]
    pub platform_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        address = fee_config.vcoin_mint
    )]
    pub vcoin_mint: Account<'info, Mint>,
    
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct ProcessMarketplaceSale<'info> {
    #[account(
        mut,
        seeds = [b"fee_config"],
        bump
    )]
    pub fee_config: Account<'info, FeeConfig>,
    
    #[account(mut)]
    pub buyer: Signer<'info>,
    
    /// CHECK: Seller wallet
    pub seller: AccountInfo<'info>,
    
    #[account(
        mut,
        constraint = buyer_token_account.mint == fee_config.vcoin_mint
    )]
    pub buyer_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = seller_token_account.mint == fee_config.vcoin_mint
    )]
    pub seller_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = platform_token_account.mint == fee_config.vcoin_mint
    )]
    pub platform_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        address = fee_config.vcoin_mint
    )]
    pub vcoin_mint: Account<'info, Mint>,
    
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct ProcessSubscription<'info> {
    #[account(
        mut,
        seeds = [b"fee_config"],
        bump
    )]
    pub fee_config: Account<'info, FeeConfig>,
    
    #[account(mut)]
    pub subscriber: Signer<'info>,
    
    /// CHECK: Creator wallet
    pub creator: AccountInfo<'info>,
    
    #[account(
        mut,
        constraint = subscriber_token_account.mint == fee_config.vcoin_mint
    )]
    pub subscriber_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = creator_token_account.mint == fee_config.vcoin_mint
    )]
    pub creator_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = platform_token_account.mint == fee_config.vcoin_mint
    )]
    pub platform_token_account: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct ProcessWithdrawal<'info> {
    #[account(
        seeds = [b"fee_config"],
        bump
    )]
    pub fee_config: Account<'info, FeeConfig>,
    
    /// CHECK: User requesting withdrawal
    pub user: AccountInfo<'info>,
    
    #[account(
        mut,
        constraint = platform_authority.key() == fee_config.authority
    )]
    pub platform_authority: Signer<'info>,
    
    #[account(
        mut,
        constraint = platform_token_account.mint == fee_config.vcoin_mint
    )]
    pub platform_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = user_external_account.mint == fee_config.vcoin_mint
    )]
    pub user_external_account: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct ProcessPremiumPayment<'info> {
    #[account(
        mut,
        seeds = [b"fee_config"],
        bump
    )]
    pub fee_config: Account<'info, FeeConfig>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    #[account(
        mut,
        constraint = user_token_account.mint == fee_config.vcoin_mint
    )]
    pub user_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = platform_token_account.mint == fee_config.vcoin_mint
    )]
    pub platform_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        address = fee_config.vcoin_mint
    )]
    pub vcoin_mint: Account<'info, Mint>,
    
    pub token_program: Program<'info, Token>,
}

// ===== STATE =====

#[account]
#[derive(InitSpace)]
pub struct FeeConfig {
    pub authority: Pubkey,
    pub platform_wallet: Pubkey,
    pub vcoin_mint: Pubkey,
    pub total_tips_processed: u64,
    pub total_marketplace_sales: u64,
    pub total_subscriptions: u64,
    pub total_burned: u64,
}

// ===== EVENTS =====

#[event]
pub struct TipProcessed {
    pub sender: Pubkey,
    pub creator: Pubkey,
    pub amount: u64,
    pub creator_amount: u64,
    pub platform_amount: u64,
    pub burn_amount: u64,
    pub timestamp: i64,
}

#[event]
pub struct MarketplaceSaleProcessed {
    pub buyer: Pubkey,
    pub seller: Pubkey,
    pub amount: u64,
    pub seller_amount: u64,
    pub platform_amount: u64,
    pub burn_amount: u64,
    pub timestamp: i64,
}

#[event]
pub struct SubscriptionProcessed {
    pub subscriber: Pubkey,
    pub creator: Pubkey,
    pub amount: u64,
    pub creator_amount: u64,
    pub platform_amount: u64,
    pub timestamp: i64,
}

#[event]
pub struct WithdrawalProcessed {
    pub user: Pubkey,
    pub amount: u64,
    pub user_amount: u64,
    pub fee_amount: u64,
    pub timestamp: i64,
}

#[event]
pub struct PremiumPaymentProcessed {
    pub user: Pubkey,
    pub amount: u64,
    pub platform_amount: u64,
    pub burn_amount: u64,
    pub timestamp: i64,
}

// ===== ERRORS =====

#[error_code]
pub enum ErrorCode {
    #[msg("Amount must be greater than 0")]
    InvalidAmount,
    
    #[msg("Fee split calculation error")]
    InvalidSplit,
}