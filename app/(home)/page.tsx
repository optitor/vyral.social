"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { NumberTicker } from "@/app/components/number-ticker";
import { ShimmerButton } from "@/app/components/shimmer-button";
import { ScrollProgress } from "@/app/components/scroll-progress";
import { AnimatedGradientText } from "@/app/components/animated-gradient-text";
import { BentoCard, BentoGrid } from "@/app/components/bento-grid";
import { BorderBeam } from "@/app/components/border-beam";
import {
  ArrowRight,
  Sparkles,
  MessageCircle,
  ShoppingBag,
  Users,
  Bot,
  Heart,
  Lock,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="relative bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden min-h-screen">
      <ScrollProgress className="bg-[#00D4AA]" />

      {/* Dot grid pattern background */}
      <div className="fixed inset-0 pointer-events-none opacity-30 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #00D4AA 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Discover the joy of{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">decentralized</span>
                  <span className="absolute inset-0 bg-[#00D4AA]/20 dark:bg-[#00D4AA]/30 rounded-2xl transform -rotate-1" />
                </span>{" "}
                social networking{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">with VYRAL.</span>
                  <span className="absolute inset-0 bg-purple-400/20 dark:bg-purple-400/30 rounded-2xl transform rotate-1" />
                </span>
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
                VYRAL's Web3 platform is now available and ready to revolutionize
                the way you think about social media, ownership, and creator economy.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/docs">
                  <ShimmerButton
                    background="linear-gradient(to right, #00D4AA, #06b6d4)"
                    className="px-8 py-4 text-lg font-semibold"
                  >
                    Get Started
                  </ShimmerButton>
                </Link>
              </div>
            </motion.div>

            {/* Right: iPhone Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative h-[600px] hidden lg:flex items-center justify-center"
            >
              {/* Floating background shapes */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-0 right-10 w-32 h-32 bg-gradient-to-br from-[#00D4AA]/20 to-[#7FE8C3]/20 rounded-[30px] blur-xl"
              />

              <motion.div
                animate={{
                  y: [0, 20, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-[35px] blur-xl"
              />

              {/* iPhone Frame */}
              <motion.div
                animate={{
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <div className="relative w-[280px] h-[580px] bg-black rounded-[50px] shadow-2xl p-3 border-[12px] border-gray-900">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-20" />

                  {/* Screen */}
                  <div className="relative w-full h-full bg-white rounded-[38px] overflow-hidden">
                    <Image
                      src="/images/feed.jpeg"
                      alt="VYRAL App"
                      fill
                      className="object-cover"
                    />

                    {/* Screen overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00D4AA]/10 to-transparent" />
                  </div>

                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Feature Cards at Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid md:grid-cols-3 gap-6 mt-24"
          >
            {[
              {
                icon: "🔗",
                title: "Built on Solana",
                description: "65,000 TPS with $0.00025 transaction cost.",
              },
              {
                icon: "💎",
                title: "True Ownership",
                description: "Your content, your data, your revenue.",
              },
              {
                icon: "⚡",
                title: "Lightning Fast",
                description: "Instant transactions and real-time updates.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00D4AA]/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/70 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 backdrop-blur-xl rounded-2xl p-6 hover:border-[#00D4AA]/50 transition-all shadow-lg dark:shadow-none">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    {feature.title}
                    <ArrowRight className="w-4 h-4 text-[#00D4AA] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-20"
          >
            {[
              { value: 10, suffix: "B", label: "Total VCO Supply" },
              { value: 65, suffix: "K", label: "TPS on Solana" },
              { value: 80, suffix: "%", label: "Creator Revenue" },
              { value: 2, suffix: "B", label: "User Rewards Pool" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D4AA]/20 to-transparent rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/70 dark:bg-white/5 border-2 border-gray-200/50 dark:border-white/10 backdrop-blur-xl rounded-2xl p-6 text-center shadow-lg dark:shadow-none overflow-hidden">
                  <BorderBeam
                    size={150}
                    duration={10}
                    delay={i * 2.5}
                    colorFrom="#00D4AA"
                    colorTo="#06b6d4"
                    borderWidth={3}
                  />
                  <div className="text-3xl font-bold text-[#00D4AA] mb-2">
                    <NumberTicker value={stat.value} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Features with BentoGrid */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">Why VYRAL?</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Built for creators, powered by community
            </p>
          </motion.div>

          <BentoGrid>
            {[
              {
                Icon: Heart,
                name: "Social Feed & Content",
                description:
                  "Twitter-style threads, rich media support, trending discovery. Follow, like, comment, share with algorithmic and chronological sorting.",
                href: "/docs/whitepaper/introduction",
                cta: "Learn more",
                className: "col-span-3 lg:col-span-2",
                background: (
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src="/images/feed.jpeg"
                      alt=""
                      fill
                      className="object-cover opacity-20"
                    />
                  </div>
                ),
              },
              {
                Icon: MessageCircle,
                name: "Encrypted Messaging",
                description:
                  "Military-grade E2E encryption. Private & group chats with zero-knowledge architecture. VYRAL cannot access your messages.",
                href: "/docs/whitepaper/introduction",
                cta: "Learn more",
                className: "col-span-3 lg:col-span-1",
                background: (
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src="/images/message.jpeg"
                      alt=""
                      fill
                      className="object-cover opacity-20"
                    />
                  </div>
                ),
              },
              {
                Icon: ShoppingBag,
                name: "Integrated Marketplace",
                description:
                  "Buy/sell with VCoin. Only 5% fees vs 13% eBay. Instant settlement, escrow protection, no intermediaries.",
                href: "/docs/whitepaper/introduction",
                cta: "Learn more",
                className: "col-span-3 lg:col-span-1",
                background: (
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src="/images/marketplace.jpeg"
                      alt=""
                      fill
                      className="object-cover opacity-20"
                    />
                  </div>
                ),
              },
              {
                Icon: Users,
                name: "Communities",
                description:
                  "Discord/Reddit-style groups with custom moderation, exclusive benefits, governance tools, and event coordination.",
                href: "/docs/whitepaper/introduction",
                cta: "Learn more",
                className: "col-span-3 lg:col-span-2",
                background: (
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src="/images/community.jpeg"
                      alt=""
                      fill
                      className="object-cover opacity-20"
                    />
                  </div>
                ),
              },
              {
                Icon: Bot,
                name: "Orb AI Assistant",
                description:
                  "Privacy-first AI for intelligent matchmaking, personalized recommendations, and conversational discovery. Your data, your control.",
                href: "/docs/whitepaper/introduction",
                cta: "Learn more",
                className: "col-span-3 lg:col-span-1",
                background: (
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src="/images/orbai.jpeg"
                      alt=""
                      fill
                      className="object-cover opacity-20"
                    />
                  </div>
                ),
              },
              {
                Icon: Lock,
                name: "80% Creator Revenue",
                description:
                  "Fair compensation with 80% revenue share vs 30-40% traditional platforms. Powered by VCoin on Solana.",
                href: "/docs/whitepaper/token-economics",
                cta: "Learn more",
                className: "col-span-3 lg:col-span-1",
                background: (
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent" />
                ),
              },
            ].map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Token Distribution */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D4AA]/5 to-transparent" />

        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">VCoin Economics</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              10 billion tokens with deflationary mechanics
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Distribution Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D4AA]/20 to-transparent rounded-3xl blur-2xl" />
              <div className="relative bg-white/70 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-lg dark:shadow-none">
                <h3 className="text-2xl font-bold mb-6">Token Distribution</h3>
                <div className="space-y-5">
                  {[
                    {
                      label: "Sales Inventory",
                      percent: 30,
                      amount: "3B",
                      color: "from-[#00D4AA] to-cyan-400",
                    },
                    {
                      label: "Platform Operations",
                      percent: 25,
                      amount: "2.5B",
                      color: "from-cyan-400 to-blue-400",
                    },
                    {
                      label: "User Rewards Pool",
                      percent: 20,
                      amount: "2B",
                      color: "from-blue-400 to-indigo-400",
                    },
                    {
                      label: "Liquidity Reserve",
                      percent: 15,
                      amount: "1.5B",
                      color: "from-indigo-400 to-purple-400",
                    },
                    {
                      label: "Team & Advisors",
                      percent: 7,
                      amount: "700M",
                      color: "from-purple-400 to-pink-400",
                    },
                    {
                      label: "Strategic Reserve",
                      percent: 3,
                      amount: "300M",
                      color: "from-pink-400 to-[#00D4AA]",
                    },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                        <span className="text-sm text-[#00D4AA]">
                          {item.percent}% • {item.amount}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className={`h-full bg-gradient-to-r ${item.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                {
                  icon: "⛓️",
                  title: "Solana Blockchain",
                  desc: "65,000 TPS with $0.00025 transaction cost. Lightning fast and affordable.",
                },
                {
                  icon: "🔒",
                  title: "Fixed Supply",
                  desc: "10 billion tokens, mint authority disabled forever. True scarcity guaranteed.",
                },
                {
                  icon: "🔥",
                  title: "Deflationary Mechanics",
                  desc: "1% of tips and 30% of premium features burned. Constant supply reduction.",
                },
                {
                  icon: "⏰",
                  title: "4-Year Vesting",
                  desc: "Team tokens vest over 4 years with 6-month cliff. Long-term commitment.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00D4AA]/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-white/70 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 backdrop-blur-xl rounded-2xl p-6 hover:border-[#00D4AA]/50 transition-all shadow-lg dark:shadow-none">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{item.icon}</div>
                      <div>
                        <h4 className="font-bold mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap Section - Stepper */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">Development Roadmap</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Our journey to revolutionize social media
            </p>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            {/* Grid layout for phases */}
            <div className="relative">
              {/* Top Row */}
              <div className="grid grid-cols-3 gap-8 mb-24 relative">
                {/* Horizontal connecting line for top row */}
                <div className="absolute top-1/2 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-[#00D4AA] to-cyan-400 pointer-events-none hidden md:block z-0" />

                {[
                  {
                    phase: "Q1 2025",
                    title: "Foundation",
                    items: [
                      "Platform architecture",
                      "VCoin smart contracts",
                      "Beta testing",
                    ],
                  },
                  {
                    phase: "Q2 2025",
                    title: "Launch",
                    items: [
                      "Public launch",
                      "VCoin trading",
                      "Creator onboarding",
                    ],
                  },
                  {
                    phase: "Q3 2025",
                    title: "Expansion",
                    items: [
                      "Mobile apps",
                      "Advanced features",
                      "Partnership programs",
                    ],
                  },
                ].map((phase, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative z-10"
                  >
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00D4AA]/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative bg-white/70 dark:bg-white/5 border-2 border-[#00D4AA]/30 dark:border-[#00D4AA]/50 backdrop-blur-xl rounded-2xl p-6 hover:border-[#00D4AA]/60 transition-all shadow-lg dark:shadow-none">
                        <div className="mb-4">
                          <div className="text-lg font-bold text-[#00D4AA] mb-1">
                            {phase.phase}
                          </div>
                          <div className="text-base font-semibold">
                            {phase.title}
                          </div>
                        </div>
                        <div className="space-y-2">
                          {phase.items.map((item, i) => (
                            <div
                              key={i}
                              className="px-3 py-2 bg-gradient-to-r from-[#00D4AA]/5 to-transparent border border-[#00D4AA]/20 rounded-lg text-xs"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Vertical connecting lines from first and last card */}
                    {(idx === 0 || idx === 2) && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-24 bg-gradient-to-b from-[#00D4AA] to-cyan-400 hidden md:block" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Middle Row */}
              <div className="grid grid-cols-2 gap-8 mb-24 px-12 relative">
                {/* Horizontal connecting line for middle row */}
                <div className="absolute top-1/2 left-[25%] right-[25%] h-0.5 bg-gradient-to-r from-[#00D4AA] to-cyan-400 pointer-events-none hidden md:block z-0" />

                {[
                  {
                    phase: "Q4 2025",
                    title: "Scale",
                    items: [
                      "Global expansion",
                      "DAO governance",
                      "Metaverse integration",
                    ],
                  },
                  {
                    phase: "2026-2027",
                    title: "Global Reach",
                    items: [
                      "Multi-chain support",
                      "Enterprise solutions",
                      "100M+ users",
                    ],
                  },
                ].map((phase, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="relative z-10"
                  >
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00D4AA]/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative bg-white/70 dark:bg-white/5 border-2 border-[#00D4AA]/30 dark:border-[#00D4AA]/50 backdrop-blur-xl rounded-2xl p-6 hover:border-[#00D4AA]/60 transition-all shadow-lg dark:shadow-none">
                        <div className="mb-4">
                          <div className="text-lg font-bold text-[#00D4AA] mb-1">
                            {phase.phase}
                          </div>
                          <div className="text-base font-semibold">
                            {phase.title}
                          </div>
                        </div>
                        <div className="space-y-2">
                          {phase.items.map((item, i) => (
                            <div
                              key={i}
                              className="px-3 py-2 bg-gradient-to-r from-[#00D4AA]/5 to-transparent border border-[#00D4AA]/20 rounded-lg text-xs"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Vertical connecting lines from both cards */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-24 bg-gradient-to-b from-[#00D4AA] to-cyan-400 hidden md:block" />
                  </motion.div>
                ))}
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-3 gap-8 relative">
                {/* Horizontal connecting line for bottom row */}
                <div className="absolute top-1/2 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-[#00D4AA] to-cyan-400 pointer-events-none hidden md:block z-0" />

                {[
                  {
                    phase: "2028-2030",
                    title: "Web3 Leader",
                    items: [
                      "Decentralized infrastructure",
                      "AI-powered ecosystem",
                      "1B+ user milestone",
                    ],
                  },
                  {
                    phase: "Beyond",
                    title: "Vision",
                    items: [
                      "Full decentralization",
                      "Cross-platform interoperability",
                      "Global adoption",
                    ],
                  },
                  {
                    phase: "Future",
                    title: "Innovation",
                    items: [
                      "Quantum-ready security",
                      "Neural interfaces",
                      "Metaverse native",
                    ],
                  },
                ].map((phase, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="relative z-10"
                  >
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00D4AA]/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative bg-white/70 dark:bg-white/5 border-2 border-[#00D4AA]/30 dark:border-[#00D4AA]/50 backdrop-blur-xl rounded-2xl p-6 hover:border-[#00D4AA]/60 transition-all shadow-lg dark:shadow-none">
                        <div className="mb-4">
                          <div className="text-lg font-bold text-[#00D4AA] mb-1">
                            {phase.phase}
                          </div>
                          <div className="text-base font-semibold">
                            {phase.title}
                          </div>
                        </div>
                        <div className="space-y-2">
                          {phase.items.map((item, i) => (
                            <div
                              key={i}
                              className="px-3 py-2 bg-gradient-to-r from-[#00D4AA]/5 to-transparent border border-[#00D4AA]/20 rounded-lg text-xs"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00D4AA] to-cyan-500 rounded-3xl blur-2xl opacity-30" />
            <div className="relative bg-gradient-to-br from-[#00D4AA]/20 to-cyan-500/20 border border-gray-200/50 dark:border-[#00D4AA]/30 backdrop-blur-xl rounded-3xl p-12 text-center shadow-xl dark:shadow-none">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Join the Revolution?
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Start earning VCO tokens, connect with creators, and be part of
                the future of social media
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/docs">
                  <ShimmerButton
                    background="linear-gradient(to right, #00D4AA, #06b6d4)"
                    className="px-10 py-4 text-lg font-semibold"
                  >
                    Get Started Now
                  </ShimmerButton>
                </Link>
                <Link
                  href="/docs/whitepaper"
                  className="px-10 py-4 rounded-full bg-white/70 dark:bg-white/10 border border-gray-300 dark:border-white/20 backdrop-blur-xl hover:bg-white/80 dark:hover:bg-white/20 transition-all font-semibold shadow-lg dark:shadow-none"
                >
                  View Documentation
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 border-t border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-[#00D4AA] mb-4">VYRAL</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Decentralized social platform built on Solana. Empowering
                creators, rewarding communities.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <Link
                    href="/docs"
                    className="hover:text-[#00D4AA] transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/whitepaper"
                    className="hover:text-[#00D4AA] transition-colors"
                  >
                    Whitepaper
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/tutorial"
                    className="hover:text-[#00D4AA] transition-colors"
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <Link
                    href="/docs/whitepaper/roadmap"
                    className="hover:text-[#00D4AA] transition-colors"
                  >
                    Roadmap
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/whitepaper/token-economics"
                    className="hover:text-[#00D4AA] transition-colors"
                  >
                    Tokenomics
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/compliance"
                    className="hover:text-[#00D4AA] transition-colors"
                  >
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <Link
                    href="/docs/compliance/privacy"
                    className="hover:text-[#00D4AA] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/compliance/terms"
                    className="hover:text-[#00D4AA] transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/compliance/risk-disclosure"
                    className="hover:text-[#00D4AA] transition-colors"
                  >
                    Risk Disclosure
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-white/10 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>© 2025 VYRAL. All rights reserved. Built on Solana.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
