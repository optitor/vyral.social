"use client";

import { motion } from "framer-motion";

// Social Feed - Chat Animation (like SkeletonOne)
export const SocialFeedSkeleton = () => {
  const variants = {
    initial: { x: 0 },
    animate: {
      x: 10,
      rotate: 5,
      transition: { duration: 0.2 },
    },
  };
  const variantsSecond = {
    initial: { x: 0 },
    animate: {
      x: -10,
      rotate: -5,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[#00D4AA] to-cyan-400 shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 shrink-0" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[#00D4AA] to-cyan-400 shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
      </motion.div>
    </motion.div>
  );
};

// Encrypted Chat - Loading bars (like SkeletonTwo)
export const EncryptedChatSkeleton = () => {
  const variants = {
    initial: { width: 0 },
    animate: {
      width: "100%",
      transition: { duration: 0.2 },
    },
    hover: {
      width: ["0%", "100%"],
      transition: { duration: 2 },
    },
  };
  const arr = new Array(6).fill(0);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skeleton-two" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"
        ></motion.div>
      ))}
    </motion.div>
  );
};

// Marketplace - Gradient Animation (like SkeletonThree)
export const MarketplaceSkeleton = () => {
  const variants = {
    initial: { backgroundPosition: "0 50%" },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
      style={{
        background:
          "linear-gradient(-45deg, #00D4AA, #06b6d4, #8b5cf6, #ec4899)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};

// Communities - Avatar Cards (like SkeletonFour)
export const CommunitiesSkeleton = () => {
  const first = {
    initial: { x: 20, rotate: -5 },
    hover: { x: 0, rotate: 0 },
  };
  const second = {
    initial: { x: -20, rotate: 5 },
    hover: { x: 0, rotate: 0 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00D4AA] to-cyan-400" />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Web3 Social
        </p>
        <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Active
        </p>
      </motion.div>
      <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400" />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Creators Hub
        </p>
        <p className="border border-[#00D4AA] bg-[#00D4AA]/10 text-[#00D4AA] text-xs rounded-full px-2 py-0.5 mt-4">
          Popular
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          NFT Traders
        </p>
        <p className="border border-cyan-500 bg-purple-100 dark:bg-purple-900/20 text-purple-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Trending
        </p>
      </motion.div>
    </motion.div>
  );
};

// Orb AI - Message Conversation (like SkeletonFive)
export const OrbAISkeleton = () => {
  const variants = {
    initial: { x: 0 },
    animate: {
      x: 10,
      rotate: 5,
      transition: { duration: 0.2 },
    },
  };
  const variantsSecond = {
    initial: { x: 0 },
    animate: {
      x: -10,
      rotate: -5,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2 items-start space-x-2 bg-white dark:bg-black"
      >
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00D4AA] to-cyan-400 shrink-0 flex items-center justify-center text-white font-bold">
          AI
        </div>
        <p className="text-xs text-neutral-500">
          Discover personalized content recommendations based on your interests
          and engagement patterns...
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <p className="text-xs text-neutral-500">Amazing!</p>
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 shrink-0" />
      </motion.div>
    </motion.div>
  );
};

// VCoin Rewards - Loading Animation (like SkeletonTwo variant)
export const VCoinRewardsSkeleton = () => {
  const variants = {
    initial: { width: 0 },
    animate: {
      width: "100%",
      transition: { duration: 0.2 },
    },
    hover: {
      width: ["0%", "100%"],
      transition: { duration: 2 },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 justify-center"
    >
      <div className="text-center mb-4">
        <div className="text-4xl font-bold bg-gradient-to-r from-[#00D4AA] to-cyan-400 bg-clip-text text-transparent">
          80%
        </div>
        <div className="text-xs text-neutral-500 mt-1">Creator Revenue</div>
      </div>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={"vcoin-" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 60) + 60 + "%",
          }}
          className="flex flex-row rounded-full border border-[#00D4AA]/30 p-2 items-center space-x-2 bg-gradient-to-r from-[#00D4AA]/10 to-cyan-400/10 dark:bg-black w-full h-3 mx-auto"
        ></motion.div>
      ))}
    </motion.div>
  );
};

// Traditional Social - Negative comparison skeleton
export const TraditionalSocialSkeleton = () => {
  const variants = {
    initial: { opacity: 0.5, scale: 1 },
    hover: {
      opacity: 0.3,
      scale: 0.98,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 p-4"
    >
      <motion.div
        variants={variants}
        className="flex items-center space-x-2 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 p-2"
      >
        <div className="h-6 w-6 rounded bg-red-400 shrink-0 flex items-center justify-center text-white text-xs font-bold">
          ✕
        </div>
        <div className="w-full bg-red-200 dark:bg-red-900/30 h-3 rounded-full" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex items-center space-x-2 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 p-2"
      >
        <div className="h-6 w-6 rounded bg-red-400 shrink-0 flex items-center justify-center text-white text-xs font-bold">
          ✕
        </div>
        <div className="w-3/4 bg-red-200 dark:bg-red-900/30 h-3 rounded-full" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex items-center space-x-2 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 p-2"
      >
        <div className="h-6 w-6 rounded bg-red-400 shrink-0 flex items-center justify-center text-white text-xs font-bold">
          ✕
        </div>
        <div className="w-5/6 bg-red-200 dark:bg-red-900/30 h-3 rounded-full" />
      </motion.div>
    </motion.div>
  );
};

// VYRAL Platform - Positive comparison skeleton
export const VyralPlatformSkeleton = () => {
  const variants = {
    initial: { opacity: 1, scale: 1 },
    hover: {
      opacity: 1,
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 p-4"
    >
      <motion.div
        variants={variants}
        className="flex items-center space-x-2 rounded-lg border border-[#00D4AA]/30 bg-[#00D4AA]/10 p-2"
      >
        <div className="h-6 w-6 rounded bg-gradient-to-r from-[#00D4AA] to-cyan-400 shrink-0 flex items-center justify-center text-white text-xs font-bold">
          ✓
        </div>
        <div className="w-full bg-[#00D4AA]/30 h-3 rounded-full" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex items-center space-x-2 rounded-lg border border-cyan-400/30 bg-cyan-400/10 p-2"
      >
        <div className="h-6 w-6 rounded bg-gradient-to-r from-cyan-400 to-blue-400 shrink-0 flex items-center justify-center text-white text-xs font-bold">
          ✓
        </div>
        <div className="w-3/4 bg-cyan-400/30 h-3 rounded-full" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex items-center space-x-2 rounded-lg border border-blue-400/30 bg-blue-400/10 p-2"
      >
        <div className="h-6 w-6 rounded bg-gradient-to-r from-blue-400 to-purple-400 shrink-0 flex items-center justify-center text-white text-xs font-bold">
          ✓
        </div>
        <div className="w-5/6 bg-blue-400/30 h-3 rounded-full" />
      </motion.div>
    </motion.div>
  );
};
