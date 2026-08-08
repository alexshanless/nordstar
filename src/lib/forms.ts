import { z } from "zod";

/* Form schemas. One place defines what a valid submission is; both forms
   validate against these in the browser before composing their mailto. */

const required = (label: string) =>
  z.string().trim().min(1, `${label} is required.`);

export const quoteSchema = z.object({
  name: required("Name").max(80),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().min(1, "Email is required.").pipe(
    z.email("Enter an email address we can reply to."),
  ),
  phone: required("Phone").max(40),
  origin: required("Origin").max(120),
  destination: required("Destination").max(120),
  freight: required("Freight description").max(2000),
});

export const driverApplicationSchema = z.object({
  name: required("Name").max(80),
  phone: required("Phone").max(40),
  cdlClass: z.enum(["A", "B", "C"], "Select your CDL class."),
  endorsements: z.string().trim().max(200).optional().or(z.literal("")),
  yearsExperience: z
    .string()
    .trim()
    .min(1, "Enter years of experience as a whole number.")
    .transform((value) => Number(value))
    .pipe(
      z
        .number({ error: "Enter years of experience as a whole number." })
        .int("Enter years of experience as a whole number.")
        .min(0, "Years of experience cannot be negative.")
        .max(60, "Enter a number of years under 60."),
    ),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
export type DriverApplicationInput = z.infer<typeof driverApplicationSchema>;

/* First message per field, keyed by field name. Built from `issues` rather
   than a helper so it does not depend on a zod flatten API. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}

export function formValues(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") values[key] = value;
  }
  return values;
}
