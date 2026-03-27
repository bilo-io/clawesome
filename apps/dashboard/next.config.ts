import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  transpilePackages: ["@clawesome/ui", "@antigravity/core"],
};

export default nextConfig;
