/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flagsapi.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static2.finnhub.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image.cnbcfm.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "data.bloomberglp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s.yimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.seekingalpha.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.finnhub.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;