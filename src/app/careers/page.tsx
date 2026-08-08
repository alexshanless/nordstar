import type { Metadata } from "next";
import Blueprint from "@/components/Blueprint";
import DriverApplicationForm from "@/components/DriverApplicationForm";
import { RESUME_EMAIL, jobs } from "@/content/jobs";
import { social } from "@/lib/metadata";

const description =
  "CDL Class A driver jobs in Minneapolis, MN with NordStar Freight. Regional and over the road lanes, pay and home time in plain numbers, plus dispatch and operations roles.";

export const metadata: Metadata = {
  title: "CDL Driver Jobs in Minneapolis, MN",
  description,
  ...social({
    title: "CDL Driver Jobs in Minneapolis, MN · NordStar Freight",
    description,
    url: "/careers",
  }),
};

/* Placeholder driver facts. Every number here is a stand-in until Alex
   confirms pay, home time, and the safety record (PLAN.md open question 5). */
const driverTerms = [
  ["Pay", "PLACEHOLDER cents per mile, paid weekly, detention and layover paid"],
  ["Home time", "PLACEHOLDER, regional drivers home most weekends"],
  ["Lanes", "Upper Midwest core, scheduled runs to the Mountain West and Southeast"],
  ["Equipment", "PLACEHOLDER average tractor age, automatics, APUs, inverters"],
  ["Safety record", "PLACEHOLDER CSA scores and preventable accident rate"],
  ["Benefits", "PLACEHOLDER health, dental, and retirement details"],
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
          Steady lanes, trucks that are maintained on schedule, and a dispatcher
          who answers the phone. Pay and home time are listed below in plain
          numbers rather than a range with an asterisk.
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
      </section>

      <section className="ns-section">
        <h2>Driving jobs</h2>
        <JobList items={driverJobs} />
      </section>

      <section className="ns-section ns-stack">
        <div>
          <h2>Apply to drive</h2>
          <p className="text-muted ns-lede">
            Four answers is enough to start. A recruiter calls you, and the full
            application happens on the phone or in the office.
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
