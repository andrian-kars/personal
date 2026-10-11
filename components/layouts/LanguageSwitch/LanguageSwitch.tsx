"use client";

import { localeNames, localePath, locales, type Locale } from "@/i18n/config";
import styles from "../Navigation/Navigation.module.scss";

export function LanguageSwitch({ locale, label }: { locale: Locale; label: string }) {
  return (
    <nav className={styles.languageSwitch} aria-label={label}>
      {locales.map((language) => (
        <a
          key={language}
          href={`${localePath(language)}?language=${language}`}
          hrefLang={language}
          lang={language}
          aria-label={`${language.toUpperCase()} (${localeNames[language]})`}
          aria-current={language === locale ? "page" : undefined}
          onClick={(event) => {
            event.currentTarget.hash = window.location.hash;
          }}
        >
          {language.toUpperCase()}
        </a>
      ))}
    </nav>
  );
}
