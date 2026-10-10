import { Download } from "lucide-react";
import Link from "next/link";
import { profile } from "@/data/portfolio";
import styles from "./Navigation.module.scss";

const links = [
  { href: "/#impact", label: "Impact" },
  { href: "/#experience", label: "Experience" },
  { href: "/#expertise", label: "Expertise" },
  { href: "/#contact", label: "Contact" },
];

export function Navigation() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link
          href="/#about"
          className={styles.wordmark}
          aria-label={`ak. ${profile.name}, home`}
        >
          ak<span aria-hidden="true">.</span>
        </Link>
        <nav aria-label="Main navigation" className={styles.navigation}>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          className={styles.resume}
          href={profile.cv}
          download={profile.cvFileName}
          aria-label="Download CV (PDF)"
        >
          <Download size={16} aria-hidden="true" /> <span>Download CV</span>
        </a>
      </div>
    </header>
  );
}
