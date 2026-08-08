import type { Metadata } from "next";

/* Next merges `metadata` shallowly: a page that declares `openGraph` replaces
   the root layout's object outright rather than merging into it. So the shared
   parts (type, site name, locale, image) live here and every page spreads them.

   The image is the existing outline signature mark in public/brand/. It is a
   square mark, not a purpose-built 1200x630 social card (PLAN.md phase 4). */

export const OG_IMAGE = {
  url: "/brand/signature-mark-outline-112.png",
  width: 112,
  height: 112,
  alt: "NordStar Freight",
};

export function social({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}): Pick<Metadata, "openGraph" | "twitter" | "alternates"> {
  return {
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "NordStar Freight",
      locale: "en_US",
      title,
      description,
      url,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
