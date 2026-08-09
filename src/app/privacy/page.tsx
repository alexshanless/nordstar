import type { Metadata } from "next";
import Blueprint from "@/components/Blueprint";
import { QUOTE_EMAIL } from "@/lib/contact";
import { social } from "@/lib/metadata";

const description =
  "Privacy policy for the NordStar Freight website: no accounts, no cookies, no analytics, and no form data stored. The forms open your own mail app, and nothing sends until you send it.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  ...social({
    title: "Privacy Policy · NordStar Freight",
    description,
    url: "/privacy",
  }),
};

/* PLACEHOLDER document. Written to match what the code actually does, not
   reviewed legal text. Alex has a lawyer review it before launch (PLAN.md open
   questions). Every claim below is checkable in the repo: mailto delivery in
   src/lib/contact.ts and the two form components, the single localStorage key
   in src/components/ThemeToggle.tsx and the head script in src/app/layout.tsx,
   and the absence of any analytics or third-party script in package.json. */

const LAST_UPDATED = "2026-08-08";

const summary = [
  ["Accounts", "None, there is nothing to sign up for"],
  ["Cookies", "None set by this site"],
  ["Analytics and tracking", "None, no analytics, no tracking pixels, no ad tags"],
  ["Form submissions", "Not received or stored by the site, see below"],
  ["Stored on your device", 'One theme preference, "ns-theme"'],
  ["Third-party scripts", "None loaded"],
];

export default function PrivacyPage() {
  return (
    <div className="ns-container">
      <section className="ns-hero">
        <p className="ns-eyebrow">Legal</p>
        <h1 className="ns-h1">Privacy policy</h1>
        <p className="text-muted ns-lede">
          This site is a set of static pages. It has no accounts, no database,
          and no analytics. The short version is that it collects nothing about
          you, and the forms hand their contents to your own mail app.
        </p>
        <p className="ns-note">Last updated: {LAST_UPDATED}</p>
      </section>

      <section className="ns-section ns-stack">
        <Blueprint className="card">
          <dl className="ns-spec">
            {summary.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </Blueprint>
        <p className="ns-note">
          PLACEHOLDER: this document is a template pending legal review. It
          describes the site accurately, but it is not attorney-drafted text and
          should not be relied on as final until counsel has reviewed it.
        </p>
      </section>

      <section className="ns-section ns-section-narrow ns-stack">
        <div>
          <h2>What this site does not collect</h2>
          <p>
            There are no user accounts and no login. The site sets no cookies.
            It runs no analytics product, no tracking pixel, and no advertising
            tag, and it loads no third-party scripts. Nothing you type into a
            form on this site is transmitted to us by the site, and none of it
            is stored here, because there is no server-side application or
            database behind these pages to store it in.
          </p>
        </div>

        <div>
          <h2>What happens when you use a form</h2>
          <p>
            The quote form and the driver application both work the same way.
            Your answers are checked in your browser, and when they are
            complete the page builds an email and opens it in whichever mail app
            your device uses. Nothing is sent at that point. You see the message
            and you send it yourself, from your own email account.
          </p>
          <p>
            The email you send contains what you typed into the form, and it
            arrives in a NordStar Freight mailbox. From there it is ordinary
            business email: we read it, reply to it, and keep it for as long as
            we need it to quote your freight or consider your application. Each
            form also shows a plain email address you can write to directly if
            you would rather skip the form.
          </p>
          <p>
            The email addresses the forms use are placeholders right now while
            the real inboxes are confirmed. Do not send anything sensitive
            through them until this note is gone.
          </p>
        </div>

        <div>
          <h2>Theme preference stored on your device</h2>
          <p>
            The light and dark switch in the header saves one value in your
            browser&apos;s local storage under the key &quot;ns-theme&quot;,
            either &quot;light&quot; or &quot;dark&quot;. It exists so the site
            does not flash the wrong ground on your next visit. It stays on your device, it is never sent
            anywhere, and it identifies nothing about you. If you switch back to
            the theme your operating system already prefers, the value is
            deleted. Clearing your site data for this site removes it.
          </p>
        </div>

        <div>
          <h2>Hosting and server logs</h2>
          <p>
            The site is served by a hosting provider. Like any web host, it may
            record standard request information such as the requested address,
            timestamp, response status, and network-level details including your
            internet protocol address, for delivery, security, and abuse
            prevention. Those are the hosting provider&apos;s infrastructure
            logs under its own retention and privacy practices. We do not build
            profiles from them and we do not join them to anything you sent us.
          </p>
        </div>

        <div>
          <h2>Children</h2>
          <p>
            This is a commercial freight and hiring site and it is not directed
            at children. We do not knowingly collect information from anyone
            under 13. If you believe a child has sent us information by email,
            write to us and we will delete it.
          </p>
        </div>

        <div>
          <h2>Your choices</h2>
          <p>
            Because the site collects nothing, there is nothing here to request,
            correct, or delete. For an email you sent us, ask and we will tell
            you what we still have and delete it where we are not required to
            keep it.
          </p>
        </div>

        <div>
          <h2>Changes to this policy</h2>
          <p>
            If the site starts doing something new, for example adding analytics
            or a real form backend, this page changes first and the date at the
            top of the page changes with it.
          </p>
        </div>

        <div>
          <h2>Contact</h2>
          <p>
            Privacy questions go to{" "}
            <a href={`mailto:${QUOTE_EMAIL}`}>{QUOTE_EMAIL}</a>, or to NordStar
            Freight, Minneapolis, MN.
          </p>
        </div>
      </section>
    </div>
  );
}
