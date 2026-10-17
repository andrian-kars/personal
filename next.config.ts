import type { NextConfig } from "next";

// Sharkies is a Vite SPA deployed to GitHub Pages; it is built for the /sharkies/ base path.
const sharkies = "https://andrian-kars.github.io/sharkies";
// Solidaro is a static Next.js export deployed to GitHub Pages, built for the /solidaro base path.
const solidaro = "https://andrian-kars.github.io/solidaro";

const nextConfig: NextConfig = {
  agentRules: false,
  devIndicators: false,
  experimental: { globalNotFound: true },
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/favicon.ico", destination: "/icon", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/skills", destination: "/#expertise", permanent: true },
      { source: "/works", destination: "/#impact", permanent: true },
      { source: "/es/about", destination: "/es#about", permanent: true },
      { source: "/es/skills", destination: "/es#expertise", permanent: true },
      { source: "/es/works", destination: "/es#impact", permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/sharkies/assets/:file", destination: `${sharkies}/assets/:file` },
        // Top-level files: favicon, touch icon and the share image.
        {
          source: "/sharkies/:file([\\w-]+\\.[a-z0-9]+)",
          destination: `${sharkies}/:file`,
        },
        // Client-side routes all load the SPA shell.
        { source: "/sharkies", destination: `${sharkies}/` },
        { source: "/sharkies/:path*", destination: `${sharkies}/` },
        { source: "/solidaro/_next/:path*", destination: `${solidaro}/_next/:path*` },
        { source: "/solidaro/images/:path*", destination: `${solidaro}/images/:path*` },
        {
          source: "/solidaro/:file([\\w-]+\\.[a-z0-9]+)",
          destination: `${solidaro}/:file`,
        },
        { source: "/solidaro", destination: `${solidaro}/` },
        // Every page is an exported .html file; Pages answers anything else with its 404.html.
        { source: "/solidaro/:path*", destination: `${solidaro}/:path*.html` },
      ],
    };
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
