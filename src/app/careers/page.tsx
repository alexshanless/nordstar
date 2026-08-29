import type { Metadata } from "next";
import Blueprint from "@/components/Blueprint";
import DriverApplicationForm from "@/components/DriverApplicationForm";
import { RESUME_EMAIL, jobs } from "@/content/jobs";
import { social } from "@/lib/metadata";

const description =
  "Owner operator opportunities with NordStar Freight in Minneapolis, MN. Pay and lane details upon request. Dispatch and operations roles also listed.";

export const metadata: Metadata = {
  title: "Owner Operator Jobs in Minneapolis, MN",
  description,
  ...social({
    title: "Owner Operator Jobs in Minneapolis, MN · NordStar Freight",
    description,
    url: "/careers",
  }),
};

const driverTerms = [
  ["Who we hire", "Owner operators only"],
  ["Pay and what the job looks like", "Upon request"],
];

const driverJobs = jobs.filter((job) => job.type === "driver");
const officeJobs = jobs.filter((job) => job.type === "office");

function JobList({ items }: { items: typeof jobs }) {
  if (items.length === 0) {
    return (
      <Blueprint className="card">
        <span className="card-title">No open roles right now</span>
        <p className="card-body">
          We still read every resume that comes in, and hiring moves fast when a
          lane opens up. Send yours to{" "}
          <a href={`mailto:${RESUME_EMAIL}`}>{RESUME_EMAIL}</a>.
        </p>
      </Blueprint>
    );
  }

  return (
    <div className="ns-grid">
      {items.map((job) => (
        <Blueprint key={job.slug} className="card">
          <span className="card-kicker">{job.location}</span>
          <span className="card-title">{job.title}</span>
          <p className="card-body">{job.summary}</p>
          <ul className="card-body">
            {job.requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </Blueprint>
      ))}
    </div>
  );
}

export default function CareersPage() {
  return (
    <div className="ns-container">
      <section className="ns-hero">
        <p className="ns-eyebrow">Careers</p>
        <h1 className="ns-h1">Drive for NordStar</h1>
        <p className="text-muted ns-lede">
          We lease on owner operators only. Steady Upper Midwest lanes out of
          Minneapolis, a dispatcher who answers, and terms we walk through with
          you directly.
        </p>
      </section>

      <section className="ns-section">
        <h2>What the job pays and looks like</h2>
        <Blueprint className="card">
          <dl className="ns-spec">
            {driverTerms.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </Blueprint>
        <p className="ns-form-note">
          Ask when you apply, or write{" "}
          <a href={`mailto:${RESUME_EMAIL}`}>{RESUME_EMAIL}</a>, and we will
          send the current pay structure and lane details.
        </p>
      </section>

      <section className="ns-section">
        <h2>Owner operator openings</h2>
        <JobList items={driverJobs} />
      </section>

      <section className="ns-section ns-stack">
        <div>
          <h2>Apply as an owner operator</h2>
          <p className="text-muted ns-lede">
            Four answers is enough to start. We follow up by email with pay and
            lane details, then talk through the lease-on.
          </p>
        </div>
        <DriverApplicationForm />
      </section>

      <section className="ns-section">
        <h2>Office and operations</h2>
        <JobList items={officeJobs} />
        <p className="ns-form-note">
          For office roles, send a resume to{" "}
          <a href={`mailto:${RESUME_EMAIL}`}>{RESUME_EMAIL}</a>.
        </p>
      </section>
    </div>
  );
}
