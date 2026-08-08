"use client";

import { Moon, Sun } from "lucide-react";
import { useLayoutEffect, useSyncExternalStore } from "react";

/* Header theme switch. Three states live on <html data-theme>: absent follows
   the OS preference, "light" and "dark" force a ground. nordstar.css reads the
   attribute through color-scheme, so every token flips off one declaration,
   and layout.tsx's head script restores a stored choice before first paint.

   Clicking flips to the other ground. If the flip lands on what the OS already
   prefers, the override is dropped instead of pinned, so the visitor goes back
   to following their system rather than carrying a stale forced value forever.

   The icons are picked in CSS off the effective scheme (see .ns-theme-toggle in
   nordstar.css), so the button paints the right one with no state and no flash.
   The only thing React tracks here is the accessible name, which CSS cannot
   carry. The server has no way to know the ground, so it renders a neutral
   label and the browser sharpens it: that is the whole reason for the
   useSyncExternalStore below, whose server snapshot is null. */

const KEY = "ns-theme";
const QUERY = "(prefers-color-scheme: dark)";

type Theme = "light" | "dark";

function stored(): Theme | null {
  try {
    const value = localStorage.getItem(KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function osTheme(): Theme {
  return window.matchMedia(QUERY).matches ? "dark" : "light";
}

function effectiveTheme(): Theme {
  return stored() ?? osTheme();
}

/* The effective ground is external state: it comes from the OS preference and
   from storage, and this component's own click changes it. Subscribers are
   woken by an OS preference change, by another tab writing the key, and by the
   local toggle. */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    query.removeEventListener("change", onChange);
    window.removeEventListener("storage", onChange);
  };
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore<Theme | null>(subscribe, effectiveTheme, () => null);

  useLayoutEffect(() => {
    // React's development remount resets <html> to the attributes it manages
    // from JSX, dropping the one the head script set. Re-applying here is a
    // no-op in production.
    const choice = stored();
    if (choice) document.documentElement.dataset.theme = choice;
  }, []);

  function toggle() {
    const next: Theme = effectiveTheme() === "dark" ? "light" : "dark";
    const matchesOs = next === osTheme();
    try {
      if (matchesOs) localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, next);
    } catch {
      // Private mode or storage disabled: the switch still works for this page
      // view, it just cannot persist.
    }
    if (matchesOs) delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = next;
    listeners.forEach((listener) => listener());
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="btn btn-secondary btn-icon ns-theme-toggle"
      aria-label={
        theme === null
          ? "Switch theme"
          : theme === "dark"
            ? "Switch to light theme"
            : "Switch to dark theme"
      }
      aria-pressed={theme === null ? undefined : theme === "dark"}
    >
      <Sun className="ns-icon-sun" size={16} strokeWidth={1.5} aria-hidden="true" />
      <Moon className="ns-icon-moon" size={16} strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
}
