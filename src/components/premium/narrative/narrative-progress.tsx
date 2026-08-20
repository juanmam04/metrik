"use client";

import { createContext, useContext } from "react";

const NarrativeProgressContext = createContext(0);

export function NarrativeProgressProvider({
  progress,
  children,
}: {
  progress: number;
  children: React.ReactNode;
}) {
  return (
    <NarrativeProgressContext.Provider value={progress}>
      {children}
    </NarrativeProgressContext.Provider>
  );
}

export function useNarrativeProgress() {
  return useContext(NarrativeProgressContext);
}

export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
