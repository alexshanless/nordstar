/* Open roles. Adding a role is one entry in this array; the careers page
   renders from the data alone. Driver recruiting is owner-operator only.
   Office roles stay listed separately. */

export type Job = {
  slug: string;
  title: string;
  type: "driver" | "office";
  location: string;
  summary: string;
  requirements: string[];
};

export const jobs: Job[] = [
  {
    slug: "owner-operator",
    title: "Owner operator",
    type: "driver",
    location: "Runs from Minneapolis, MN",
    summary:
      "Lease on with your own authority or under ours. Upper Midwest core with scheduled runs farther out. Pay and lane details are shared on request.",
    requirements: [
      "Class A CDL and your own tractor",
      "Valid insurance and current DOT paperwork",
      "Clean MVR, no DUI in the last 5 years",
    ],
  },
  {
    slug: "dispatcher",
    title: "Dispatcher",
    type: "office",
    location: "Minneapolis, MN, on site",
    summary:
      "Own a board of drivers and lanes: assign loads, keep appointments, and handle the calls that keep freight moving.",
    requirements: [
      "2 years dispatch, brokerage, or freight operations experience",
      "Working knowledge of hours of service rules",
      "Plain, direct communication with drivers and customers",
    ],
  },
];

/* Recruiting inbox for driver applications, resumes, and office roles. */
export const RESUME_EMAIL = "careers@nordstarfreightmn.com";
