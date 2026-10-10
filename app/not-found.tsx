import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "@/components/layouts/Main/Main.module.scss";

export default function NotFound() {
  return (
    <div className={`container ${styles.notFound}`}>
      <p>404 / Page not found</p>
      <h1>This page isn&apos;t here.</h1>
      <p>
        The link may have changed. My experience and contact details are on the homepage.
      </p>
      <Link href="/" className={styles.returnLink}>
        <ArrowLeft size={18} aria-hidden="true" /> Back to the homepage
      </Link>
    </div>
  );
}
