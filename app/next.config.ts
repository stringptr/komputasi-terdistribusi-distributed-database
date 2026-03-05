import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ['@yugabytedb/pg', 'pg'],
};

export default nextConfig;
