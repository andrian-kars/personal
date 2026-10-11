import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Main } from "@/components/layouts/Main/Main";
import { getContent } from "@/content";
import { isLocale, languageAlternates, localePath, locales } from "@/i18n/config";
import { fontVariables } from "@/styles/fonts";
import "@/styles/index.scss";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { profile } = getContent(lang);
  const title = `${profile.name} | ${profile.role}`;
  const images = [
    {
      url: lang === "en" ? "/opengraph-image" : "/opengraph-image/es",
      width: 1200,
      height: 630,
      alt: `${profile.name}, ${profile.role}. ${profile.specialties.join(", ")}.`,
    },
  ];
  return {
    metadataBase: new URL(profile.url),
    title: { default: title, template: `%s | ${profile.name}` },
    description: profile.description,
    alternates: { canonical: localePath(lang), languages: languageAlternates() },
    openGraph: {
      type: "website",
      locale: lang === "es" ? "es_ES" : "en_GB",
      alternateLocale: lang === "es" ? "en_GB" : "es_ES",
      url: localePath(lang),
      siteName: profile.name,
      title,
      description: profile.description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: profile.description,
      images,
    },
    icons: { icon: "/icon", apple: "/icon" },
    robots:
      process.env.VERCEL_ENV === "preview" ? { index: false, follow: false } : undefined,
  };
}

export const viewport: Viewport = { themeColor: "#191b1b" };

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const content = getContent(lang);
  return (
    <html lang={lang} className={fontVariables}>
      <body>
        <Main content={content} locale={lang}>
          {children}
        </Main>
      </body>
    </html>
  );
}
