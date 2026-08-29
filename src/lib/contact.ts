/* ── DELIVERY: MAILTO, NO BACKEND ────────────────────────────────────────────
   Forms deliver by opening the visitor's own mail client with the message
   already written (Alex's decision, 2026-08-07). There is no server action, no
   provider, and no inbox to keep secrets for.

   Public contact is email-only. Careers uses `RESUME_EMAIL` in
   `src/content/jobs.ts` (imported there rather than repeated here).
   ───────────────────────────────────────────────────────────────────────── */

/** Freight questions and quote requests. */
export const DISPATCH_EMAIL = "dispatch@nordstarfreightmn.com";

/** Support, site contact, privacy, and terms. */
export const CONTACT_EMAIL = "admin@nordstarfreightmn.com";

/** Quote form mailto target (same inbox as dispatch questions). */
export const QUOTE_EMAIL = DISPATCH_EMAIL;

/* A mailto URL the browser hands to the mail client. Values are encoded, so a
   freight description with spaces, ampersands, or line breaks survives. */
export function mailtoUrl({
  to,
  subject,
  lines,
}: {
  to: string;
  subject: string;
  lines: string[];
}): string {
  const query = [
    `subject=${encodeURIComponent(subject)}`,
    `body=${encodeURIComponent(lines.join("\n"))}`,
  ].join("&");

  return `mailto:${to}?${query}`;
}

/* Label/value body lines, in the order the form asks for them. Empty optional
   answers are dropped rather than sent as a blank line. */
export function bodyLines(pairs: [string, string | number | undefined][]): string[] {
  return pairs
    .filter(([, value]) => value !== undefined && String(value).trim() !== "")
    .map(([label, value]) => `${label}: ${value}`);
}
