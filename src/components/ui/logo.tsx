"use client";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markOnly?: boolean;
};

function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn("size-[22px]", className)}
    >
      <rect
        x="4"
        y="18"
        width="5"
        height="10"
        rx="1.5"
        fill="currentColor"
        opacity="0.55"
      />
      <rect x="13.5" y="10" width="5" height="18" rx="1.5" fill="currentColor" />
      <rect x="23" y="4" width="5" height="24" rx="1.5" fill="#7C5CFF" />
    </svg>
  );
}

export function Logo({ className, markOnly = false }: LogoProps) {
  if (markOnly) {
    return (
      <span className={cn("inline-flex text-foreground", className)}>
        <Mark className="size-7" />
        <span className="sr-only">Metrik</span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-foreground",
        className
      )}
    >
      <Mark />
      <span className="text-[15px] font-medium tracking-[-0.03em]">Metrik</span>
    </span>
  );
}
