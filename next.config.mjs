/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async redirects() {
    return [
      { source: "/portfolio", destination: "/about", permanent: true },
      { source: "/research", destination: "/projects/snn-environmental-sound", permanent: true },
      { source: "/posts/:path*", destination: "/projects", permanent: true },
    ];
  },
};

export default nextConfig;
