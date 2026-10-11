import type { MetadataRoute } from "next";
import { localeUrl, locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    en: localeUrl("en"),
    es: localeUrl("es"),
    "x-default": localeUrl("en"),
  };
  return locales.map((locale) => ({ url: localeUrl(locale), alternates: { languages } }));
}
