/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sign-in",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
