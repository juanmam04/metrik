"use client";

import { motion } from "framer-motion";

import type { PhilosophyStepData } from "@/data/philosophy-steps";
import { easeOutExpo } from "@/lib/easing";
import { cn } from "@/lib/utils";

type PhilosophyStepProps = {
  step: PhilosophyStepData;
  index: number;
  active: boolean;
  dimmed: boolean;
  visible: boolean;
  reducedMotion: boolean;
  onHover: (id: string | null) => void;
};

export function PhilosophyStep({
  step,
  index,
  active,
  dimmed,
  visible,
  reducedMotion,
  onHover,
}: PhilosophyStepProps) {
  const Icon = step.icon;

  return (
    <motion.article
      onMouseEnter={() => onHover(step.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(step.id)}
      onBlur={() => onHover(null)}
      tabIndex={0}
      initial={false}
      animate={
        reducedMotion || visible
          ? { opacity: dimmed ? 0.45 : 1, y: 0 }
          : { opacity: 0, y: 18 }
      }
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              duration: 0.65,
              delay: 0.1 + index * 0.18,
              ease: easeOutExpo,
            }
      }
      className="group relative outline-none transition-[opacity,transform] duration-300 focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-[12px] tracking-[0.14em] text-muted-foreground">
          {step.number}
        </span>
        <div
          className={cn(
            "flex size-10 items-center justify-center rounded-full border transition-[border-color,color,background-color] duration-300",
            active
              ? "border-accent/50 text-accent"
              : "border-border text-muted-foreground group-hover:border-accent/40 group-hover:text-accent"
          )}
        >
          <Icon className="size-4 transition-transform duration-300 group-hover:-translate-y-px" strokeWidth={1.5} />
        </div>
      </div>

      <h3 className="text-xl tracking-[-0.03em] text-foreground md:text-[1.35rem]">
        {step.title}
      </h3>

      <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
        {step.description}
      </p>

      <p
        className={cn(
          "mt-5 text-[12px] tracking-[-0.01em] transition-colors duration-300",
          active ? "text-accent" : "text-muted-foreground/70"
        )}
      >
        {step.detail}
      </p>
    </motion.article>
  );
}
