"use client";

import { useState } from "react";
import Blueprint from "@/components/Blueprint";
import { Field, FormNotice } from "@/components/FormField";
import { RESUME_EMAIL } from "@/content/jobs";
import { bodyLines, mailtoUrl } from "@/lib/contact";
import {
  driverApplicationSchema,
  fieldErrors,
  formValues,
  type DriverApplicationInput,
} from "@/lib/forms";

/* Driver application. Short on purpose: recruiters call, forms do not hire.
   Same plumbing as the quote form (shared zod schema, mailto delivery). */

function applicationHref(data: DriverApplicationInput): string {
  return mailtoUrl({
    to: RESUME_EMAIL,
    subject: `Driver application: ${data.name}`,
    lines: bodyLines([
      ["Name", data.name],
      ["Phone", data.phone],
      ["CDL class", data.cdlClass],
      ["Years of experience", data.yearsExperience],
      ["Endorsements", data.endorsements],
    ]),
  });
}

export default function DriverApplicationForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = driverApplicationSchema.safeParse(
      formValues(new FormData(event.currentTarget)),
    );

    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }

    const href = applicationHref(parsed.data);
    setErrors({});
    setSent(href);
    window.location.href = href;
  }

  if (sent) {
    return (
      <FormNotice title="Over to your mail app">
        Your email app should have opened with the application filled in. If it
        did not, email us at <a href={sent}>{RESUME_EMAIL}</a>.
      </FormNotice>
    );
  }

  return (
    <form className="ns-form" onSubmit={handleSubmit} noValidate>
      <div className="ns-form-row">
        <Field name="name" label="Name" required autoComplete="name" error={errors.name} />
        <Field
          name="phone"
          label="Phone"
          type="tel"
          required
          autoComplete="tel"
          error={errors.phone}
        />
      </div>

      <div className="ns-form-row">
        <Field name="cdlClass" label="CDL class" error={errors.cdlClass}>
          <select
            className="input"
            id="cdlClass"
            name="cdlClass"
            required
            defaultValue=""
            aria-invalid={errors.cdlClass ? true : undefined}
            aria-describedby={errors.cdlClass ? "cdlClass-error" : undefined}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="A">Class A</option>
            <option value="B">Class B</option>
            <option value="C">Class C</option>
          </select>
        </Field>
        <Field
          name="yearsExperience"
          label="Years of experience"
          type="number"
          min={0}
          max={60}
          step={1}
          required
          error={errors.yearsExperience}
        />
      </div>

      <Field
        name="endorsements"
        label="Endorsements (optional)"
        placeholder="H, N, T, X"
        hint="Hazmat, tanker, doubles or triples, and anything else current."
        error={errors.endorsements}
      />

      {Object.keys(errors).length > 0 ? (
        <p className="field-error" role="alert">
          Check the highlighted fields and send it again.
        </p>
      ) : null}

      <div className="ns-actions">
        <Blueprint as="button" type="submit" className="btn btn-primary">
          Apply to drive
        </Blueprint>
      </div>

      <p className="ns-form-note">
        Prefer email? Write to <a href={`mailto:${RESUME_EMAIL}`}>{RESUME_EMAIL}</a>.
      </p>
    </form>
  );
}
