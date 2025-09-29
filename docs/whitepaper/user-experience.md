---
sidebar_position: 6
title: User Experience
description: Earning, spending, withdrawing, and cashing out VCoins
---

# User Experience and Custodial Model

## Simplified Onboarding

Users begin their VYRAL experience with traditional account creation using email or social sign-in without encountering blockchain terminology or wallet setup. Upon registration, the platform automatically generates a custodial wallet tied to their account, invisible to the user but holding their VCoin balance securely. This frictionless onboarding removes the primary barrier that has prevented mainstream crypto adoption—the complexity of managing private keys and understanding gas fees.

New users receive a small welcome bonus of VCoins to enable immediate participation without requiring purchases. This removes the cold-start problem where users must invest money before experiencing platform value. The welcome bonus allows trying tipping, subscribing to creators, or purchasing small items from the marketplace, providing immediate utility that demonstrates VCoin's practical value.

## In-App Transaction Experience

When users tip creators, purchase subscriptions, buy marketplace items, or acquire premium features, transactions execute instantly within the custodial system. The platform's database updates balances immediately without blockchain confirmation delays. From the user's perspective, this feels identical to transactions on traditional platforms—instant, free, and requiring no technical understanding.

Behind the scenes, the platform batches these microtransactions and periodically settles them to the blockchain for transparency and audit trails. Instead of recording every individual tip or like on-chain (which would create unsustainable transaction volumes), the system aggregates thousands of internal transactions into single blockchain settlements that occur hourly or daily. This batching reduces gas costs by orders of magnitude while maintaining the security benefits of blockchain backing.

Users view their VCoin balance prominently in the app interface alongside traditional currency conversions showing equivalent value in USD, EUR, or their local currency. Transaction history displays all earnings, purchases, tips sent and received, and fees paid, providing complete transparency into their economic activity. The interface uses familiar language like "coins" rather than "tokens" and "send" rather than "transfer" to avoid alienating users unfamiliar with crypto terminology.

## Earning VCoins

```text
How Much Can You Earn:

Content Creation:
├── Text post: 2-20 VCoins
├── Photo: 5-50 VCoins
├── Video: 10-100 VCoins
└── Multipliers: 1.5x-3x for quality/virality

Daily Engagement (Realistic User):
├── Post 3 photos: 45 VCoins average
├── 20 comments: 10 VCoins
├── 50 likes given: 5 VCoins
├── 10 shares: 10 VCoins
└── Total: 70 VCoins/day = $0.70/day

Monthly Earnings (Active User):
├── Daily: 70 VCoins × 30 days = 2,100 VCoins
├── Milestones: 500 VCoins bonus
├── Tips received: Variable
└── Total: ~3,000 VCoins/month = $30/month

Top Creator (10K followers):
├── Daily posts: 300 VCoins
├── Tips from fans: 1,000 VCoins
├── Subscriptions: 5,000 VCoins
├── Marketplace: 2,000 VCoins
└── Total: ~8,000 VCoins/day = $2,400/month

Reality Check:
├── Most users: $10-30/month
├── Active creators: $200-1,000/month
├── Top 1% creators: $5,000+/month
└── Better than getting $0 elsewhere
```

The platform rewards quality contributions through the User Rewards Pool allocation, distributing VCoins based on content quality, engagement, and community value. Content creators earn VCoins when their posts receive views, likes, comments, and shares, with rates adjusted by quality factors. A photo that receives 10,000 views might earn 50 VCoins, while a viral video with 1 million views could earn 5,000 VCoins. Quality multipliers up to 3x apply for original content, high engagement rates, and viral reach.

Users also earn through engagement activities like commenting thoughtfully, curating content through likes, and sharing valuable posts. These engagement rewards incentivize positive community participation rather than passive consumption. Daily limits prevent spam and bot manipulation while ensuring the User Rewards Pool distributes over five years as designed.

Milestone bonuses reward users reaching follower thresholds, creating viral content, or achieving verification status. These bonuses create aspirational goals that motivate quality content creation. A user reaching 10,000 followers might receive a 5,000 VCoin bonus, while their first viral post (100K+ views) earns 1,000 VCoins, recognizing exceptional contributions.

The earning mechanisms carefully balance generosity with sustainability. Daily distribution caps ensure the User Rewards Pool lasts five years, while quality-weighted rewards prevent gaming through spam or manipulation. This creates a meritocratic system where users who contribute genuine value receive proportional compensation.

## Withdrawal to Self-Custody

```text
Taking VCoins to Your Own Wallet:

Step-by-Step:
├── 1. Click "Withdraw to Wallet"
├── 2. Connect Phantom/Solflare wallet
├── 3. Enter amount to withdraw
├── 4. Confirm (2% fee applies)
└── 5. Wait 24-48 hours for processing

Fees Breakdown:
├── Withdraw 10,000 VCoins ($100 worth)
├── 2% fee = 200 VCoins ($2)
│ ├── 100 VCoins burn forever
│ └── 100 VCoins to platform (covers costs)
└── You receive: 9,800 VCoins in your wallet

Large Withdrawal (>$10K):
├── Requires KYC verification
├── Extra review time: 2-3 days
├── Prevents money laundering
└── Compliance protection

After Withdrawal:
├── VCoins now in YOUR wallet
├── You control private keys
├── Can trade on DEXs
├── Can send to others
└── Platform can't freeze/reverse
```

Users who want true ownership of their VCoins can withdraw to personal Solana wallets at any time. The withdrawal process guides users through connecting their wallet (like Phantom or Solflare), specifying the amount to withdraw, and confirming the transaction. The platform clearly explains that withdrawn VCoins leave custodial protection and become the user's sole responsibility, ensuring informed consent.

Withdrawals incur a 2% fee (minimum $0.50) covering blockchain gas costs, security verification, and fraud prevention infrastructure. Half of this fee burns permanently as part of the deflationary mechanism, while the remainder covers operational costs. Large withdrawals above $10,000 require identity verification through KYC (Know Your Customer) procedures, complying with anti-money laundering regulations and preventing platform abuse.

Processing time typically ranges from 24-48 hours, allowing manual review of large or suspicious withdrawal requests before execution. This delay protects against account compromises where attackers attempt to drain stolen accounts. Users receive clear communication about withdrawal status with transaction ID once the blockchain transfer completes.

Once in self-custody, users can trade VCoins on decentralized exchanges, transfer them to other wallets, or hold them offline in hardware wallets for maximum security. They can also re-deposit VCoins to the platform at any time by sending to their platform wallet address, which immediately credits their balance after blockchain confirmation.

## Fiat Conversion and Cashing Out

Users who want to convert VCoin earnings to traditional currency have two options depending on preference. The first option involves withdrawing VCoins to personal wallets and selling on decentralized exchanges like Raydium or Jupiter for USDC stablecoins, then using cryptocurrency off-ramps like Coinbase, Kraken, or centralized exchanges to convert to fiat and withdraw to bank accounts. This process maximizes user control but requires understanding crypto exchanges and incurs multiple fee layers.

The second option allows users to request fiat conversion directly through the platform. The platform purchases VCoins from users at current market rate minus a small spread, converts those VCoins to USDC through DEXs, and sends fiat to users via PayPal, bank transfer, or other payment methods. This managed conversion simplifies the process for non-technical users at the cost of slightly less favorable rates than direct DEX trading.

:::danger SECOND OPTION NOT AVAILBALE
The second option is currently unavailable and may never be offered if the platform determines it could raise compliance issues.
:::

Minimum withdrawal thresholds ($10-50 depending on payment method) prevent inefficient micro-withdrawals where fees would consume most of the value. The platform publishes transparent fee schedules showing all costs associated with each withdrawal method, enabling users to choose the most cost-effective option for their situation.

Tax reporting provides appropriate documentation for users earning significant amounts. In the United States, users earning $600 or more annually receive 1099 forms, while international users receive appropriate documentation for their jurisdiction. This proactive compliance approach protects users from unexpected tax liabilities and positions the platform as a legitimate economic ecosystem rather than a gray-market operation.
