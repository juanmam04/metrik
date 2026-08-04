"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

type ParallaxResult = {
  ref: React.RefObject<HTMLDivElement | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  enabled: boolean;
};

const spring = { stiffness: 120, damping: 26, mass: 0.35 };

export function useMouseParallax(enabled = true): ParallaxResult {
  const ref = useRef<HTMLDivElement | null>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);
  const canTrack = useRef(enabled);

  useEffect(() => {
    canTrack.current = enabled;
    if (!enabled) {
      rawX.set(0);
      rawY.set(0);
    }
  }, [enabled, rawX, rawY]);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const shouldDisable = () =>
      !canTrack.current || coarse.matches || reduce.matches;

    const node = ref.current;
    if (!node) return;

    const onMove = (event: PointerEvent) => {
      if (shouldDisable()) return;
      const rect = node.getBoundingClientRect();
      rawX.set((event.clientX - rect.left) / rect.width - 0.5);
      rawY.set((event.clientY - rect.top) / rect.height - 0.5);
    };

    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    node.addEventListener("pointermove", onMove, { passive: true });
    node.addEventListener("pointerleave", onLeave);

    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [rawX, rawY]);

  return { ref, x, y, enabled };
}
