import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

/* Blueprint frame — the system's `.blueprint` class plus the four corner
   registration marks, which are never optional on a framed element
   (design/readme.md "Don't"). Use it for cards, figures and primary buttons:

     <Blueprint className="card">…</Blueprint>
     <Blueprint as="button" type="submit" className="btn btn-primary">…</Blueprint>

   The marks must be direct children of the `.blueprint` element, so this
   component owns them and nothing else re-declares the fragment. */

type OwnProps<E extends ElementType> = {
  as?: E;
  className?: string;
  children?: ReactNode;
};

export default function Blueprint<E extends ElementType = "div">({
  as,
  className,
  children,
  ...rest
}: OwnProps<E> & Omit<ComponentPropsWithoutRef<E>, keyof OwnProps<E>>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag {...rest} className={className ? `blueprint ${className}` : "blueprint"}>
      <i className="corner tl" />
      <i className="corner tr" />
      <i className="corner bl" />
      <i className="corner br" />
      {children}
    </Tag>
  );
}
