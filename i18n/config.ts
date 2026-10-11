import { identity } from "@/data/portfolio";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const localeCookie = "personal_locale";
export const localeHeader = "x-locale";
export const localeNames = { en: "English", es: "Español" } as const;

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "es";
}

export function localePath(locale: Locale, hash = "") {
  return `${locale === "en" ? "/" : "/es"}${hash}`;
}

/** Absolute canonical URL, matching the framework's canonical tag (no trailing slash). */
export function localeUrl(locale: Locale) {
  return locale === "en" ? identity.url : `${identity.url}/es`;
}

export function languageAlternates() {
  return { en: "/", es: "/es", "x-default": "/" };
}

/** Formats an ISO year-month with the dictionary's month names, independent of ICU data. */
export function formatMonth(value: string, months: readonly string[]) {
  const [year, month] = value.split("-");
  return `${months[Number(month) - 1]} ${year}`;
}
