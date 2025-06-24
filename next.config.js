/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  basePath: '/contacts',
  async rewrites() {
    return [
      {
        source: '/v2/api/:path*',
        destination: '/api/v2/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
