import type { Metadata } from "next";
import Blueprint from "@/components/Blueprint";
import QuoteForm from "@/components/QuoteForm";
import { CONTACT_EMAIL, DISPATCH_EMAIL } from "@/lib/contact";
import { social } from "@/lib/metadata";

const description =
  "Request a freight quote from NordStar Freight in Minneapolis, MN by email. Full truckload, LTL, and expedited. Origin, destination, and load details are enough to start.";

export const metadata: Metadata = {
  title: "Request a Freight Quote in Minneapolis, MN",
  description,
  ...social({
    title: "Request a Freight Quote in Minneapolis, MN · NordStar Freight",
    description,
    url: "/contact",
  }),
};

const details = [
  {
    label: "Questions",
    value: DISPATCH_EMAIL,
    href: `mailto:${DISPATCH_EMAIL}`,
  },
  {
    label: "Support",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  { label: "Office", value: "Minneapolis, MN" },
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
          so nothing sends until you send it. For freight questions write{" "}
          <a href={`mailto:${DISPATCH_EMAIL}`}>{DISPATCH_EMAIL}</a>. For support
          or site contact, use{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </section>

      <section className="ns-section">
        <h2>Reach us by email</h2>
        <Blueprint className="card">
          <dl className="ns-spec">
            {details.map(({ label, value, href }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{href ? <a href={href}>{value}</a> : value}</dd>
              </div>
            ))}
          </dl>
        </Blueprint>
      </section>
    </div>
  );
}
