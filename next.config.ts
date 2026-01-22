import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
typescript: { ignoreDevErrors: true, tsconfigPath: false, ignoreBuildErrors: true },    eslint: { ignoreDuringBuilds: true },
    productionBrowserSourceMaps: false,
};

export default nextConfig;
