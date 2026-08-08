import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import "@/styles/industry.css";
import "@/styles/nordstar.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { social } from "@/lib/metadata";

const barlow = Barlow({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-barlow",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-barlow-condensed",
});

const description =
  "NordStar Freight is a Minneapolis based carrier running full truckload, less than truckload, and expedited freight across the Upper Midwest and beyond.";

export const metadata: Metadata = {
  metadataBase: new URL("https://nordstarfreightmn.com"),
  title: {
    default: "NordStar Freight",
    template: "%s · NordStar Freight",
  },
  description,
  ...social({ title: "NordStar Freight", description, url: "/" }),
};

/* Restore a stored theme choice before the browser paints. Runs synchronously
   while the head is parsed, so the forced ground is on <html> before any
   content is painted and there is no flash of the other theme. No override
   stored means no attribute, and nordstar.css follows the OS preference.
   Keep it tiny and dependency free: it is inline on every page, and the
   try/catch covers storage being unavailable (private mode, blocked cookies).
   See node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md.
   The matching switch is src/components/ThemeToggle.tsx. */
const themeScript =
  '(function(){try{var t=localStorage.getItem("ns-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()';

/* Browser UI colour, paired to the OS preference the stylesheet follows by
   default (light = the Industry paper ground, dark = the ink band), so the
   address bar matches the page on both. themeColor belongs to the `viewport`
   export, not `metadata`. Note these media pairs track the OS preference only:
   a visitor who forces the other ground with the header switch keeps the
   address bar tint of their OS preference. Cosmetic, browser chrome only,
   the page itself is correct. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f2f3" },
    { media: "(prefers-color-scheme: dark)", color: "#1d1f20" },
  ],
};

/* Organization schema for search engines. Only facts already published on
   the site; compliance numbers and phone lines join once Alex confirms them. */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NordStar Freight",
  url: "https://nordstarfreightmn.com",
  logo: "https://nordstarfreightmn.com/brand/signature-mark-outline-112.png",
  description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Minneapolis",
    addressRegion: "MN",
    addressCountry: "US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} h-full antialiased`}
      /* the head script sets data-theme on this element before React hydrates */
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <main className="ns-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
