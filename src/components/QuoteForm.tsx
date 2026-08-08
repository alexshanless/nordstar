"use client";

import { useState } from "react";
import Blueprint from "@/components/Blueprint";
import { Field, FormNotice } from "@/components/FormField";
import { QUOTE_EMAIL, bodyLines, mailtoUrl } from "@/lib/contact";
import { fieldErrors, formValues, quoteSchema, type QuoteInput } from "@/lib/forms";

/* Quote request form. There is no backend: a valid submit composes a prefilled
   message and hands it to the visitor's mail client. Validation runs in the
   browser against the shared zod schema, so the form needs JavaScript; the
   plain mailto link below it is the path when JavaScript is off. */

function quoteHref(data: QuoteInput): string {
  return mailtoUrl({
    to: QUOTE_EMAIL,
    subject: `Quote request: ${data.origin} to ${data.destination}`,
    lines: bodyLines([
      ["Name", data.name],
      ["Company", data.company],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Origin", data.origin],
      ["Destination", data.destination],
      ["Freight", data.freight],
    ]),
  });
}

export default function QuoteForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = quoteSchema.safeParse(formValues(new FormData(event.currentTarget)));

    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }

    const href = quoteHref(parsed.data);
    setErrors({});
    setSent(href);
    window.location.href = href;
  }

  if (sent) {
    return (
      <FormNotice title="Over to your mail app">
        Your email app should have opened with the request filled in. If it did
        not, email us at <a href={sent}>{QUOTE_EMAIL}</a>.
      </FormNotice>
    );
  }

  return (
    <form className="ns-form" onSubmit={handleSubmit} noValidate>
      <div className="ns-form-row">
        <Field name="name" label="Name" required autoComplete="name" error={errors.name} />
        <Field
          name="company"
          label="Company (optional)"
          autoComplete="organization"
          error={errors.company}
        />
      </div>

      <div className="ns-form-row">
        <Field
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          error={errors.email}
        />
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
        <Field
          name="origin"
          label="Origin"
          required
          placeholder="City, state"
          error={errors.origin}
        />
        <Field
          name="destination"
          label="Destination"
          required
          placeholder="City, state"
          error={errors.destination}
        />
      </div>

      <Field
        name="freight"
        label="Freight description"
        error={errors.freight}
        hint="Commodity, weight, pallet or piece count, and the dates that matter."
      >
        <textarea
          className="input"
          id="freight"
          name="freight"
          rows={5}
          required
          aria-invalid={errors.freight ? true : undefined}
          aria-describedby={errors.freight ? "freight-error freight-hint" : "freight-hint"}
        />
      </Field>

      {Object.keys(errors).length > 0 ? (
        <p className="field-error" role="alert">
          Check the highlighted fields and send it again.
        </p>
      ) : null}

      <div className="ns-actions">
        <Blueprint as="button" type="submit" className="btn btn-primary">
          Request a quote
        </Blueprint>
      </div>

      <p className="ns-form-note">
        Prefer email? Write to <a href={`mailto:${QUOTE_EMAIL}`}>{QUOTE_EMAIL}</a>.
      </p>
    </form>
  );
}
