/* Public site facts used by metadata, JSON-LD, sitemap, and chrome.
   Keep these aligned with what the pages actually publish. */

export const SITE_URL = "https://nordstarfreightmn.com";
export const SITE_NAME = "NordStar Freight";

export const SITE_DESCRIPTION =
  "NordStar Freight is an asset-based trucking company in Minneapolis, MN. Full truckload, LTL, and expedited freight on Upper Midwest lanes with owner operators. Request a quote by email.";

export const USDOT_NUMBER = "9187143";
export const MC_NUMBER = "MC-60569221";

export const HOME_BASE = {
  locality: "Minneapolis",
  region: "MN",
  country: "US",
} as const;

export const AREA_SERVED = [
  "Minnesota",
  "Wisconsin",
  "Iowa",
  "North Dakota",
  "South Dakota",
  "Illinois",
] as const;
