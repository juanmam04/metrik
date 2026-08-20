"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  // Siempre false en el primer paint (SSR + hidratación) para evitar mismatch.
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}
