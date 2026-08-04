"use client";

import { motion } from "framer-motion";

import { easeOutExpo } from "@/lib/easing";

type ConnectionLineProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  organized: boolean;
  reducedMotion: boolean;
  delay?: number;
  active?: boolean;
};

export function ConnectionLine({
  x1,
  y1,
  x2,
  y2,
  organized,
  reducedMotion,
  delay = 0,
  active = false,
}: ConnectionLineProps) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={active ? "rgba(124,92,255,0.7)" : "url(#metrik-flow-stroke)"}
      strokeWidth={active ? 1.4 : 1}
      strokeLinecap="round"
      initial={false}
      animate={{
        pathLength: organized || reducedMotion ? 1 : 0.35,
        opacity: organized ? (active ? 0.95 : 0.55) : 0.18,
      }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              duration: 0.9,
              delay,
              ease: easeOutExpo,
            }
      }
    />
  );
}
