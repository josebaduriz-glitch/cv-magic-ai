/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ nueva clave en Next 15
  serverExternalPackages: ['pg'],

  // Opcional: no bloquees el build por lint si te molesta
  // eslint: { ignoreDuringBuilds: true },
  // typescript: { ignoreBuildErrors: false },
};

module.exports = nextConfig;
