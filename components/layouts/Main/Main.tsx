import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/layouts/Navigation/Navigation";
import { profile } from "@/data/portfolio";
import styles from "./Main.module.scss";

export function Main({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className={styles.skip}>
        Skip to content
      </a>
      <Navigation />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <p>
            &copy; {new Date().getUTCFullYear()} {profile.name}
          </p>
          <Link href="/#about">
            Back to top <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </footer>
    </>
  );
}
