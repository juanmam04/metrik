"use client";

import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLElement>;
  ariaLabel?: string;
};

function sharedFocus(
  className?: string
) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium outline-none transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
    className
  );
}

export function PrimaryButton({
  children,
  className,
  href,
  type = "button",
  onClick,
  ariaLabel,
}: BaseProps) {
  const classes = sharedFocus(
    cn(
      "h-11 bg-foreground px-6 text-primary-foreground hover:-translate-y-0.5 hover:bg-foreground/92",
      className
    )
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  className,
  href,
  type = "button",
  onClick,
  ariaLabel,
  showArrow = true,
}: BaseProps & { showArrow?: boolean }) {
  const classes = sharedFocus(
    cn(
      "group h-11 border border-border bg-surface/80 px-6 text-foreground hover:-translate-y-0.5 hover:border-accent/45 hover:bg-surface",
      className
    )
  );

  const content = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <ArrowRight
          aria-hidden
          className="size-4 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
        />
      ) : null}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} aria-label={ariaLabel}>
      {content}
    </button>
  );
}

export function TextLink({
  children,
  className,
  href = "#",
  onClick,
  ariaLabel,
}: BaseProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/60 transition-transform duration-300 group-hover:scale-x-100"
        />
      </span>
      <ArrowRight
        aria-hidden
        className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </a>
  );
}
