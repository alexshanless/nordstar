import type { ReactNode } from "react";
import Blueprint from "@/components/Blueprint";

/* Shared form parts for the quote and driver application forms: a labelled
   field that renders the validation error for that field, and the framed
   result notice. No state of their own — the client forms pass props. */

type FieldProps = {
  name: string;
  label: string;
  error?: string;
  hint?: string;
  children?: ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "id">;

export function Field({ name, label, error, hint, children, ...input }: FieldProps) {
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      {children ?? (
        <input
          {...input}
          className="input"
          id={name}
          name={name}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
        />
      )}
      {hint ? (
        <p className="ns-form-note" id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="field-error" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function FormNotice({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Blueprint className="ns-notice" role="status" aria-live="polite">
      <span className="ns-notice-title">{title}</span>
      <p className="card-body">{children}</p>
    </Blueprint>
  );
}
