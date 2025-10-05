"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

// Original AnimatedTooltip for avatar lists
export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const animationFrameRef = useRef<number | null>(null);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: any) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const halfWidth = event.target.offsetWidth / 2;
      x.set(event.nativeEvent.offsetX - halfWidth);
    });
  };

  return (
    <>
      {items.map((item, idx) => (
        <div
          className="group relative -mr-4"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
              >
                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                <div className="relative z-30 text-base font-bold text-white">
                  {item.name}
                </div>
                <div className="text-xs text-white">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <img
            onMouseMove={handleMouseMove}
            height={100}
            width={100}
            src={item.image}
            alt={item.name}
            className="relative !m-0 h-14 w-14 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
          />
        </div>
      ))}
    </>
  );
};

// Enhanced AnimatedTooltip for detailed information
interface AnimatedInfoTooltipProps {
  children: React.ReactNode;
  title: string;
  description: string;
  status?: string;
  timeline?: string;
}

export const AnimatedInfoTooltip = ({
  children,
  title,
  description,
  status = "Coming Soon",
  timeline,
}: AnimatedInfoTooltipProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const animationFrameRef = useRef<number | null>(null);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-8, 8]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-20, 20]),
    springConfig
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const rect = event.currentTarget.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const halfWidth = rect.width / 2;
      x.set(offsetX - halfWidth);
    });
  };

  return (
    <div
      className="relative inline-block w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
              },
            }}
            exit={{ opacity: 0, y: 10, scale: 0.85 }}
            style={{
              translateX: translateX,
              rotate: rotate,
            }}
            className="absolute -top-40 left-1/2 z-50 w-72 -translate-x-1/2 pointer-events-none"
          >
            <div className="relative rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-50 dark:to-white p-5 shadow-2xl border border-[#00D4AA]/50">
              {/* Decorative gradients */}
              <div className="absolute inset-x-10 -bottom-px z-30 h-px bg-gradient-to-r from-transparent via-[#00D4AA] to-transparent" />
              <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

              {/* Content */}
              <div className="relative z-30 space-y-2">
                {/* Status Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="px-2.5 py-0.5 bg-gradient-to-r from-[#00D4AA] to-cyan-400 rounded-full">
                    <span className="text-[10px] font-bold text-white">
                      {status}
                    </span>
                  </div>
                  {timeline && (
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      {timeline}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h4 className="text-base font-bold text-white dark:text-gray-900 mb-2">
                  {title}
                </h4>

                {/* Description */}
                <p className="text-xs text-gray-300 dark:text-gray-600 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Arrow */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-gray-900 dark:bg-white border-r border-b border-[#00D4AA]/50" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="cursor-not-allowed opacity-80 hover:opacity-90 transition-opacity">
        {children}
      </div>
    </div>
  );
};
