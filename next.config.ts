import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
typescript: { ignoreDevErrors: true, ignoreBuildErrors: true },    productionBrowserSourceMaps: false,
};

export default nextConfig;
