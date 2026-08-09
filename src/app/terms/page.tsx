import type { Metadata } from "next";
import Blueprint from "@/components/Blueprint";
import { QUOTE_EMAIL } from "@/lib/contact";
import { social } from "@/lib/metadata";

const description =
  "Terms of service for the NordStar Freight website: how the site may be used, that published figures and quotes are not binding offers, and the limits of our liability.";

export const metadata: Metadata = {
  title: "Terms of Service",
  description,
  ...social({
    title: "Terms of Service · NordStar Freight",
    description,
    url: "/terms",
  }),
};

/* PLACEHOLDER document. This is a plain-language template written to match what
   the site actually does, not reviewed legal text. Alex has a lawyer review it
   before launch (PLAN.md open questions). */

const LAST_UPDATED = "2026-08-08";

const status = [
  ["Last updated", LAST_UPDATED],
  ["Applies to", "nordstarfreightmn.com, this website only"],
  ["Governing law", "State of Minnesota"],
  ["Questions", QUOTE_EMAIL],
];

export default function TermsPage() {
  return (
    <div className="ns-container">
      <section className="ns-hero">
        <p className="ns-eyebrow">Legal</p>
        <h1 className="ns-h1">Terms of service</h1>
        <p className="text-muted ns-lede">
          These terms cover your use of the NordStar Freight website. Freight we
          actually haul is governed by the rate confirmation and bill of lading
          for that load, not by this page.
        </p>
        <p className="ns-note">Last updated: {LAST_UPDATED}</p>
      </section>

      <section className="ns-section ns-stack">
        <Blueprint className="card">
          <dl className="ns-spec">
            {status.map(([label, value]) => (
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
          <h2>Using this site</h2>
          <p>
            You may read this site, print it, and use the forms to reach us. Do
            not attempt to break, overload, scrape at abusive volume, or gain
            unauthorized access to the site or the systems that serve it. Do not
            use our name, logo, or copy to represent yourself as NordStar
            Freight.
          </p>
          <p>
            The text, layout, and artwork on this site belong to NordStar
            Freight. You need our written permission to republish them.
          </p>
        </div>

        <div>
          <h2>Information is informational</h2>
          <p>
            Everything published here is general information about our services.
            Several figures on this site are placeholders while the real numbers
            are confirmed, including authority and insurance lines, phone
            numbers, and the email addresses the forms use. Nothing on this site
            is an offer, a rate agreement, or a guarantee of capacity,
            equipment, transit time, or pay.
          </p>
        </div>

        <div>
          <h2>Quotes are not binding until dispatch confirms them</h2>
          <p>
            The quote form composes an email for you to send. Sending it starts
            a conversation. A rate becomes real when a NordStar dispatcher
            confirms it in writing for a specific load, with the origin,
            destination, dates, equipment, and accessorials named. Until then
            any number discussed is an estimate and can change.
          </p>
        </div>

        <div>
          <h2>Job postings and applications</h2>
          <p>
            Roles, pay ranges, and benefits described on the careers page are
            descriptions of open positions, not an offer of employment. Sending
            a driver application does not create an employment relationship or a
            promise of hire. Pay and terms are set in a written offer.
          </p>
        </div>

        <div>
          <h2>No warranties</h2>
          <p>
            The site is provided as it is. We do not warrant that it will be
            available without interruption, free of errors, or current at any
            given moment. To the extent the law allows, we disclaim implied
            warranties of merchantability, fitness for a particular purpose, and
            non-infringement for the site itself.
          </p>
        </div>

        <div>
          <h2>Limitation of liability</h2>
          <p>
            To the extent the law allows, NordStar Freight is not liable for
            indirect, incidental, special, consequential, or punitive damages
            arising from your use of this website, including lost profits or
            lost data. This limit is about the website. Claims about freight we
            transported are handled under the transportation contract and the
            law that governs it.
          </p>
        </div>

        <div>
          <h2>Links to other sites</h2>
          <p>
            Where we link out, we do not control the linked site and are not
            responsible for its content or its handling of your information.
          </p>
        </div>

        <div>
          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of the State of Minnesota,
            without regard to conflict of laws rules. Disputes about this
            website belong in the state or federal courts serving Hennepin
            County, Minnesota.
          </p>
        </div>

        <div>
          <h2>Changes to these terms</h2>
          <p>
            We can update this page. The version in force is the one published
            here, and the date at the top of the page tells you when it last
            changed. Continued use of the site after a change means you accept
            the updated terms.
          </p>
        </div>

        <div>
          <h2>Contact</h2>
          <p>
            Questions about these terms go to{" "}
            <a href={`mailto:${QUOTE_EMAIL}`}>{QUOTE_EMAIL}</a>, or to NordStar
            Freight, Minneapolis, MN.
          </p>
        </div>
      </section>
    </div>
  );
}
