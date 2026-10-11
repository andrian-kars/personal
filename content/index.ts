import { en } from "./en";
import { es } from "./es";
import type { Content } from "./types";
import type { Locale } from "@/i18n/config";

const content: Record<Locale, Content> = { en, es };

export function getContent(locale: Locale): Content {
  return content[locale];
}
