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
          {/* Legal pages ride the same row, one step smaller and quieter: they
              belong in the footer but not at the same weight as the routes a
              customer came for. They are deliberately absent from the header. */}
          <Link className="ns-footer-legal" href="/terms">
            Terms
          </Link>
          <Link className="ns-footer-legal" href="/privacy">
            Privacy
          </Link>
        </nav>
        <span className="text-muted ns-footer-meta">
          Minneapolis, MN · nordstarfreightmn.com
        </span>
      </div>
    </footer>
  );
}
