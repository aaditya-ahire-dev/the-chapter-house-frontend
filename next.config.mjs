/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        // This is the secure way: only allowing images from YOUR account.
        pathname: '/dxui4vwtr/**', 
      },
    ],
  }
};

export default nextConfig;
