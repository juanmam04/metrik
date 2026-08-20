"use client";

import { useEffect } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

export function SubtleCursor() {
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useMediaQuery("(pointer: coarse)");

  useEffect(() => {
    if (reducedMotion || isTouch) return;

    const dot = document.createElement("div");
    dot.setAttribute("aria-hidden", "true");
    dot.className =
      "pointer-events-none fixed z-[100] hidden size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 mix-blend-difference md:block";
    document.body.style.cursor = "none";
    dot.style.opacity = "0";
    document.body.appendChild(dot);

    let visible = false;

    const onMove = (event: PointerEvent) => {
      dot.style.left = `${event.clientX}px`;
      dot.style.top = `${event.clientY}px`;
      if (!visible) {
        dot.style.opacity = "1";
        visible = true;
      }
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      visible = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.body.style.cursor = "";
      dot.remove();
    };
  }, [reducedMotion, isTouch]);

  return null;
}
