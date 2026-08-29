import type { Metadata } from "next";
import Link from "next/link";
import Blueprint from "@/components/Blueprint";
import { social } from "@/lib/metadata";
import { MC_NUMBER, USDOT_NUMBER } from "@/lib/site";

const description =
  `NordStar Freight is an asset-based freight carrier in Minneapolis, MN. Owner operators on Upper Midwest lanes, USDOT ${USDOT_NUMBER}, ${MC_NUMBER}, and a dispatcher on your account.`;

export const metadata: Metadata = {
  title: "Asset-Based Freight Carrier in Minneapolis, MN",
  description,
  ...social({
    title: "Asset-Based Freight Carrier in Minneapolis, MN · NordStar Freight",
    description,
    url: "/about",
  }),
};

const coverage = [
  ["Home base", "Minneapolis, MN"],
  ["Core region", "Minnesota, Wisconsin, Iowa, the Dakotas, Illinois"],
  ["Extended lanes", "Mountain West and Southeast on scheduled runs"],
  ["Equipment", "3 trucks, dry van and reefer"],
];

const compliance = [
  ["USDOT number", USDOT_NUMBER],
  ["MC number", MC_NUMBER],
  ["Safety program", "Pre-trip and post-trip inspections, electronic logging on every truck"],
];

export default function AboutPage() {
  return (
    <div className="ns-container">
      <section className="ns-hero">
        <p className="ns-eyebrow">About</p>
        <h1 className="ns-h1">A carrier, not a middleman</h1>
        <p className="text-muted ns-lede">
          Asset-based freight out of Minneapolis with owner operators on the
          lane. One dispatcher owns your account, and you reach us by email when
          you need a rate or a status check.
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
          Filed authority below. An insurance certificate is available on
          request when you book a load.
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
            Owner operator openings
          </Link>
        </div>
      </section>
    </div>
  );
}
