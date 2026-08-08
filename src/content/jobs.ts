/* Open roles. Adding a role is one entry in this array; the careers page
   renders from the data alone. Placeholder entries until real openings are
   confirmed (PLAN.md open question 5). */

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
    slug: "regional-class-a-driver",
    title: "Regional Class A driver",
    type: "driver",
    location: "Minneapolis, MN",
    summary:
      "Dry van and reefer freight on Upper Midwest lanes. Out Monday, home most weekends, no touch freight on the majority of loads.",
    requirements: [
      "Class A CDL, 2 years verifiable tractor-trailer experience",
      "Clean MVR, no DUI in the last 5 years",
      "Comfortable with winter driving on secondary roads",
    ],
  },
  {
    slug: "over-the-road-class-a-driver",
    title: "Over the road Class A driver",
    type: "driver",
    location: "Runs from Minneapolis, MN",
    summary:
      "Longer runs to the Mountain West and the Southeast, 10 to 14 days out with scheduled reset at home.",
    requirements: [
      "Class A CDL, 1 year verifiable over the road experience",
      "Hazmat endorsement preferred, not required",
      "Electronic logging device and app-based check calls",
    ],
  },
  {
    slug: "dispatcher",
    title: "Dispatcher",
    type: "office",
    location: "Minneapolis, MN, on site",
    summary:
      "Own a board of drivers and lanes: assign loads, keep appointments, and handle the phone calls that keep freight moving.",
    requirements: [
      "2 years dispatch, brokerage, or freight operations experience",
      "Working knowledge of hours of service rules",
      "Plain, direct communication with drivers and customers",
    ],
  },
];

/* PLACEHOLDER recruiting inbox, pending Alex's confirmation (PLAN.md open
   questions 2 and 5). Single source for the careers address: the job cards,
   the office-roles note, and the driver application's mailto all read it. */
export const RESUME_EMAIL = "careers@nordstarfreightmn.com";
