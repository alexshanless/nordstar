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
  metadataBase: new URL("https://nordstarfreight.com"),
  title: {
    default: "NordStar Freight",
    template: "%s · NordStar Freight",
  },
  description,
  ...social({ title: "NordStar Freight", description, url: "/" }),
};

/* Browser UI colour, paired to the same preference the stylesheet follows
   (light = the Industry paper ground, dark = the ink band), so the address
   bar matches the page on both. themeColor belongs to the `viewport` export,
   not `metadata`. */
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
  url: "https://nordstarfreight.com",
  logo: "https://nordstarfreight.com/brand/signature-mark-outline-112.png",
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
    >
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
