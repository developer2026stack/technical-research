import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep file tracing inside this folder even if a lockfile exists higher up.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
