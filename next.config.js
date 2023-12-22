/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
  images: {
    domains: ["res.cloudinary.com"],
  }
};

module.exports = nextConfig;
