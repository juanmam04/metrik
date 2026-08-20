/** Motion design tokens — single source of truth for Metrik Premium */
export const MOTION = {
  duration: {
    instant: 0.15,
    fast: 0.28,
    base: 0.5,
    slow: 0.75,
    scene: 1.1,
  },
  ease: {
    /** Primary exits — UI, reveals */
    primary: "power3.out",
    /** Secondary — morphs, crossfades */
    secondary: "power2.inOut",
    /** Scroll-scrubbed timelines */
    scroll: "none",
    /** Snappy micro-interactions */
    snap: "power4.out",
  },
  stagger: {
    tight: 0.04,
    base: 0.08,
    loose: 0.14,
  },
} as const;

/** Scroll narrative length in viewport heights */
export const NARRATIVE_SCROLL = {
  desktop: 8.8,
  mobile: 6.4,
} as const;
