import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
    // Skip server-side image optimization in dev.
    // In dev, Next.js fetches external images server-side to optimize them,
    // which fails if a corporate/network CA isn't trusted by Node.js.
    // With unoptimized=true, <Image> renders a plain <img> tag and the
    // browser fetches the URL directly (using the OS/browser cert store, which works).
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
