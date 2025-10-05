import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { LottieIcon } from "./lottie-icon";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <LottieIcon />
          Vyral
        </>
      ),
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [
      {
        text: "Tutorial",
        url: "/docs/tutorial",
      },
      {
        text: "Whitepaper",
        url: "/docs/whitepaper",
      },
      {
        text: "Compliance",
        url: "/docs/compliance",
      },
      {
        text: "VYC Contract",
        url: "https://explorer.solana.com/address/Wuk2WeBmQGZHBq3E8k5iPrPHWbPbCvkJEzM1cDRWYt6/transfers?cluster=devnet",
        external: true,
      },
    ],
  };
}
