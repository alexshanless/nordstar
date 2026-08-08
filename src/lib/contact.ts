/* ── DELIVERY: MAILTO, NO BACKEND ────────────────────────────────────────────
   Forms deliver by opening the visitor's own mail client with the message
   already written (Alex's decision, 2026-08-07). There is no server action, no
   provider, and no inbox to keep secrets for.

   Addresses are PLACEHOLDERS until Alex confirms the real inboxes (PLAN.md
   open questions 2 and 5). The careers address lives with the careers content
   as `RESUME_EMAIL` in `src/content/jobs.ts`, which is also the address the
   job cards link to; it is imported from there rather than repeated here.
   ───────────────────────────────────────────────────────────────────────── */

/* PLACEHOLDER inbox for quote requests, pending Alex's confirmation. */
export const QUOTE_EMAIL = "quotes@nordstarfreight.com";

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
