"use client";

import { motion } from "framer-motion";

import { easeOutExpo } from "@/lib/easing";
import { cn } from "@/lib/utils";

type PhilosophyConnectionProps = {
  active: boolean;
  dimmed: boolean;
  reducedMotion: boolean;
  delay?: number;
  orientation?: "horizontal" | "vertical";
};

export function PhilosophyConnection({
  active,
  dimmed,
  reducedMotion,
  delay = 0,
  orientation = "horizontal",
}: PhilosophyConnectionProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      aria-hidden
      className={cn(
        "relative flex items-center justify-center",
        isHorizontal ? "h-px w-full min-w-[2.5rem]" : "h-12 w-px"
      )}
    >
      <div
        className={cn(
          "absolute bg-border transition-opacity duration-300",
          isHorizontal ? "inset-x-0 h-px" : "inset-y-0 w-px",
          dimmed ? "opacity-30" : "opacity-70"
        )}
      />
      <motion.div
        className={cn(
          "absolute origin-left bg-accent",
          isHorizontal ? "inset-x-0 h-px origin-left" : "inset-y-0 w-px origin-top"
        )}
        initial={false}
        animate={{
          scaleX: isHorizontal ? (active || reducedMotion ? 1 : 0) : 1,
          scaleY: !isHorizontal ? (active || reducedMotion ? 1 : 0) : 1,
          opacity: dimmed ? 0.25 : active ? 0.9 : 0.55,
        }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { duration: 0.7, delay, ease: easeOutExpo }
        }
      />
    </div>
  );
}
