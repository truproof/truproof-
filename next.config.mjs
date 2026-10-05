/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/__clerk/:path*',
        destination: 'https://clerk.truproof.vercel.app/__clerk/:path*',
      },
      {
        source: '/__clerk_api/:path*',
        destination: 'https://api.clerk.com/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
