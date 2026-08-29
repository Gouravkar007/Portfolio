import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost:3000",
    "127.0.0.1:3000",
    "10.150.22.240",
    "10.150.22.240:3000",
  ],
};

export default nextConfig;
