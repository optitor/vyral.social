"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { NumberTicker } from "@/app/components/number-ticker";
import { ShimmerButton } from "@/app/components/shimmer-button";
import { ScrollProgress } from "@/app/components/scroll-progress";
import { AnimatedInfoTooltip } from "@/app/components/ui/animated-tooltip";
import { BentoGrid, BentoGridItem } from "@/app/components/bento-grid";
import {
  FaXTwitter,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaDiscord,
  FaTelegram,
  FaReddit,
  FaLinkedin,
  FaGithub,
  FaFacebook,
  FaWhatsapp,
  FaMedium,
  FaThreads,
} from "react-icons/fa6";
import {
  SocialFeedSkeleton,
  EncryptedChatSkeleton,
  MarketplaceSkeleton,
  CommunitiesSkeleton,
  OrbAISkeleton,
  VCoinRewardsSkeleton,
} from "@/app/components/feature-skeletons";
import { CardSpotlight } from "@/app/components/ui/card-spotlight";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/components/ui/card";
import { Timeline } from "@/app/components/ui/timeline";
import {
  ArrowRight,
  Sparkles,
  MessageCircle,
  ShoppingBag,
  Users,
  Bot,
  Heart,
  Lock,
  Coins,
  Flame,
  TrendingUp,
  Zap,
} from "lucide-react";

const VCoinSupplyHeader = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isDark, setIsDark] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const loadAnimation = async () => {
      const animation = isDark
        ? await import("@/public/images/Vyral_Icon.json")
        : await import("@/public/images/Vyral_logo_light.json");
      setAnimationData(animation.default);
    };
    loadAnimation();
  }, [isDark]);

  const handleMouseEnter = () => {
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (lottieRef.current) {
      lottieRef.current.stop();
    }
  };

  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-[#00D4AA] to-cyan-400 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)]" />
      <div className="flex items-center justify-center w-full gap-4">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ width: 48, height: 48, display: "flex" }}
        >
          {animationData && (
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              loop={false}
              autoplay={false}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </div>
        <div className="text-white">
          <div className="text-4xl font-bold">10B</div>
          <div className="text-sm opacity-90">Total Supply</div>
        </div>
      </div>
    </div>
  );
};

const ComparisonItem = ({
  title,
  isNegative = false,
}: {
  title: string;
  isNegative?: boolean;
}) => {
  return (
    <li className="flex gap-2 items-start">
      {isNegative ? <XIcon /> : <CheckIcon />}
      <p className="text-gray-700 dark:text-white text-sm">{title}</p>
    </li>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-[#00D4AA] mt-1 shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};

const XIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-red-500 mt-1 shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c5.523 0 10 4.477 10 10s-4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10zm3.6 5.2a1 1 0 0 0 -1.4 .2l-2.2 2.933l-2.2 -2.933a1 1 0 1 0 -1.6 1.2l2.55 3.4l-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2 -2.933l2.2 2.933a1 1 0 0 0 1.6 -1.2l-2.55 -3.4l2.55 -3.4a1 1 0 0 0 -.2 -1.4z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};

function EarningsCalculator() {
  const [followers, setFollowers] = useState(5000);

  const calculateEarnings = (followerCount: number) => {
    if (followerCount < 1000) {
      const daily = 70;
      const monthly = daily * 30 + 500;
      return {
        monthly: monthly * 0.01,
        daily: daily * 0.01,
        tips: monthly * 0.3 * 0.01,
        subscriptions: 0,
        marketplace: monthly * 0.1 * 0.01,
        content: monthly * 0.6 * 0.01,
      };
    } else if (followerCount < 10000) {
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
    <div className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-6">Earnings Calculator</h3>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Your Followers
          </label>
          <span className="text-xl font-bold text-[#00D4AA]">
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
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>100</span>
          <span>50K</span>
          <span>100K</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#00D4AA] to-cyan-400 rounded-xl p-6 mb-6 text-center text-white">
        <div className="text-5xl font-bold mb-1">${total.toFixed(0)}</div>
        <div className="text-sm opacity-90">Potential Monthly Earnings</div>
      </div>

      <div className="space-y-3 mb-6">
        {breakdown.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {item.label}
            </span>
            <span className="font-bold text-[#00D4AA]">
              ${item.amount.toFixed(0)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 text-[#00D4AA] bg-[#00D4AA]/10 px-4 py-3 rounded-lg text-sm">
        <span>💡</span>
        <span>
          {followers < 1000
            ? "Build your following to unlock more revenue streams!"
            : followers < 10000
            ? "You're an active creator! Keep growing!"
            : "Top 1% creator tier! 🚀"}
        </span>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="relative bg-white dark:bg-black min-h-screen">
      <ScrollProgress className="bg-[#00D4AA]" />

      {/* Hero Section - New.png Style */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, #00D4AA 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Large Typography */}
            <div className="space-y-8">
              <Link href="/docs/whitepaper">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00D4AA]/10 border border-[#00D4AA]/30 rounded-full"
                >
                  <Sparkles className="w-4 h-4 text-[#00D4AA]" />
                  <span className="text-sm font-semibold">View Whitepaper</span>
                </motion.div>
              </Link>
              <br />
              <br />
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight"
              >
                <span className="text-gray-900 dark:text-white">
                  SOCIAL MEDIA{" "}
                </span>
                <span className="bg-gradient-to-r from-[#00D4AA] to-cyan-400 bg-clip-text text-transparent">
                  Built For You
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                  Not Against You
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl font-medium leading-relaxed"
              >
                You've made others wealthy long enough. Join the platform where
                your content pays you, your engagement rewards you, and your
                privacy protects you. Your moment is now.
              </motion.p>

              {/* App Download Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <AnimatedInfoTooltip
                  title="📱 Android App Launch"
                  description="We're putting the finishing touches on our Android app! Get ready for a seamless mobile experience with all VYRAL features, including content creation, messaging, marketplace, and VCoin wallet integration."
                  status="Coming Q1 2026"
                  timeline="Expected Launch"
                >
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="block w-full sm:w-auto"
                  >
                    <ShimmerButton
                      background="linear-gradient(to right, #00D4AA, #06b6d4)"
                      className="px-6 py-3 text-base font-semibold flex items-center gap-2 w-full justify-center"
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
                </AnimatedInfoTooltip>
                <AnimatedInfoTooltip
                  title="🍎 iOS App Launch"
                  description="The iOS version is in active development! Experience VYRAL's revolutionary social platform on your iPhone and iPad with native performance, push notifications, and seamless iCloud integration."
                  status="Coming Q1 2026"
                  timeline="Expected Launch"
                >
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="block w-full sm:w-auto"
                  >
                    <ShimmerButton
                      background="linear-gradient(to right, #06b6d4, #8b5cf6)"
                      className="px-6 py-3 text-base font-semibold flex items-center gap-2 w-full justify-center"
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
                </AnimatedInfoTooltip>
              </motion.div>
            </div>

            {/* Right - 3D Visual Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative flex items-center justify-center min-h-[600px]"
            >
              {/* Central iPhone Mockup */}
              <div className="relative z-10 lg:z-20">
                <Image
                  src="/images/feed.jpeg"
                  alt="VYRAL Platform"
                  width={280}
                  height={560}
                  className="rounded-[40px] shadow-2xl object-cover border-8 border-gray-800 dark:border-gray-700"
                />
              </div>

              {/* Floating Stats Cards - Outside */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0 }}
                className="absolute top-10 right-0 bg-white dark:bg-black/90 backdrop-blur-md rounded-2xl px-5 py-4 shadow-2xl z-30 border-2 border-[#00D4AA]/40"
              >
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  VYC Supply
                </div>
                <div className="text-3xl font-black text-[#00D4AA]">
                  <NumberTicker value={10} />B
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
                className="absolute top-48 left-0 bg-white dark:bg-black/90 backdrop-blur-md rounded-2xl px-5 py-4 shadow-2xl z-30 border-2 border-cyan-500/40"
              >
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  TPS
                </div>
                <div className="text-3xl font-black text-purple-600 dark:text-purple-400">
                  <NumberTicker value={65} />K
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 0.6 }}
                className="absolute bottom-32 right-4 bg-white dark:bg-black/90 backdrop-blur-md rounded-2xl px-5 py-4 shadow-2xl z-30 border-2 border-yellow-500/40"
              >
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Creator Rev
                </div>
                <div className="text-3xl font-black text-yellow-600 dark:text-yellow-400">
                  <NumberTicker value={80} />%
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, delay: 0.9 }}
                className="absolute bottom-16 left-4 bg-white dark:bg-black/90 backdrop-blur-md rounded-2xl px-5 py-4 shadow-2xl z-30 border-2 border-blue-500/40"
              >
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Rewards
                </div>
                <div className="text-3xl font-black text-blue-600 dark:text-blue-400">
                  <NumberTicker value={2} />B
                </div>
              </motion.div>

              {/* Floating Star Element */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-24 h-24 rounded-3xl bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-2xl flex items-center justify-center text-4xl z-40"
              >
                ⭐
              </motion.div>

              {/* Top Badge */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                className="absolute -top-4 left-12 bg-white dark:bg-black/90 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 shadow-xl z-40 border-2 border-[#00D4AA]/40"
              >
                <div className="w-2 h-2 rounded-full bg-[#00D4AA] animate-pulse" />
                <span className="text-xs font-bold">EXPLORE ECOSYSTEM</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AN ECOSYSTEM OF VYRAL APPS */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-transparent via-gray-50 dark:via-gray-900/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          {/* Bold Header */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4">
              <span className="text-gray-900 dark:text-white">
                /AN ECOSYSTEM OF{" "}
              </span>
              <span className="bg-gradient-to-r from-[#00D4AA] to-cyan-400 bg-clip-text text-transparent">
                VYRAL APPS
              </span>
            </h2>
            <div className="flex items-center gap-4">
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
                VYRAL Provides The Foundation For Powerful Social Features Like
                Content Creation, Messaging, And Commerce.
              </p>
            </div>
          </div>

          {/* Feature Cards - New Pattern */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Large Featured Card - Social Feed */}
            <div className="md:col-span-2 lg:col-span-1 lg:row-span-2 relative group">
              <div className="h-full rounded-3xl bg-gradient-to-br from-[#00D4AA]/20 to-cyan-400/20 border-2 border-[#00D4AA]/40 p-8 hover:border-[#00D4AA] transition-all overflow-hidden">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D4AA] to-cyan-400 flex items-center justify-center mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div className="inline-block px-3 py-1 bg-white dark:bg-black rounded-full text-xs font-bold text-[#00D4AA] mb-3">
                    FEEDS
                  </div>
                </div>
                <h3 className="text-3xl font-black mb-4 text-gray-900 dark:text-white">
                  SOCIAL FEED
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  X-Style Threads, Rich Media Posts, And Trending Discovery.
                  Connect With Your Community Through Powerful Social Features.
                </p>

                <Link href="/docs">
                  <button className="mt-4 px-4 py-2 bg-white dark:bg-black border-2 border-gray-900 dark:border-white rounded-full text-sm font-bold hover:scale-105 transition-transform flex items-center gap-2">
                    Visit Website
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Encrypted Chat */}
            <div className="rounded-3xl bg-white dark:bg-black border-2 border-gray-200 dark:border-white/10 p-6 hover:border-[#00D4AA] transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="px-2 py-1 bg-gray-100 dark:bg-white/5 rounded-full text-xs font-bold">
                  MESSAGING
                </span>
              </div>
              <h3 className="text-xl font-black mb-2">ENCRYPTED CHAT</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                End-To-End Encryption For Private & Group Chats. Your
                Conversations Stay Private.
              </p>
            </div>

            {/* Marketplace */}
            <div className="rounded-3xl bg-white dark:bg-black border-2 border-gray-200 dark:border-white/10 p-6 hover:border-[#00D4AA] transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <span className="px-2 py-1 bg-gray-100 dark:bg-white/5 rounded-full text-xs font-bold">
                  COMMERCE
                </span>
              </div>
              <h3 className="text-xl font-black mb-2">MARKETPLACE</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                5% Platform Fees vs 13% On eBay. Instant VCoin Settlement For
                All Transactions.
              </p>
            </div>

            {/* Communities */}
            <div className="rounded-3xl bg-white dark:bg-black border-2 border-gray-200 dark:border-white/10 p-6 hover:border-[#00D4AA] transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="px-2 py-1 bg-gray-100 dark:bg-white/5 rounded-full text-xs font-bold">
                  PARAMETRICAL
                </span>
              </div>
              <h3 className="text-xl font-black mb-2">COMMUNITIES</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Discord/Reddit-Style Groups With Advanced Moderation Tools And
                Community Governance.
              </p>
            </div>

            {/* Orb AI */}
            <div className="rounded-3xl bg-white dark:bg-black border-2 border-gray-200 dark:border-white/10 p-6 hover:border-[#00D4AA] transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="px-2 py-1 bg-gray-100 dark:bg-white/5 rounded-full text-xs font-bold">
                  PARAMETRICAL
                </span>
              </div>
              <h3 className="text-xl font-black mb-2">ORB AI</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Privacy-First AI Recommendations And Content Discovery Tailored
                To Your Interests.
              </p>
            </div>

            {/* 80% Revenue - Featured */}
            <div className="md:col-span-2 rounded-3xl bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 border-2 border-yellow-500/40 p-8 hover:border-yellow-500 transition-all relative overflow-hidden">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shrink-0">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-white dark:bg-black rounded-full text-xs font-bold text-yellow-600 mb-3">
                    CREATOR REVENUE
                  </div>
                  <h3 className="text-3xl font-black mb-3 text-gray-900 dark:text-white">
                    80% CREATOR REVENUE
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-400 max-w-lg">
                    Fair Compensation For Creators. Keep 80-95% Of Your
                    Earnings, Powered By VCoin.
                  </p>
                </div>
                <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10">
                  <VCoinRewardsSkeleton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE VYRAL DIFFERENCE */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Bold Header */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4">
              <span className="text-gray-900 dark:text-white">/THE </span>
              <span className="bg-gradient-to-r from-[#00D4AA] to-cyan-400 bg-clip-text text-transparent">
                VYRAL DIFFERENCE
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Everything You Love About Social Media, None Of The Exploitation.
              See How We Stack Up Against Traditional Platforms.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="rounded-3xl bg-white dark:bg-black border-2 border-gray-200 dark:border-white/10 overflow-hidden">
            {/* Table Header */}
            <div className="grid md:grid-cols-3 border-b-2 border-gray-200 dark:border-white/10">
              <div className="p-6 border-r border-gray-200 dark:border-white/10">
                <h3 className="text-xl font-black text-gray-900 dark:text-white">
                  FEATURE
                </h3>
              </div>
              <div className="p-6 border-r border-gray-200 dark:border-white/10 bg-red-50 dark:bg-red-950/20">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">❌</span>
                  <h3 className="text-xl font-black text-red-600 dark:text-red-400">
                    TRADITIONAL
                  </h3>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-[#00D4AA]/10 to-cyan-400/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4AA] to-cyan-400 flex items-center justify-center">
                    <span className="text-white text-lg">✓</span>
                  </div>
                  <h3 className="text-xl font-black bg-gradient-to-r from-[#00D4AA] to-cyan-400 bg-clip-text text-transparent">
                    VYRAL
                  </h3>
                </div>
              </div>
            </div>

            {/* Comparison Rows */}
            {[
              {
                feature: "Content Ownership",
                traditional: "Platform owns content",
                vyral: "You own your content",
              },
              {
                feature: "Data Privacy",
                traditional: "Data sold to advertisers",
                vyral: "Data stays private",
              },
              {
                feature: "Algorithm Control",
                traditional: "Algorithm controls reach",
                vyral: "You control your feed",
              },
              {
                feature: "Platform Fees",
                traditional: "High fees (30-50%)",
                vyral: "Fair fees (5-20%)",
              },
              {
                feature: "Transparency",
                traditional: "Zero transparency",
                vyral: "100% transparent",
              },
              {
                feature: "User Priority",
                traditional: "You are the product",
                vyral: "You are the customer",
              },
            ].map((row, i) => (
              <div
                key={i}
                className="grid md:grid-cols-3 border-b border-gray-200 dark:border-white/10 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <div className="p-6 border-r border-gray-200 dark:border-white/10">
                  <p className="font-black text-gray-900 dark:text-white">
                    {row.feature}
                  </p>
                </div>
                <div className="p-6 border-r border-gray-200 dark:border-white/10">
                  <div className="flex items-start gap-2">
                    <XIcon />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {row.traditional}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-2">
                    <CheckIcon />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {row.vyral}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VCoin & Creators Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-transparent via-[#00D4AA]/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: VCoin Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4">
                  <span className="text-gray-900 dark:text-white">/MEET </span>
                  <span className="bg-gradient-to-r from-[#00D4AA] to-cyan-400 bg-clip-text text-transparent">
                    VCOIN
                  </span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  The Currency That Powers VYRAL. Earn It Creating Content.
                  Built On Solana For Speed And Low Fees.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    icon: "🎁",
                    title: "Earn Rewards",
                    desc: "For quality content",
                  },
                  {
                    icon: "💝",
                    title: "Tip Creators",
                    desc: "80% goes to them",
                  },
                  {
                    icon: "🛒",
                    title: "Marketplace",
                    desc: "Buy & sell items",
                  },
                  {
                    icon: "💸",
                    title: "Withdraw Anytime",
                    desc: "Full control",
                  },
                  {
                    icon: "📈",
                    title: "DEX Trading",
                    desc: "Coming soon",
                  },
                  {
                    icon: "⭐",
                    title: "Real Utility",
                    desc: "Actual value",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-bold text-sm mb-1">{item.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: 3D VCoin Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative flex items-center justify-center min-h-[500px]"
            >
              {/* Central VCoin Card */}
              <div className="relative z-10 lg:z-20 rounded-3xl bg-gradient-to-br from-[#00D4AA] to-cyan-400 p-8 shadow-2xl border-8 border-white dark:border-gray-800 w-full max-w-sm">
                <div className="text-center mb-6">
                  <div className="text-7xl font-black text-black mb-2">10B</div>
                  <div className="text-xl font-bold text-black/90">
                    Total Supply
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-sm text-black/80 mb-1">
                      Fixed Supply
                    </div>
                    <div className="text-lg font-black text-black">
                      No Inflation
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-sm text-black/80 mb-1">
                      Initial Price
                    </div>
                    <div className="text-lg font-black text-black">$0.01</div>
                  </div>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0 }}
                className="absolute top-8 -left-6 bg-white dark:bg-black/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-2xl z-30 border-2 border-[#00D4AA]/40"
              >
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  For Users
                </div>
                <div className="text-2xl font-black text-[#00D4AA]">50%</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
                className="absolute top-24 -right-8 bg-white dark:bg-black/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-2xl z-30 border-2 border-orange-500/40"
              >
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Burned
                </div>
                <div className="text-2xl font-black text-orange-600 dark:text-orange-400">
                  1%
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 0.6 }}
                className="absolute bottom-24 -left-8 bg-white dark:bg-black/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-2xl z-30 border-2 border-cyan-500/40"
              >
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  TPS
                </div>
                <div className="text-2xl font-black text-purple-600 dark:text-purple-400">
                  65K
                </div>
              </motion.div>

              {/* Floating Icon */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-2xl flex items-center justify-center text-3xl z-40"
              >
                🪙
              </motion.div>
            </motion.div>
          </div>

          {/* VCoin Economics */}
          <section className="relative py-20 px-6 bg-gradient-to-b from-transparent via-gray-50 dark:via-gray-900/20 to-transparent">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left: Info */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4">
                      <span className="text-gray-900 dark:text-white">
                        /VCOIN{" "}
                      </span>
                      <span className="bg-gradient-to-r from-[#00D4AA] to-cyan-400 bg-clip-text text-transparent">
                        ECONOMICS
                      </span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg">
                      10 Billion Tokens With Deflationary Mechanics. Built On
                      Solana For Maximum Speed And Minimal Fees.
                    </p>
                  </div>

                  {/* Feature Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Solana Blockchain */}
                    <div className="rounded-3xl bg-white dark:bg-black border-2 border-gray-200 dark:border-white/10 p-5 hover:border-cyan-500 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-pink-500 flex items-center justify-center">
                          <span className="text-xl">⛓️</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black text-gray-900 dark:text-white">
                            10B
                          </div>
                          <div className="text-[10px] text-gray-600 dark:text-gray-400">
                            Supply
                          </div>
                        </div>
                      </div>
                      <h3 className="text-base font-black mb-1">SOLANA</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        65K TPS, Low Fees
                      </p>
                    </div>

                    {/* Fixed Supply */}
                    <div className="rounded-3xl bg-white dark:bg-black border-2 border-gray-200 dark:border-white/10 p-5 hover:border-[#00D4AA] transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4AA] to-cyan-400 flex items-center justify-center">
                          <span className="text-xl">🔒</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black text-[#00D4AA]">
                            10B
                          </div>
                          <div className="text-[10px] text-gray-600 dark:text-gray-400">
                            Max
                          </div>
                        </div>
                      </div>
                      <h3 className="text-base font-black mb-1">
                        FIXED SUPPLY
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Mint Disabled Forever
                      </p>
                    </div>

                    {/* Deflationary */}
                    <div className="rounded-3xl bg-white dark:bg-black border-2 border-gray-200 dark:border-white/10 p-5 hover:border-orange-500 transition-all">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-3">
                        <span className="text-xl">🔥</span>
                      </div>
                      <h3 className="text-base font-black mb-1">
                        DEFLATIONARY
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        1% Tips Burned
                      </p>
                    </div>

                    {/* 4-Year Vesting */}
                    <div className="rounded-3xl bg-white dark:bg-black border-2 border-gray-200 dark:border-white/10 p-5 hover:border-blue-500 transition-all">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-3">
                        <span className="text-xl">⏰</span>
                      </div>
                      <h3 className="text-base font-black mb-1">
                        4-YEAR VESTING
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Team Alignment
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Social Media Problems Visual */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative flex items-end justify-center min-h-[500px] -mb-11"
                >
                  {/* Central Problem Cards */}
                  <div className="relative z-10 lg:z-20 w-full max-w-lg space-y-4">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-3xl md:text-4xl font-black mb-2">
                        <span className="text-gray-900 dark:text-white">
                          Social Media is{" "}
                        </span>
                        <span className="text-red-500">Broken</span>
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Big Tech profits while you get exploited. It's time for
                        change.
                      </p>
                    </div>

                    {/* Problem Cards Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Your Data, Their Billions */}
                      <div className="rounded-2xl bg-white dark:bg-black border-2 border-gray-200 dark:border-white/10 p-5 hover:border-red-500 transition-all">
                        <div className="text-3xl mb-3">🚫</div>
                        <h4 className="text-base font-black mb-2 text-gray-900 dark:text-white">
                          Your Data, Their Billions
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Platforms make billions selling your personal
                          information to advertisers. You get nothing.
                        </p>
                      </div>

                      {/* Algorithmic Manipulation */}
                      <div className="rounded-2xl bg-white dark:bg-black border-2 border-gray-200 dark:border-white/10 p-5 hover:border-red-500 transition-all">
                        <div className="text-3xl mb-3">🎭</div>
                        <h4 className="text-base font-black mb-2 text-gray-900 dark:text-white">
                          Algorithmic Manipulation
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Feeds optimized for engagement and addiction, not your
                          wellbeing or interests.
                        </p>
                      </div>

                      {/* Creators Exploited */}
                      <div className="rounded-2xl bg-white dark:bg-black border-2 border-gray-200 dark:border-white/10 p-5 hover:border-red-500 transition-all">
                        <div className="text-3xl mb-3">💸</div>
                        <h4 className="text-base font-black mb-2 text-gray-900 dark:text-white">
                          Creators Exploited
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Platforms take 30-50% cuts and can demonetize you
                          overnight without explanation.
                        </p>
                      </div>

                      {/* Zero Privacy */}
                      <div className="rounded-2xl bg-white dark:bg-black border-2 border-gray-200 dark:border-white/10 p-5 hover:border-red-500 transition-all">
                        <div className="text-3xl mb-">🔓</div>
                        <h4 className="text-base font-black mb-2 text-gray-900 dark:text-white">
                          Zero Privacy
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Every click, message, and like tracked, analyzed, and
                          monetized without your consent.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Floating Warning Badge */}
                  <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-6 -right-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 shadow-2xl flex items-center justify-center text-3xl z-40"
                  >
                    ⚠️
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Built for Creators Section */}
          <div className="mt-20 grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: 3D Calculator Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative flex items-center justify-center min-h-[500px] order-2 lg:order-1"
            >
              {/* Central Calculator */}
              <div className="relative z-10 lg:z-20 w-full max-w-md">
                <EarningsCalculator />
              </div>

              {/* Floating Benefits Cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0 }}
                className="absolute -top-4 -right-6 bg-gradient-to-br from-emerald-500 to-green-500 text-white rounded-2xl px-5 py-4 shadow-2xl z-30"
              >
                <div className="text-xs mb-1 opacity-90">Keep</div>
                <div className="text-3xl font-black">80-95%</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
                className="absolute top-32 -left-8 bg-white dark:bg-black/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-2xl z-30 border-2 border-blue-500/40"
              >
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Analytics
                </div>
                <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
                  📊
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 0.6 }}
                className="absolute -bottom-4 -right-4 bg-white dark:bg-black/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-2xl z-30 border-2 border-cyan-500/40"
              >
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Streams
                </div>
                <div className="text-2xl font-black text-purple-600 dark:text-purple-400">
                  💎
                </div>
              </motion.div>

              {/* Floating Icon */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-12 -left-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-400 to-red-500 shadow-2xl flex items-center justify-center text-3xl z-40"
              >
                💰
              </motion.div>
            </motion.div>

            {/* Right: Creator Info */}
            <div className="space-y-6 order-1 lg:order-2">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4">
                  <span className="text-gray-900 dark:text-white">
                    /BUILT FOR{" "}
                  </span>
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                    CREATORS
                  </span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Stop Giving Away Half Your Earnings. Monetize On Your Terms
                  With Fair Revenue Sharing.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    icon: "💰",
                    title: "Keep 80-95%",
                    desc: "Lowest fees in industry",
                  },
                  { icon: "📊", title: "Analytics", desc: "Detailed insights" },
                  {
                    icon: "💎",
                    title: "Multiple Streams",
                    desc: "Tips, subs, marketplace",
                  },
                  {
                    icon: "🚫",
                    title: "No Demonetization",
                    desc: "Fair enforcement",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <div className="font-black text-sm text-gray-900 dark:text-white">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-transparent via-gray-50 dark:via-gray-900/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          {/* Bold Header */}
          <div className="mb-8 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4">
              <span className="text-gray-900 dark:text-white">
                /DEVELOPMENT{" "}
              </span>
              <span className="bg-gradient-to-r from-[#00D4AA] to-cyan-400 bg-clip-text text-transparent">
                ROADMAP
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              Our Journey To Revolutionize Social Media. From Foundation To
              Global Scale.
            </p>

            <div className="max-w-4xl mx-auto bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800/50 rounded-3xl p-5 text-center">
              <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                <strong>DISCLAIMER:</strong> Roadmap goals as of Oct 2025.
                Timelines, user numbers, and features are projections subject to
                change.
              </p>
              <p className="text-[10px] text-gray-600 dark:text-gray-400">
                User growth estimates may vary, timelines are adjustable based
                on various factors, and the 1B+ user target is aspirational.
                VCoin is a utility token and not an investment.
              </p>
            </div>
          </div>
          {/* Timeline Component */}
          <div className="mb-20">
            <Timeline
              data={[
                {
                  title: "2025",
                  content: (
                    <div className="space-y-4 max-w-4xl">
                      {/* Completed */}
                      <div className="rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-400/10 border border-green-500/40 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="text-xl">✅</div>
                          <h3 className="text-base font-black text-green-600 dark:text-green-400">
                            Completed (Oct 2025) - Foundation Built
                          </h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
                            <div
                              key={i}
                              className="flex items-start gap-1.5 text-xs bg-white/50 dark:bg-black/50 border border-green-500/20 rounded-lg p-2"
                            >
                              <span className="text-green-500 mt-0.5 text-[10px]">
                                ✓
                              </span>
                              <span className="text-gray-700 dark:text-gray-300">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Q4 2025 */}
                      <div className="rounded-2xl bg-white dark:bg-black border border-[#00D4AA]/40 p-4">
                        <h4 className="text-sm font-black mb-3 text-[#00D4AA]">
                          Q4 2025 - Final Prep
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {[
                            "Security audit",
                            "Legal compliance",
                            "Beta testing",
                            "Payment integration",
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="px-3 py-2 bg-gradient-to-r from-[#00D4AA]/10 to-transparent border border-[#00D4AA]/20 rounded-lg text-xs font-medium"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "2026",
                  content: (
                    <div className="space-y-4 max-w-4xl">
                      {/* Q1 2026 */}
                      <div className="rounded-2xl bg-white dark:bg-black border border-[#00D4AA]/40 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-black text-[#00D4AA]">
                            Q1 - Launch
                          </h4>
                          <span className="px-2 py-0.5 bg-[#00D4AA]/20 rounded-full text-[10px] font-bold text-[#00D4AA]">
                            10K+ USERS
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {[
                            "Mainnet live",
                            "VCoin sales",
                            "Creator onboarding",
                            "Platform launch",
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="px-3 py-2 bg-gradient-to-r from-[#00D4AA]/10 to-transparent border border-[#00D4AA]/20 rounded-lg text-xs font-medium"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Q2 2026 */}
                      <div className="rounded-2xl bg-white dark:bg-black border border-cyan-500/40 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-black text-cyan-600 dark:text-cyan-400">
                            Q2 - Growth
                          </h4>
                          <span className="px-2 py-0.5 bg-cyan-500/20 rounded-full text-[10px] font-bold text-cyan-600 dark:text-cyan-400">
                            50K+ USERS
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {[
                            "Earning features",
                            "Marketplace",
                            "Partnerships",
                            "Mobile optimization",
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="px-3 py-2 bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-lg text-xs font-medium"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Q3 2026 */}
                      <div className="rounded-2xl bg-white dark:bg-black border border-blue-500/40 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-black text-blue-600 dark:text-blue-400">
                            Q3 - DEX
                          </h4>
                          <span className="px-2 py-0.5 bg-blue-500/20 rounded-full text-[10px] font-bold text-blue-600 dark:text-blue-400">
                            100K+ USERS
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {[
                            "Raydium pool",
                            "Public trading",
                            "CMC/CG listing",
                            "Creator tools",
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="px-3 py-2 bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20 rounded-lg text-xs font-medium"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Q4 2026 */}
                      <div className="rounded-2xl bg-white dark:bg-black border border-indigo-500/40 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                            Q4 - Platform Enhancement
                          </h4>
                          <span className="px-2 py-0.5 bg-indigo-500/20 rounded-full text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                            500K+ USERS
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {[
                            "Orb AI advanced features",
                            "Cross-platform integration",
                            "International expansion",
                            "Enterprise solutions beta",
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="px-3 py-2 bg-gradient-to-r from-indigo-500/10 to-transparent border border-indigo-500/20 rounded-lg text-xs font-medium"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "2027",
                  content: (
                    <div className="space-y-4 max-w-4xl">
                      {/* Q1-Q2 2027 */}
                      <div className="rounded-2xl bg-white dark:bg-black border border-cyan-500/40 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-black text-purple-600 dark:text-purple-400">
                            Q1-Q2 - Scale & Innovation
                          </h4>
                          <span className="px-2 py-0.5 bg-cyan-500/20 rounded-full text-[10px] font-bold text-purple-600 dark:text-purple-400">
                            5-10M USERS
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {[
                            "Multi-language support",
                            "Advanced marketplace",
                            "DeFi integrations",
                            "Metaverse integration",
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="px-3 py-2 bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-lg text-xs font-medium"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Q2-Q4 2027 */}
                      <div className="rounded-2xl bg-white dark:bg-black border border-pink-500/40 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-black text-pink-600 dark:text-pink-400">
                            Q2-Q4 - Global Expansion
                          </h4>
                          <span className="px-2 py-0.5 bg-pink-500/20 rounded-full text-[10px] font-bold text-pink-600 dark:text-pink-400">
                            50-100M USERS
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {[
                            "Multi-chain support",
                            "Advanced AI capabilities",
                            "Enterprise launch",
                            "Web3 ecosystem integration",
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="px-3 py-2 bg-gradient-to-r from-pink-500/10 to-transparent border border-pink-500/20 rounded-lg text-xs font-medium"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "2028-2029",
                  content: (
                    <div className="space-y-4 max-w-4xl">
                      <div className="rounded-2xl bg-white dark:bg-black border border-orange-500/40 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-black text-orange-600 dark:text-orange-400">
                            Mass Adoption
                          </h4>
                          <span className="px-2 py-0.5 bg-orange-500/20 rounded-full text-[10px] font-bold text-orange-600 dark:text-orange-400">
                            500M USERS
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {[
                            "Full platform decentralization",
                            "Cross-platform interoperability",
                            "Advanced metaverse presence",
                            "Quantum-ready security prep",
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="px-3 py-2 bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20 rounded-lg text-xs font-medium"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Beyond 2029",
                  content: (
                    <div className="space-y-4 max-w-4xl">
                      {/* Vision Realized */}
                      <div className="rounded-2xl bg-gradient-to-br from-[#00D4AA]/20 to-cyan-400/20 border border-[#00D4AA] p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-black text-[#00D4AA]">
                            Vision Realized
                          </h4>
                          <span className="px-2 py-0.5 bg-[#00D4AA]/30 rounded-full text-[10px] font-bold text-[#00D4AA]">
                            1B+ USERS
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {[
                            "Leading Web3 social platform",
                            "Full metaverse integration",
                            "Quantum-resistant infrastructure",
                            "Neural interface compatibility",
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="px-3 py-2 bg-gradient-to-r from-[#00D4AA]/10 to-transparent border border-[#00D4AA]/30 rounded-lg text-xs font-medium"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Innovation Areas */}
                      <div className="rounded-2xl bg-gradient-to-br from-cyan-500/20 to-pink-500/20 border border-cyan-500/40 p-4">
                        <h4 className="text-sm font-black mb-3 text-purple-600 dark:text-purple-400">
                          Continuous Innovation
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {[
                            "Autonomous AI agents",
                            "Cross-reality experiences",
                            "Universal digital identity",
                            "Global digital economy leader",
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="px-3 py-2 bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-lg text-xs font-medium"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </div>

          {/* Development Principles - 3D Visual Card */}
          <div className="mt-16 grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
                  <span className="text-gray-900 dark:text-white">
                    /DEVELOPMENT{" "}
                  </span>
                  <span className="bg-gradient-to-r from-[#00D4AA] to-cyan-400 bg-clip-text text-transparent">
                    PRINCIPLES
                  </span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Our Core Values Guide Every Decision We Make To Build A Better
                  Social Platform.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                ].map((principle, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-white dark:bg-black border-2 border-gray-200 dark:border-white/10 p-4 hover:border-[#00D4AA] transition-all"
                  >
                    <div className="text-3xl mb-2">{principle.icon}</div>
                    <h4 className="font-black text-sm mb-1 text-gray-900 dark:text-white">
                      {principle.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {principle.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: 3D Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative flex items-center justify-center min-h-[400px]"
            >
              {/* Central Card */}
              <div className="relative z-10 lg:z-20 rounded-3xl bg-gradient-to-br from-[#00D4AA]/20 to-cyan-400/20 border-2 border-[#00D4AA] p-8 w-full max-w-md">
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                    Built Different
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Community-First Development
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "🔒", title: "Security" },
                    { icon: "⚖️", title: "Compliant" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-white/50 dark:bg-black/50 backdrop-blur-sm p-4 text-center"
                    >
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <div className="font-black text-xs">{item.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Icons */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00D4AA] to-cyan-400 shadow-2xl flex items-center justify-center text-3xl z-40"
              >
                ⚡
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-6 -left-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-pink-500 shadow-2xl flex items-center justify-center text-2xl z-40"
              >
                🚀
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
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
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-24 mb-12">
            {/* <div>
              <svg
                width="120"
                height="30"
                viewBox="0 0 1002 256"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-4"
              >
                <path
                  d="M189.536 0H256V0.108471L194.546 167.202H128.082L189.536 0.108471"
                  fill="#00D4AA"
                />
                <path
                  d="M94.08 256L0 0H66.6348L128.08 167.202L95.2753 256"
                  fill="white"
                />
                <path
                  d="M860 255.901L923.975 0H976.862L924.26 209.839H1001.03L989.657 255.901H860Z"
                  fill="white"
                />
                <path
                  d="M631 255.9L803.156 0H803.705L849.558 255.9H802.607L795.193 211.969H711.175L681.796 255.9H631ZM737.533 172.43H788.329L783.936 147.17C782.655 140.397 781.556 133.899 780.641 127.675C779.726 121.269 779.177 113.855 778.994 105.435C774.967 113.672 770.94 120.994 766.913 127.401C763.069 133.807 758.858 140.397 754.282 147.17L737.533 172.43Z"
                  fill="white"
                />
                <path
                  d="M420.514 256L483.921 0.0987129H556.711C570.738 0.0987129 583.344 3.22639 594.527 9.48176C605.711 15.5476 614.526 23.8881 620.97 34.5032C627.605 45.1184 630.922 57.0604 630.922 70.3294C630.922 80.755 628.837 90.8963 624.667 100.753C620.497 110.421 614.715 119.235 607.322 127.196C600.119 134.968 591.779 141.508 582.301 146.815L620.97 256H568.369L535.67 158.758H494.157L469.989 256H420.514ZM504.678 116.107H537.66C545.622 116.107 552.92 114.307 559.554 110.705C566.189 107.103 571.401 102.27 575.193 96.2039C579.173 90.138 581.164 83.5036 581.164 76.3004C581.164 67.2017 577.941 59.9038 571.496 54.4066C565.051 48.9095 556.521 46.1609 545.906 46.1609H522.022L504.678 116.107Z"
                  fill="white"
                />
                <path
                  d="M279.667 255.901L310.091 134.775L270 0H324.024L339.946 57.4356C341.084 61.6059 342.221 65.8709 343.358 70.2307C344.496 74.5905 345.444 79.7085 346.202 85.5848C349.993 79.5189 353.5 74.4009 356.722 70.2307C359.945 65.8709 363.167 61.6059 366.389 57.4356L411.03 0H468.466L361.271 134.775L330.848 255.901H279.667Z"
                  fill="white"
                />
              </svg>{" "}
              <p className="text-white/80 text-sm leading-relaxed">
                A social platform built on Solana where creators earn what they
                deserve, users get rewarded for their engagement, and privacy
                comes standard. Powered by VCoin to create a user-first
                ecosystem.
              </p>
            </div> */}

            <div>
              <h4 className="font-black text-white mb-4">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/docs"
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/whitepaper"
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    Whitepaper
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/tutorial"
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link
                    href="docs/tutorial/commerce/earning-vcoin"
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    Earning VCoin
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/docs/whitepaper/roadmap"
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    Roadmap
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/whitepaper/token-economics"
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    Tokenomics
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/whitepaper/smart-contracts"
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    Smart Contracts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/compliance"
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/docs/compliance/privacy"
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/compliance/terms"
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    Media Kit
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/compliance/acceptable-use"
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    Changelogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/compliance/risk-disclosure"
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    Contacts Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/docs/compliance/privacy"
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/compliance/terms"
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/compliance/acceptable-use"
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    Acceptable Use Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/compliance/risk-disclosure"
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    Risk Disclosure
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/20 flex justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2025 VYRAL. All rights reserved.
            </p>

            <div className="flex gap-3 flex-wrap">
              {/* Primary Social */}
              <Link
                href="https://x.com/getvyral"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <FaXTwitter className="w-5 h-5" />
              </Link>

              {/* <Link
                href="https://instagram.com/get.vyral"
                    target="_blank"
    rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </Link> */}

              <Link
                href="https://tiktok.com/@getvyral"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok className="w-5 h-5" />
              </Link>

              <Link
                href="https://youtube.com/@getvyralofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="w-5 h-5" />
              </Link>

              {/* Community Platforms */}
              {/* <Link
                href="https://discord.gg/vyral"
                    target="_blank"
    rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Discord"
              >
                <FaDiscord className="w-5 h-5" />
              </Link> */}

              <Link
                href="https://t.me/getvyral"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Telegram"
              >
                <FaTelegram className="w-5 h-5" />
              </Link>

              {/* <Link
                href="https://reddit.com/r/vyral"
                    target="_blank"
    rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Reddit"
              >
                <FaReddit className="w-5 h-5" />
              </Link> */}

              <Link
                href="https://chat.whatsapp.com/KtiX55ckxPaK2crwmlFO48?mode=ems_copy_t"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="WhatsApp Community"
              >
                <FaWhatsapp className="w-5 h-5" />
              </Link>

              {/* Professional Platforms */}
              <Link
                href="https://linkedin.com/company/getvyral"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </Link>

              <Link
                href="https://github.com/getvyral"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </Link>

              {/* Alternative/Additional Platforms */}
              {/* <Link
                href="https://truthsocial.com/@getvyral"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Truth Social"
              >
                <span className="text-xs font-bold">TS</span>
              </Link> */}

              {/* <Link
                href="https://threads.net/@getvyral"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Threads"
              >
                <FaThreads className="w-5 h-5" />
              </Link> */}

              {/* <Link
                href="https://facebook.com/getvyral"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </Link> */}

              {/* <Link
                href="https://medium.com/@getvyral"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Medium"
              >
                <FaMedium className="w-5 h-5" />
              </Link> */}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
