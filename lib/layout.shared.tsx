import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

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
          <svg
            width="24"
            height="24"
            viewBox="0 0 256 256"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Vyral Logo"
          >
            <path
              d="M189.536 0H256V0.108471L194.546 167.202H128.082L189.536 0.108471"
              fill="#00D4AA"
            />
            <path
              d="M94.08 256L0 0H66.6348L128.08 167.202L95.2753 256"
              fill="currentColor"
            />
          </svg>
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
