import Link from "next/link";
import { Boxes, Timer, Truck } from "lucide-react";
import Blueprint from "@/components/Blueprint";
import CoverageFigure from "@/components/art/CoverageFigure";
import HeroPlot from "@/components/art/HeroPlot";
import RecruitPlate from "@/components/art/RecruitPlate";

/* Home. Six bands, each linking deeper into the site. Backgrounds are drawn,
   not photographed (PLAN.md open question 4 is still open), so the art is
   inline SVG in the blueprint grammar, from src/components/art/.

   Hero headline and lede are the original placeholders and stay verbatim
   until Alex supplies real copy (PLAN.md phase 1, last item). Every number
   in the spec plate is a placeholder and is labelled as one on the page. */

const services = [
  {
    title: "Full truckload",
    icon: Truck,
    body: "Dedicated capacity, one pickup, one drop. No hand-offs in between.",
  },
  {
    title: "Less than truckload",
    icon: Boxes,
    body: "Consolidated lanes that keep smaller shipments moving on schedule.",
  },
  {
    title: "Expedited",
    icon: Timer,
    body: "Time-critical freight with a driver assigned the moment you book.",
  },
];

/* PLACEHOLDER figures, pending the real operating numbers (PLAN.md open
   question 1). The layout is real so it can be reviewed, the values are not. */
const stats = [
  ["98.4%", "On-time delivery"],
  ["42", "Lanes running weekly"],
  ["36", "Tractors in service"],
  ["11", "Years hauling freight"],
  ["2.1 yr", "Average tractor age"],
  ["0.31", "Accidents per million miles"],
];

const driverPoints = [
  "Home most weekends on the regional board",
  "Late model tractors, automatics with APUs and inverters",
  "PLACEHOLDER cents per mile, paid weekly, detention paid",
];

export default function Home() {
  return (
    <>
      {/* 1. Hero, over the dispatch plot */}
      <section className="ns-band">
        <div className="ns-art ns-art-fade">
          <HeroPlot />
        </div>
        <div className="ns-container ns-band-inner">
          <div className="ns-hero">
            <h1 className="ns-h1">Freight that holds its heading</h1>
            <p className="text-muted ns-lede">
              NordStar Freight moves loads across the Upper Midwest and beyond.
              Replace this copy with the real pitch.
            </p>
            <div className="ns-actions">
              <Blueprint as={Link} href="/contact" className="btn btn-primary">
                Request a quote
              </Blueprint>
              <a href="#services" className="btn btn-ghost">
                Our services
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="ns-container">
        {/* 2. Services */}
        <section id="services" className="ns-section">
          <div className="ns-section-head">
            <div>
              <p className="ns-eyebrow">Services</p>
              <h2>Three ways we move freight</h2>
            </div>
            <Link href="/contact" className="ns-section-link">
              Get a lane quoted
            </Link>
          </div>
          <div className="ns-grid">
            {services.map(({ title, icon: Icon, body }) => (
              <Blueprint key={title} className="card">
                <Icon className="ns-card-icon" size={22} strokeWidth={1.5} aria-hidden="true" />
                <span className="card-title">{title}</span>
                <p className="card-body">{body}</p>
              </Blueprint>
            ))}
          </div>
        </section>

        {/* 3. Spec plate */}
        <section className="ns-section">
          <div className="ns-section-head">
            <div>
              <p className="ns-eyebrow">By the numbers</p>
              <h2>Operating record</h2>
            </div>
            <Link href="/about" className="ns-section-link">
              Safety and compliance
            </Link>
          </div>
          <Blueprint className="ns-plate">
            <div className="ns-plate-grid">
              {stats.map(([figure, label]) => (
                <div key={label} className="ns-plate-cell">
                  <span className="ns-plate-figure">{figure}</span>
                  <span className="ns-plate-label">{label}</span>
                </div>
              ))}
            </div>
          </Blueprint>
          <p className="ns-note">
            PLACEHOLDER, pending real numbers. These figures are stand-ins so the
            plate can be reviewed, and they get replaced with audited operating
            data before launch.
          </p>
        </section>

        {/* 4. Coverage teaser */}
        <section className="ns-section">
          <div className="ns-section-head">
            <div>
              <p className="ns-eyebrow">Coverage</p>
              <h2>Built around the Upper Midwest</h2>
            </div>
            <Link href="/about" className="ns-section-link">
              About NordStar
            </Link>
          </div>
          <div className="ns-split">
            <div>
              <p>
                Minneapolis is the hub. Most freight stays inside Minnesota,
                Wisconsin, Iowa, the Dakotas and Illinois, close enough that a
                driver can be on a dock the same day it is booked.
              </p>
              <p>
                Longer runs to the Mountain West and the Southeast go out on a
                schedule rather than on whatever the load board happens to have,
                so the return leg is planned before the truck leaves.
              </p>
            </div>
            <Blueprint as="figure" className="card">
              <CoverageFigure />
              <figcaption>
                Figure 1. Coverage plot, hub at Minneapolis with core and extended
                lanes. Abstract line art, not to scale, and the region shown is
                placeholder geometry pending confirmed coverage.
              </figcaption>
            </Blueprint>
          </div>
        </section>
      </div>

      {/* 5. Driver recruiting band */}
      <section className="ns-band ns-band-plate">
        <div className="ns-art">
          <RecruitPlate />
        </div>
        <div className="ns-container ns-band-inner">
          <div className="ns-recruit">
            <div>
              <p className="ns-eyebrow">Drivers</p>
              <h2>Drive for NordStar</h2>
              <p className="ns-lede">
                Steady lanes out of Minneapolis, trucks that get replaced on a
                schedule, and a dispatcher who answers the phone.
              </p>
              <div className="ns-actions">
                <Blueprint as={Link} href="/careers" className="btn btn-primary">
                  See driving jobs
                </Blueprint>
              </div>
            </div>
            <ul className="ns-ticks">
              {driverPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Closing quote CTA */}
      <div className="ns-container">
        <section className="ns-cta">
          <h2>Have a load to move?</h2>
          <p className="text-muted ns-lede">
            Send the lane, the dates and what is on the trailer. You get a rate
            back with the accessorials listed line by line.
          </p>
          <div className="ns-actions">
            <Blueprint as={Link} href="/contact" className="btn btn-primary">
              Request a quote
            </Blueprint>
            <a href="#services" className="btn btn-ghost">
              Back to services
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
