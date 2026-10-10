import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Main } from "@/components/layouts/Main/Main";
import { profile } from "@/data/portfolio";
import "@/styles/index.scss";

const headingFont = localFont({
  src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-heading",
  display: "swap",
  weight: "200 800",
});

const bodyFont = localFont({
  src: "../node_modules/@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-normal.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "200 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: profile.url,
    siteName: profile.name,
    title: `${profile.name} | ${profile.role}`,
    description: profile.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description: profile.description,
    images: [{ url: "/opengraph-image", alt: `${profile.name}, ${profile.role}` }],
  },
  icons: { apple: "/icon" },
};

export const viewport: Viewport = { themeColor: "#191b1b" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>
        <Main>{children}</Main>
      </body>
    </html>
  );
}
