import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  serverExternalPackages: ['@yugabytedb/pg', 'pg'],
};

export default nextConfig;
