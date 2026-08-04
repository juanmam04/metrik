"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";

import type { ProcessNodeData } from "@/data/process-nodes";
import { easeOutExpo } from "@/lib/easing";
import { cn } from "@/lib/utils";

type ProcessNodeProps = {
  node: ProcessNodeData;
  index: number;
  organized: boolean;
  lit: boolean;
  reducedMotion: boolean;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  compact?: boolean;
  viewWidth: number;
  viewHeight: number;
};

export function ProcessNode({
  node,
  index,
  organized,
  lit,
  reducedMotion,
  mouseX,
  mouseY,
  compact = false,
  viewWidth,
  viewHeight,
}: ProcessNodeProps) {
  const intensity = 1 + Math.abs(index - 2) * 0.18;
  const parallaxX = useTransform(mouseX, (value) =>
    organized ? value * 10 * intensity : 0
  );
  const parallaxY = useTransform(mouseY, (value) =>
    organized ? value * 7 * intensity : 0
  );

  const left = `${(node.x / viewWidth) * 100}%`;
  const top = `${(node.y / viewHeight) * 100}%`;

  return (
    <motion.div
      className="absolute z-10"
      style={{ left, top }}
      initial={false}
      animate={
        organized || reducedMotion
          ? {
              x: "-50%",
              y: "-50%",
              rotate: 0,
              opacity: 1,
            }
          : {
              x: `calc(-50% + ${node.chaos.x}px)`,
              y: `calc(-50% + ${node.chaos.y}px)`,
              rotate: node.chaos.rotate,
              opacity: 0.88,
            }
      }
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              duration: 1.05,
              delay: 0.5 + index * 0.08,
              ease: easeOutExpo,
            }
      }
    >
      <motion.div style={{ x: parallaxX, y: parallaxY }} className="group relative">
        <div
          className={cn(
            "flex items-center justify-between rounded-full border backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300",
            compact ? "h-9 w-[148px] px-3.5" : "h-11 w-[168px] px-4",
            lit
              ? "border-accent/55 bg-background shadow-[0_0_0_1px_rgba(124,92,255,0.12)]"
              : "border-border bg-background/80 group-hover:border-accent/40 group-hover:bg-background"
          )}
        >
          <span
            className={cn(
              "tracking-[-0.02em] text-foreground/92",
              compact ? "text-[12px]" : "text-[13px]"
            )}
          >
            {node.label}
          </span>
          <span
            className={cn(
              "size-1.5 rounded-full transition-colors duration-300",
              lit
                ? "bg-accent shadow-[0_0_10px_rgba(124,92,255,0.7)]"
                : "bg-muted-foreground/40 group-hover:bg-accent/80"
            )}
            aria-hidden
          />
        </div>

        <p className="pointer-events-none absolute top-[calc(100%+8px)] left-1/2 z-20 w-[200px] -translate-x-1/2 text-center text-[11px] leading-relaxed text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {node.description}
        </p>
      </motion.div>
    </motion.div>
  );
}
