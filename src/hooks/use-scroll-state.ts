"use client";

import { useEffect, useState } from "react";

type ScrollState = {
  scrolled: boolean;
  y: number;
  progress: number;
};

export function useScrollState(threshold = 24) {
  const [state, setState] = useState<ScrollState>({
    scrolled: false,
    y: 0,
    progress: 0,
  });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const y = window.scrollY;
      const max = Math.max(window.innerHeight * 0.85, 1);
      setState({
        scrolled: y > threshold,
        y,
        progress: Math.min(y / max, 1),
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [threshold]);

  return state;
}
