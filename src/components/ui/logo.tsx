"use client";

import { MetrikMark } from "@/components/ui/metrik-mark";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markOnly?: boolean;
};

export function Logo({ className, markOnly = false }: LogoProps) {
  if (markOnly) {
    return (
      <span className={cn("inline-flex text-foreground", className)}>
        <MetrikMark className="size-8" />
        <span className="sr-only">Metrik</span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-foreground",
        className
      )}
    >
      <MetrikMark className="size-[28px] sm:size-[30px]" />
      <span className="text-[17px] font-medium tracking-[-0.03em] sm:text-[18px]">
        Metrik
      </span>
    </span>
  );
}
