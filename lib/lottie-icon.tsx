"use client";

import { useRef, useState, useEffect } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import darkAnimation from "@/public/images/Vyral_Icon.json";
import lightAnimation from "@/public/images/Vyral_logo_light.json";

export function LottieIcon() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

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
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: 24, height: 24, display: "flex" }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={isDark ? darkAnimation : lightAnimation}
        loop={false}
        autoplay={false}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
