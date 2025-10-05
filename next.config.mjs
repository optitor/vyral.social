import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',           // ← ADD THIS: Enable static HTML export
  distDir: 'build',           // ← ADD THIS: Output to 'build' folder instead of '.next'
  images: {                   // ← ADD THIS: Disable image optimization for static export
    unoptimized: true,
  },
};

export default withMDX(config);