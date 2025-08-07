import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fsc-projects-static.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/**", // Permite qualquer caminho nesse domínio
      },
    ],
  },
};

export default nextConfig;
