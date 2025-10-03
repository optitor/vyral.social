"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { NumberTicker } from "@/app/components/number-ticker";
import { ShimmerButton } from "@/app/components/shimmer-button";
import { ScrollProgress } from "@/app/components/scroll-progress";
import { AnimatedGradientText } from "@/app/components/animated-gradient-text";
import { BentoCard, BentoGrid } from "@/app/components/bento-grid";
import { BorderBeam } from "@/app/components/border-beam";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/components/ui/card";
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

function EarningsCalculator() {
  const [followers, setFollowers] = useState(5000);

  // Calculate earnings based on follower count
  const calculateEarnings = (followerCount: number) => {
    if (followerCount < 1000) {
      // Casual user: $10-30/month
      const daily = 70;
      const monthly = daily * 30 + 500; // 2,100 + milestone bonus
      return {
        monthly: monthly * 0.01, // Convert VCoins to USD
        daily: daily * 0.01,
        tips: monthly * 0.3 * 0.01,
        subscriptions: 0,
        marketplace: monthly * 0.1 * 0.01,
        content: monthly * 0.6 * 0.01,
      };
    } else if (followerCount < 10000) {
      // Active creator: $200-500/month
      const baseDaily = 200 + followerCount / 100;
      const monthly = baseDaily * 30;
      return {
        monthly: monthly * 0.01,
        daily: baseDaily * 0.01,
        tips: monthly * 0.25 * 0.01,
        subscriptions: monthly * 0.35 * 0.01,
        marketplace: monthly * 0.15 * 0.01,
        content: monthly * 0.25 * 0.01,
      };
    } else {
      // Top creator: $2,000+/month
      const baseDaily = 300 + followerCount / 10;
      const tips = 1000 * (followerCount / 10000);
      const subscriptions = 5000 * (followerCount / 10000);
      const marketplace = 2000 * (followerCount / 10000);
      const monthly = (baseDaily + tips + subscriptions + marketplace) * 30;
      return {
        monthly: monthly * 0.01,
        daily: (baseDaily + tips + subscriptions + marketplace) * 0.01,
        tips: tips * 30 * 0.01,
        subscriptions: subscriptions * 30 * 0.01,
        marketplace: marketplace * 30 * 0.01,
        content: baseDaily * 30 * 0.01,
      };
    }
  };

  const earnings = calculateEarnings(followers);
  const breakdown = [
    {
      label: "Content Rewards",
      amount: earnings.content,
      color: "from-[#00D4AA] to-cyan-400",
    },
    {
      label: "Tips",
      amount: earnings.tips,
      color: "from-cyan-400 to-blue-400",
    },
    {
      label: "Subscriptions",
      amount: earnings.subscriptions,
      color: "from-blue-400 to-purple-400",
    },
    {
      label: "Marketplace",
      amount: earnings.marketplace,
      color: "from-purple-400 to-pink-400",
    },
  ].filter((item) => item.amount > 0);

  const total = breakdown.reduce((sum, item) => sum + item.amount, 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-transparent rounded-3xl blur-2xl" />
      <div className="relative bg-white/90 dark:bg-white/10 border-2 border-gray-200/50 dark:border-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl dark:shadow-none">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Earnings Calculator</h3>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Per Month
          </span>
        </div>

        {/* Follower Slider */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Your Followers
            </label>
            <span className="text-lg font-bold text-[#00D4AA]">
              {followers.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="100"
            max="100000"
            step="100"
            value={followers}
            onChange={(e) => setFollowers(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00D4AA]"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500 mt-1">
            <span>100</span>
            <span>50K</span>
            <span>100K</span>
          </div>
        </div>

        {/* Total Earnings */}
        <div className="text-6xl font-bold text-[#00D4AA] mb-8">
          ${total.toFixed(0)}
        </div>

        {/* Breakdown */}
        <div className="space-y-4 mb-6">
          {breakdown.map((item, idx) => {
            const percentage = (item.amount / total) * 100;
            return (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.label}</span>
                  <span className="font-bold">${item.amount.toFixed(0)}</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${item.color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-[#00D4AA] bg-[#00D4AA]/10 px-4 py-2 rounded-lg">
          <span className="text-sm">💡</span>
          <span className="text-sm">
            {followers < 1000
              ? "Build your following to unlock more revenue streams!"
              : followers < 10000
              ? "You're an active creator! Keep growing!"
              : "Top 1% creator tier! 🚀"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <main className="relative bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden min-h-screen">
      <ScrollProgress className="bg-[#00D4AA]" />

      {/* Dot grid pattern background */}
      <div className="fixed inset-0 pointer-events-none opacity-30 dark:opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, #00D4AA 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00D4AA]/10 border border-[#00D4AA]/30 rounded-full">
                <Sparkles className="w-4 h-4 text-[#00D4AA]" />
                <span className="text-sm font-semibold">Now Available</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Social Media{" "}
                <span className="bg-gradient-to-r from-[#00D4AA] via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Built For You
                </span>
                <br />
                <span className="text-3xl md:text-4xl lg:text-5xl text-gray-600 dark:text-gray-400">
                  Not Against You
                </span>
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
                Own your content. Control your data. Earn real rewards. Join the
                platform that actually respects you.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ShimmerButton
                    background="linear-gradient(to right, #00D4AA, #06b6d4)"
                    className="px-6 py-3 text-base font-semibold flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    Google Play
                  </ShimmerButton>
                </Link>
                <Link
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ShimmerButton
                    background="linear-gradient(to right, #06b6d4, #8b5cf6)"
                    className="px-6 py-3 text-base font-semibold flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                    </svg>
                    App Store
                  </ShimmerButton>
                </Link>
              </div>
            </motion.div>

            {/* Right: iPhone Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative h-[500px] hidden lg:flex items-center justify-center"
            >
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 right-10 w-24 h-24 bg-gradient-to-br from-[#00D4AA]/20 to-[#7FE8C3]/20 rounded-[30px] blur-xl"
              />
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-[35px] blur-xl"
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <div className="relative w-[240px] h-[500px] bg-black rounded-[40px] shadow-2xl p-2.5 border-[10px] border-gray-900">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-b-3xl z-20" />
                  <div className="relative w-full h-full bg-white rounded-[32px] overflow-hidden">
                    <Image
                      src="/images/feed.jpeg"
                      alt="VYRAL App"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00D4AA]/10 to-transparent" />
                  </div>
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Merged Stats & Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20"
          >
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { value: 10, suffix: "B", label: "Total VYC Supply" },
                { value: 65, suffix: "K", label: "TPS on Solana" },
                { value: 80, suffix: "%", label: "Creator Revenue" },
                { value: 2, suffix: "B", label: "User Rewards Pool" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00D4AA]/20 to-cyan-400/20 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-white/80 dark:bg-white/[0.08] border border-gray-200/50 dark:border-white/10 backdrop-blur-xl rounded-xl p-4 text-center shadow-lg dark:shadow-none overflow-hidden">
                    <BorderBeam
                      size={100}
                      duration={10}
                      delay={i * 2.5}
                      colorFrom="#00D4AA"
                      colorTo="#06b6d4"
                      borderWidth={2}
                    />
                    <div className="text-2xl md:text-3xl font-bold text-[#00D4AA] mb-1">
                      <NumberTicker value={stat.value} />
                      {stat.suffix}
                    </div>
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* The VYRAL Difference - Compact */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-transparent via-gray-50 dark:via-gray-900/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              The{" "}
              <span className="bg-gradient-to-r from-[#00D4AA] to-cyan-400 bg-clip-text text-transparent">
                VYRAL
              </span>{" "}
              Difference
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you love about social media, none of the exploitation.
            </p>
          </motion.div>

          {/* Compact Comparison */}
          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-red-50/50 to-gray-50/50 dark:from-red-900/5 dark:to-gray-900/5 border border-red-200/30 dark:border-red-500/20 backdrop-blur-xl rounded-2xl p-6 shadow-lg dark:shadow-none">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-lg">
                    ❌
                  </div>
                  <h3 className="text-lg font-bold">Traditional Social</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Platform owns content",
                    "Data sold",
                    "Algorithm controls reach",
                    "High fees (30-50%)",
                    "Zero transparency",
                    "You are the product",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <span className="text-red-500 mt-0.5">✕</span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D4AA]/20 to-cyan-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-gradient-to-br from-[#00D4AA]/5 to-cyan-400/5 dark:from-[#00D4AA]/10 dark:to-cyan-400/10 border border-[#00D4AA]/30 backdrop-blur-xl rounded-2xl p-6 shadow-lg dark:shadow-none">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-[#00D4AA]/10 flex items-center justify-center text-lg">
                    ✓
                  </div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-[#00D4AA] to-cyan-400 bg-clip-text text-transparent">
                    VYRAL
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "You own content",
                    "Data stays private",
                    "You control feed",
                    "Fair fees (5-20%)",
                    "100% transparent",
                    "You are the customer",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <span className="text-[#00D4AA] mt-0.5">✓</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features - Modern Compact Bento */}
      <section className="relative py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
              Why VYRAL?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base">
              Built for creators, powered by community
            </p>
          </motion.div>

          <BentoGrid>
            {[
              {
                Icon: Heart,
                name: "Social Feed",
                description:
                  "Twitter-style threads, rich media, trending discovery",
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
                name: "Encrypted Chat",
                description: "E2E encryption. Private & group chats",
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
                name: "Marketplace",
                description: "5% fees vs 13% eBay. Instant settlement",
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
                description: "Discord/Reddit-style groups with moderation",
                href: "/docs/whitepaper/introduction",
                cta: "Learn more",
                className: "col-span-3 lg:col-span-1",
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
                name: "Orb AI",
                description: "Privacy-first AI recommendations",
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
                name: "80% Revenue",
                description: "Fair creator compensation. Powered by VCoin",
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

      {/* VCoin & Creators - Merged Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-transparent via-[#00D4AA]/5 to-pink-50 dark:to-pink-900/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 items-start"
          >
            {/* Left: VCoin + Stats */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                  Meet{" "}
                  <span className="bg-gradient-to-r from-[#00D4AA] to-cyan-400 bg-clip-text text-transparent">
                    VCoin
                  </span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  The currency that powers VYRAL. Earn it creating content.
                  Built on Solana for speed and low fees.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="col-span-3 relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00D4AA]/20 to-transparent rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-white/70 dark:bg-white/5 border border-[#00D4AA]/30 backdrop-blur-xl rounded-2xl p-6 text-center shadow-lg dark:shadow-none">
                    <div className="text-4xl md:text-5xl font-bold text-[#00D4AA] mb-1">
                      10B
                    </div>
                    <div className="text-base font-semibold mb-0.5">
                      Fixed Supply
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Mint authority disabled forever
                    </div>
                  </div>
                </motion.div>

                {[
                  { value: "50%", label: "For Users", desc: "Sales & rewards" },
                  { value: "1%", label: "Burned", desc: "From every tip" },
                  {
                    value: "$0.01",
                    label: "Initial Price",
                    desc: "Starting value",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00D4AA]/20 to-transparent rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-white/70 dark:bg-white/5 border border-[#00D4AA]/20 backdrop-blur-xl rounded-2xl p-4 text-center shadow-lg dark:shadow-none">
                      <div className="text-2xl md:text-3xl font-bold text-[#00D4AA] mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs font-semibold mb-0.5">
                        {stat.label}
                      </div>
                      <div className="text-[10px] text-gray-600 dark:text-gray-400">
                        {stat.desc}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Earn rewards for content",
                  "Tip creators (80% to them)",
                  "Buy & sell marketplace",
                  "Withdraw anytime",
                  "Trade on DEXs (soon)",
                  "Real utility value",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <div className="w-4 h-4 rounded-full bg-[#00D4AA]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#00D4AA] font-bold text-xs">
                        ✓
                      </span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Creators + Calculator */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                  Built for{" "}
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                    Creators
                  </span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Stop giving away half your earnings. Monetize on your terms.
                </p>
              </div>

              <EarningsCalculator />
            </div>
          </motion.div>

          {/* Creator Benefits - Below VCoin Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {
                  icon: "💰",
                  title: "Keep 80-95%",
                  description: "Lowest fees in industry",
                },
                {
                  icon: "📊",
                  title: "Analytics",
                  description: "Detailed insights",
                },
                {
                  icon: "💎",
                  title: "Multiple Streams",
                  description: "Tips, subs, marketplace",
                },
                {
                  icon: "🚫",
                  title: "No Demonetization",
                  description: "Fair enforcement",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="bg-white/80 dark:bg-white/[0.08] border border-gray-200/50 dark:border-white/10 backdrop-blur-xl hover:border-[#00D4AA]/60 transition-all shadow-lg dark:shadow-none h-full">
                    <CardContent className="py-4 px-4 flex items-start gap-3">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <CardTitle className="text-sm mb-1">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {item.description}
                        </CardDescription>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* VCoin Economics - Modern Slider */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D4AA]/5 to-transparent" />

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
              VCoin Economics
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base">
              10 billion tokens with deflationary mechanics
            </p>
          </motion.div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              {
                icon: "⛓️",
                title: "Solana Blockchain",
                desc: "65,000 TPS, $0.00025 cost",
                color: "from-[#00D4AA] to-cyan-400",
              },
              {
                icon: "🔒",
                title: "Fixed Supply",
                desc: "10B tokens, mint disabled",
                color: "from-cyan-400 to-blue-400",
              },
              {
                icon: "🔥",
                title: "Deflationary",
                desc: "1% tips burned constantly",
                color: "from-blue-400 to-purple-400",
              },
              {
                icon: "⏰",
                title: "4-Year Vesting",
                desc: "Team tokens, 6-month cliff",
                color: "from-purple-400 to-pink-400",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D4AA]/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <Card className="relative bg-white/80 dark:bg-white/[0.08] border border-gray-200/50 dark:border-white/10 backdrop-blur-xl hover:border-[#00D4AA]/60 transition-all shadow-lg dark:shadow-none h-full">
                  <CardContent className="pt-5 pb-4 text-center">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <CardTitle className="text-sm mb-1.5 font-bold">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {item.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Token Distribution - Horizontal Bars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D4AA]/10 to-transparent rounded-2xl blur-2xl" />
            <div className="relative bg-white/80 dark:bg-white/[0.08] border border-gray-200/50 dark:border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg dark:shadow-none">
              <h3 className="text-lg font-bold mb-5 text-center">
                Token Distribution (10B Total)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
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
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {item.label}
                      </span>
                      <span className="text-xs font-bold text-[#00D4AA]">
                        {item.percent}% • {item.amount}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percent}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: i * 0.1,
                          ease: "easeOut",
                        }}
                        className={`h-full bg-gradient-to-r ${item.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Roadmap - Compact */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Development Roadmap
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              Our journey to revolutionize social media
            </p>
            <div className="max-w-3xl mx-auto bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4 text-left">
              <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                <strong>DISCLAIMER:</strong> Roadmap goals as of Oct 2025.
                Timelines, user numbers, and features are projections subject to
                change.
              </p>
              <ul className="text-[10px] text-gray-600 dark:text-gray-400 space-y-0.5 list-disc list-inside">
                <li>User growth estimates may vary</li>
                <li>Timelines adjustable based on factors</li>
                <li>1B+ user target is aspirational</li>
                <li>VCoin is utility token, not investment</li>
              </ul>
            </div>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            {/* Completed Section */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-400/20 rounded-xl blur-xl" />
                <Card className="relative bg-white/80 dark:bg-white/[0.08] border border-green-500/40 dark:border-green-500/60 backdrop-blur-xl shadow-lg dark:shadow-none">
                  <CardContent className="py-6 px-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="text-2xl">✅</div>
                      <div>
                        <CardTitle className="text-lg text-green-600 dark:text-green-400">
                          Completed (Oct 2025)
                        </CardTitle>
                        <CardDescription className="text-xs">
                          Foundation Built
                        </CardDescription>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2">
                      {[
                        "Platform architecture designed",
                        "VCoin smart contracts developed",
                        "Deployed to Solana devnet",
                        "Backend infrastructure complete",
                        "Mobile applications built",
                        "Core token economics implemented",
                        "Custodial wallet system ready",
                        "Terms of Service finalized",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Roadmap Timeline - Modern Compact */}
            <div className="space-y-6">
              {/* Near-term phases */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    phase: "Q4 2025",
                    title: "Final Prep",
                    target: "",
                    items: [
                      "Security audit",
                      "Legal compliance",
                      "Beta testing",
                      "Payment integration",
                    ],
                  },
                  {
                    phase: "Q1 2026",
                    title: "Launch",
                    target: "10K+",
                    items: [
                      "Mainnet live",
                      "VCoin sales",
                      "Creator onboarding",
                      "Platform launch",
                    ],
                  },
                  {
                    phase: "Q2 2026",
                    title: "Growth",
                    target: "50K+",
                    items: [
                      "Earning features",
                      "Marketplace",
                      "Partnerships",
                      "Mobile optimization",
                    ],
                  },
                  {
                    phase: "Q3 2026",
                    title: "DEX",
                    target: "100K+",
                    items: [
                      "Raydium pool",
                      "Public trading",
                      "CMC/CG listing",
                      "Creator tools",
                    ],
                  },
                ].map((phase, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.03, y: -3 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00D4AA]/20 to-transparent rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Card className="relative bg-white/80 dark:bg-white/[0.08] border border-[#00D4AA]/30 dark:border-[#00D4AA]/50 backdrop-blur-xl hover:border-[#00D4AA]/60 transition-all shadow-lg dark:shadow-none h-full">
                      <CardContent className="py-4 px-4">
                        <div className="mb-3">
                          <div className="text-xs font-bold text-[#00D4AA] mb-1">
                            {phase.phase}
                          </div>
                          <CardTitle className="text-sm mb-1">
                            {phase.title}
                          </CardTitle>
                          {phase.target && (
                            <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">
                              Target: {phase.target} users
                            </div>
                          )}
                        </div>
                        <div className="space-y-1.5">
                          {phase.items.map((item, i) => (
                            <div
                              key={i}
                              className="px-2 py-1 bg-gradient-to-r from-[#00D4AA]/5 to-transparent border border-[#00D4AA]/20 rounded text-[10px]"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Mid-term phases */}
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    phase: "Q4 2026",
                    title: "Platform Enhancement",
                    target: "500K+ users",
                    items: [
                      "Orb AI advanced features",
                      "Cross-platform integration",
                      "International expansion",
                      "Enterprise solutions beta",
                    ],
                  },
                  {
                    phase: "Q1-Q2 2027",
                    title: "Scale & Innovation",
                    target: "5-10M users",
                    items: [
                      "Multi-language support",
                      "Advanced marketplace",
                      "DeFi integrations",
                      "Metaverse integration",
                    ],
                  },
                  {
                    phase: "Q2-Q4 2027",
                    title: "Global Expansion",
                    target: "50-100M users",
                    items: [
                      "Multi-chain support",
                      "Advanced AI capabilities",
                      "Enterprise launch",
                      "Web3 ecosystem integration",
                    ],
                  },
                ].map((phase, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative group z-10"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00D4AA]/10 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Card className="relative bg-white/70 dark:bg-white/5 border-2 border-[#00D4AA]/30 dark:border-[#00D4AA]/50 backdrop-blur-xl hover:border-[#00D4AA]/60 transition-all shadow-lg dark:shadow-none h-full">
                      <CardContent className="py-6">
                        <div className="mb-4">
                          <div className="text-sm font-bold text-[#00D4AA] mb-1">
                            {phase.phase}
                          </div>
                          <CardTitle className="text-base mb-2">
                            {phase.title}
                          </CardTitle>
                          {phase.target && (
                            <div className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">
                              Target: {phase.target}
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          {phase.items.map((item, i) => (
                            <div
                              key={i}
                              className="px-3 py-1.5 bg-gradient-to-r from-[#00D4AA]/5 to-transparent border border-[#00D4AA]/20 rounded-lg text-xs"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Vertical connecting line from last card */}
                    {idx === 2 && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-[#00D4AA] to-purple-400 hidden lg:block" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Third Row - Long Term Vision */}
              <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Horizontal connecting line for third row */}
                <div className="absolute top-1/2 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 pointer-events-none hidden md:block z-0" />

                {[
                  {
                    phase: "2028-2029",
                    title: "Mass Adoption",
                    target: "500M users",
                    items: [
                      "Full platform decentralization",
                      "Cross-platform interoperability",
                      "Advanced metaverse presence",
                      "Quantum-ready security prep",
                    ],
                  },
                  {
                    phase: "Beyond 2029",
                    title: "Vision Realized",
                    target: "1B+ users (aspirational)",
                    items: [
                      "Leading Web3 social platform",
                      "Full metaverse integration",
                      "Quantum-resistant infrastructure",
                      "Neural interface compatibility",
                    ],
                  },
                  {
                    phase: "Future",
                    title: "Innovation Areas",
                    items: [
                      "Autonomous AI agents",
                      "Cross-reality experiences",
                      "Universal digital identity",
                      "Global digital economy leader",
                    ],
                  },
                ].map((phase, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative group z-10"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Card className="relative bg-white/70 dark:bg-white/5 border-2 border-purple-400/30 dark:border-purple-400/50 backdrop-blur-xl hover:border-purple-400/60 transition-all shadow-lg dark:shadow-none h-full">
                      <CardContent className="py-6">
                        <div className="mb-4">
                          <div className="text-sm font-bold text-purple-600 dark:text-purple-400 mb-1">
                            {phase.phase}
                          </div>
                          <CardTitle className="text-base mb-2">
                            {phase.title}
                          </CardTitle>
                          {phase.target && (
                            <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                              Target: {phase.target}
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          {phase.items.map((item, i) => (
                            <div
                              key={i}
                              className="px-3 py-1.5 bg-gradient-to-r from-purple-400/5 to-transparent border border-purple-400/20 rounded-lg text-xs"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Development Principles - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Card className="bg-gradient-to-br from-[#00D4AA]/10 to-cyan-400/10 dark:from-[#00D4AA]/15 dark:to-cyan-400/15 border border-[#00D4AA]/40 backdrop-blur-xl shadow-lg dark:shadow-none">
                <CardContent className="py-6 px-6">
                  <CardTitle className="text-xl mb-5 text-center font-bold">
                    Development Principles
                  </CardTitle>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                      {
                        icon: "👥",
                        title: "UX First",
                        desc: "Simple onboarding",
                      },
                      {
                        icon: "💰",
                        title: "Revenue-Funded",
                        desc: "20% to liquidity",
                      },
                      {
                        icon: "🎯",
                        title: "Utility Focus",
                        desc: "Real use cases",
                      },
                      {
                        icon: "🗣️",
                        title: "Community",
                        desc: "Feedback matters",
                      },
                      { icon: "🔒", title: "Security", desc: "Regular audits" },
                      {
                        icon: "⚖️",
                        title: "Compliant",
                        desc: "Legal framework",
                      },
                    ].map((principle, i) => (
                      <div key={i} className="text-center">
                        <div className="text-2xl mb-1.5">{principle.icon}</div>
                        <h4 className="font-bold text-xs mb-1">
                          {principle.title}
                        </h4>
                        <p className="text-[10px] text-gray-600 dark:text-gray-400">
                          {principle.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA - Compact */}
      <section className="relative py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00D4AA] to-cyan-500 rounded-2xl blur-2xl opacity-40" />
            <div className="relative bg-gradient-to-br from-[#00D4AA]/20 to-cyan-500/20 border border-[#00D4AA]/40 dark:border-[#00D4AA]/50 backdrop-blur-xl rounded-2xl p-10 text-center shadow-lg dark:shadow-none">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                Ready to Join the Revolution?
              </h2>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Start earning VYC tokens, connect with creators, and be part of
                the future of social media
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/docs">
                  <ShimmerButton
                    background="linear-gradient(to right, #00D4AA, #06b6d4)"
                    className="px-8 py-3 text-base font-semibold"
                  >
                    Get Started Now
                  </ShimmerButton>
                </Link>
                <Link
                  href="/docs/whitepaper"
                  className="px-8 py-3 rounded-full bg-white/70 dark:bg-white/10 border border-gray-300 dark:border-white/20 backdrop-blur-xl hover:bg-white/80 dark:hover:bg-white/20 transition-all font-semibold shadow-lg dark:shadow-none"
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
