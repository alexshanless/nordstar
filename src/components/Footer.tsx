import Link from "next/link";
import { LogoLockup } from "@/components/Logo";

/* Site footer: primary lockup, route links, one line of company facts.
   Rendered from the root layout, so it is identical on every route. */

export default function Footer() {
  return (
    <footer className="ns-footer">
      <div className="ns-container ns-footer-inner">
        <LogoLockup />
        <nav className="ns-nav ns-footer-nav" aria-label="Footer">
          <Link href="/about">About</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <span className="text-muted ns-footer-meta">
          Minneapolis, MN · nordstarfreight.com
        </span>
      </div>
    </footer>
  );
}
