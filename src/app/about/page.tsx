import type { Metadata } from "next";
import Link from "next/link";
import Blueprint from "@/components/Blueprint";
import { social } from "@/lib/metadata";

const description =
  "NordStar Freight is an asset based freight carrier in Minneapolis, MN. Our own trucks and drivers, Upper Midwest lanes, and our safety and compliance record.";

export const metadata: Metadata = {
  title: "About Our Trucking Company",
  description,
  ...social({
    title: "About Our Trucking Company · NordStar Freight",
    description,
    url: "/about",
  }),
};

/* Placeholder copy. Coverage claims and the compliance numbers below are
   stand-ins until Alex confirms them (PLAN.md open question 1). */

const coverage = [
  ["Home base", "Minneapolis, MN"],
  ["Core region", "Minnesota, Wisconsin, Iowa, the Dakotas, Illinois"],
  ["Extended lanes", "Mountain West and Southeast on scheduled runs"],
  ["Equipment", "Dry van and reefer, tractors on a placeholder replacement cycle"],
];

const compliance = [
  ["USDOT number", "PLACEHOLDER, pending confirmation"],
  ["MC number", "PLACEHOLDER, pending confirmation"],
  ["Insurance", "PLACEHOLDER limits, certificate available on request"],
  ["Safety program", "Pre-trip and post-trip inspections, electronic logging on every truck"],
];

export default function AboutPage() {
  return (
    <div className="ns-container">
      <section className="ns-hero">
        <p className="ns-eyebrow">About</p>
        <h1 className="ns-h1">A carrier, not a middleman</h1>
        <p className="text-muted ns-lede">
          NordStar Freight owns the trucks and employs the drivers that move your
          freight. One dispatcher owns your lane, and the person who answers the
          phone can tell you where the load is.
        </p>
      </section>

      <section className="ns-section ns-section-narrow">
        <h2>How we work</h2>
        <p>
          Loads are assigned to a named driver before the pickup window opens, and
          the same dispatcher stays on the account. Appointments, detention, and
          reweighs get reported the day they happen rather than at invoicing.
        </p>
        <p>
          Rates are quoted per lane with accessorials listed line by line. If a
          load is not a fit for our equipment or our hours, we say so instead of
          brokering it out quietly.
        </p>
      </section>

      <section className="ns-section">
        <h2>Coverage</h2>
        <Blueprint className="card">
          <dl className="ns-spec">
            {coverage.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </Blueprint>
      </section>

      <section className="ns-section">
        <h2>Safety and compliance</h2>
        <p className="text-muted ns-lede">
          The authority and insurance lines below are placeholders. They are
          published here so the layout is real, and they get replaced with the
          filed numbers before launch.
        </p>
        <Blueprint className="card">
          <dl className="ns-spec">
            {compliance.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </Blueprint>
        <div className="ns-actions">
          <Blueprint as={Link} href="/contact" className="btn btn-primary">
            Request a quote
          </Blueprint>
          <Link href="/careers" className="btn btn-ghost">
            Drive for us
          </Link>
        </div>
      </section>
    </div>
  );
}
