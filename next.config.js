/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pg'],
  },
  // opcional si no quieres que ESLint/TS rompan el build por warnings
  // eslint: { ignoreDuringBuilds: true },
  // typescript: { ignoreBuildErrors: false },
};
module.exports = nextConfig;
