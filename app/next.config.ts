import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ['@yugabytedb/pg', 'pg'],
};

export default nextConfig;
