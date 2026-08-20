"use client";

import { useNarrativeProgress, smoothstep } from "./narrative-progress";

/** Placeholder legacy — la narrativa actual no usa captura de proyecto. */
export function ProductStage() {
  return null;
}

export function MetrikReveal() {
  const progress = useNarrativeProgress();
  const show = smoothstep(0.92, 0.99, progress);
  if (show < 0.01) return null;

  return (
    <div
      className="absolute inset-0 z-40 flex items-end justify-start bg-gradient-to-t from-black via-black/70 to-transparent p-8 md:p-14"
      style={{ opacity: show }}
    >
      <div>
        <p className="font-display text-4xl font-medium tracking-[-0.04em] md:text-6xl">
          Metrik
        </p>
        <p className="mt-3 text-[15px] text-white/70">
          Software, productos digitales y webs alrededor de lo que realmente necesitás.
        </p>
      </div>
    </div>
  );
}
