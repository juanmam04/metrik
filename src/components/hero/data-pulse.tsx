"use client";

import { motion } from "framer-motion";

type DataPulseProps = {
  points: Array<{ x: number; y: number }>;
  delay?: number;
  duration?: number;
  active: boolean;
  reducedMotion: boolean;
};

export function DataPulse({
  points,
  delay = 0,
  duration = 4.8,
  active,
  reducedMotion,
}: DataPulseProps) {
  if (!active || reducedMotion || points.length < 2) return null;

  const times = points.map((_, index) => index / (points.length - 1));

  return (
    <motion.circle
      r={2.4}
      fill="#7C5CFF"
      initial={{ opacity: 0, cx: points[0].x, cy: points[0].y }}
      animate={{
        cx: points.map((point) => point.x),
        cy: points.map((point) => point.y),
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        ease: "linear",
        repeat: Infinity,
        times,
        opacity: {
          duration,
          delay,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.06, 0.5, 0.92, 1],
        },
      }}
      style={{ filter: "drop-shadow(0 0 6px rgba(124,92,255,0.55))" }}
    />
  );
}

type SparsePulseProps = {
  x: number;
  fromY: number;
  toY: number;
  delay: number;
  organized: boolean;
  reducedMotion: boolean;
};

export function SparsePulse({
  x,
  fromY,
  toY,
  delay,
  organized,
  reducedMotion,
}: SparsePulseProps) {
  if (organized || reducedMotion) return null;

  return (
    <motion.circle
      r={1.8}
      fill="rgba(124,92,255,0.55)"
      cx={x}
      initial={{ cy: fromY, opacity: 0 }}
      animate={{
        cy: [fromY, toY],
        opacity: [0, 0.7, 0],
      }}
      transition={{
        duration: 1.6,
        delay,
        repeat: Infinity,
        repeatDelay: 1.2,
        ease: "easeInOut",
      }}
    />
  );
}
