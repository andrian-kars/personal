import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Main } from "@/components/layouts/Main/Main";
import styles from "@/components/layouts/Main/Main.module.scss";
import { getContent } from "@/content";
import { isLocale, localeHeader, localePath } from "@/i18n/config";
import { fontVariables } from "@/styles/fonts";
import "@/styles/index.scss";

// Unmatched URLs skip the [lang] layout; the proxy forwards the language in a header.
async function requestLocale() {
  const locale = (await headers()).get(localeHeader);
  return isLocale(locale) ? locale : "en";
}

export async function generateMetadata(): Promise<Metadata> {
  const { profile, ui } = getContent(await requestLocale());
  return { title: `${ui.notFound.title} | ${profile.name}` };
}

export default async function GlobalNotFound() {
  const locale = await requestLocale();
  const content = getContent(locale);
  const text = content.ui.notFound;
  return (
    <html lang={locale} className={fontVariables}>
      <body>
        <Main content={content} locale={locale}>
          <div className={`container ${styles.notFound}`}>
            <p>{text.label}</p>
            <h1>{text.title}</h1>
            <p>{text.text}</p>
            <Link href={localePath(locale)} className={styles.returnLink}>
              <ArrowLeft size={18} aria-hidden="true" /> {text.home}
            </Link>
          </div>
        </Main>
      </body>
    </html>
  );
}
