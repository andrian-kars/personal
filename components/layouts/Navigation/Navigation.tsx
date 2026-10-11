import { Download } from "lucide-react";
import Link from "next/link";
import type { Content } from "@/content/types";
import { localePath, type Locale } from "@/i18n/config";
import { LanguageSwitch } from "@/components/layouts/LanguageSwitch/LanguageSwitch";
import styles from "./Navigation.module.scss";

export function Navigation({ content, locale }: { content: Content; locale: Locale }) {
  const { profile, navigation } = content;
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link
          href={localePath(locale, "#about")}
          className={styles.wordmark}
          aria-label={`ak. ${profile.name}, ${navigation.home}`}
        >
          ak<span aria-hidden="true">.</span>
        </Link>
        <nav aria-label={navigation.label} className={styles.navigation}>
          {navigation.links.map((link) => (
            <Link key={link.id} href={localePath(locale, `#${link.id}`)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.actions}>
          <LanguageSwitch locale={locale} label={content.ui.language} />
          <a
            className={styles.resume}
            href={profile.cv}
            download={profile.cvFileName}
            aria-label={`${navigation.download} (PDF)`}
          >
            <Download size={16} aria-hidden="true" /> <span>{navigation.download}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
