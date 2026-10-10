import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  devIndicators: false,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/favicon.ico", destination: "/icon", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/skills", destination: "/#expertise", permanent: true },
      { source: "/works", destination: "/#impact", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
