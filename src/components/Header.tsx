"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

/* Site header. Client component only for the 80px scroll threshold, which
   adds the handoff's hairline shadow. The logo never swaps or shrinks. */

const NAV = [
  { href: "/#services", label: "Services", match: null },
  { href: "/about", label: "About", match: "/about" },
  { href: "/careers", label: "Careers", match: "/careers" },
  { href: "/contact", label: "Contact", match: "/contact" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "ns-header is-scrolled" : "ns-header"}>
      <Logo />
      <nav className="ns-nav" aria-label="Primary">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={item.match && pathname === item.match ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
