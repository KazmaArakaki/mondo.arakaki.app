import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  allowedDevOrigins: [
    "mondo.arakaki.app.localhost",
  ],
};

export default nextConfig;
