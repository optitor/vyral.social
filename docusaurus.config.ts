import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "My Site",
  tagline: "Dinosaurs are cool",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://docs.vyral.social",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Vyral", // Usually your GitHub org/user name.
  projectName: "Vyral", // Usually your repo name.

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "",
      logo: {
        alt: "Vyral Logo",
        src: "img/logo-light.svg",
        srcDark: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Tutorial",
        },
        {
          type: "docSidebar",
          sidebarId: "whitepaperSidebar", // must match sidebars.ts key
          position: "left",
          label: "Whitepaper",
        },
        {
          type: "docSidebar",
          sidebarId: "complianceSidebar", // must match sidebars.ts key
          position: "left",
          label: "Compliance",
        },
        /*        
        {
          type: "docSidebar",
          sidebarId: "developerSidebar", // must match sidebars.ts key
          position: "left",
          label: "Developers",
        },
       {
          type: "docSidebar",
          sidebarId: "companySidebar", // must match sidebars.ts key
          position: "left",
          label: "Company",
        }, 
        */

        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://solscan.io/token/0x1f54638b6e759cc990d199ecca52cd6c8fca2c0b",
          label: "VCO CONTRACT",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Tutorial",
              to: "/docs/tutorial/intro",
            },
            {
              label: "Whitepaper",
              to: "/docs/whitepaper/abstract",
            },
            {
              label: "Developers",
              to: "/docs/developers/overview",
            },
          ],
        },
        {
          title: "Compliance",
          items: [
            {
              label: "Terms of Service (ToS)",
              href: "/docs/compliance/terms",
            },
            {
              label: "Privacy Policy",
              href: "/docs/compliance/privacy",
            },
            {
              label: "Acceptable Use Policy",
              href: "/docs/compliance/acceptable-use",
            },
            {
              label: "Risk Disclosure Statement",
              href: "/docs/compliance/risk-disclosure",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Company",
              to: "/docs/developers/about",
            },
            {
              label: "Blog",
              to: "/blog",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/vyral",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/vyral",
            },
            {
              label: "X",
              href: "https://x.com/vyral.social",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Vyral, Inc.`,
    },
    announcementBar: {
      id: "launch",
      content:
        '🎉 VYRAL is now live! Download on <a target="_blank" rel="noopener noreferrer" href="https://play.google.com/store">Google Play</a> or <a target="_blank" rel="noopener noreferrer" href="https://apps.apple.com">App Store</a>',
      backgroundColor: "#00D4AA",
      textColor: "#ffffff",
      isCloseable: true,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
