import type { Metadata } from "next";
import Blueprint from "@/components/Blueprint";
import QuoteForm from "@/components/QuoteForm";
import { QUOTE_EMAIL } from "@/lib/contact";
import { social } from "@/lib/metadata";

const description =
  "Request a freight quote from NordStar Freight, or reach dispatch by phone. Origin, destination, and what you are shipping is enough to start.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  ...social({
    title: "Contact NordStar Freight",
    description,
    url: "/contact",
  }),
};

/* Placeholder contact details until Alex confirms the real lines and inbox
   (PLAN.md open questions 1 and 2). */
const details = [
  ["Dispatch", "PLACEHOLDER phone number, 7am to 6pm Central"],
  ["After hours", "PLACEHOLDER phone number, active loads only"],
  ["Email", `${QUOTE_EMAIL}, PLACEHOLDER inbox`],
  ["Office", "Minneapolis, MN"],
];

export default function ContactPage() {
  return (
    <div className="ns-container">
      <section className="ns-hero">
        <p className="ns-eyebrow">Contact</p>
        <h1 className="ns-h1">Request a quote</h1>
        <p className="text-muted ns-lede">
          Give us the origin, the destination, and what is on the trailer. A
          dispatcher comes back with a rate and an available pickup window.
        </p>
      </section>

      <section className="ns-section ns-stack">
        <QuoteForm />
        <p className="ns-form-note">
          The form fills out an email for you and opens it in your own mail app,
          so nothing sends until you send it. Use the dispatch line for anything
          time-critical.
        </p>
      </section>

      <section className="ns-section">
        <h2>Reach us directly</h2>
        <Blueprint className="card">
          <dl className="ns-spec">
            {details.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </Blueprint>
      </section>
    </div>
  );
}
