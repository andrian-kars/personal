import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/layouts/Navigation/Navigation";
import type { Content } from "@/content/types";
import { localePath, type Locale } from "@/i18n/config";
import styles from "./Main.module.scss";

export function Main({
  children,
  content,
  locale,
}: {
  children: ReactNode;
  content: Content;
  locale: Locale;
}) {
  return (
    <>
      <a href="#main" className={styles.skip}>
        {content.ui.skip}
      </a>
      <Navigation content={content} locale={locale} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <p>
            &copy; {new Date().getUTCFullYear()} {content.profile.name}
          </p>
          <Link href={localePath(locale, "#about")}>
            {content.ui.backTop} <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </footer>
    </>
  );
}
