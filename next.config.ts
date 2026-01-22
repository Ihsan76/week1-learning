import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    typescript: { ignoreDevErrors: true },
    eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
