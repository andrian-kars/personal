import type { MetadataRoute } from "next";
import { identity } from "@/data/portfolio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(process.env.VERCEL_ENV === "preview" ? { disallow: "/" } : { allow: "/" }),
    },
    sitemap: `${identity.url}/sitemap.xml`,
  };
}
