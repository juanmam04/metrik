import { cn } from "@/lib/utils";

/** Isotipo real: tres paralelogramos inclinados. Trazado desde el original. */
export const MARK_VIEWBOX = "0 0 64 64";
export const MARK_PURPLE = "#513CFA";

const BARS = [
  "M1.84 56.54 L15.23 56.64 L33.33 37.73 L33.23 23.51 Z",
  "M36.19 56.84 L47.13 45.39 L47.03 23.92 L36.19 44.98 Z",
  "M50.61 57.35 L50.61 17.99 L62.06 6.65 L62.06 45.8 Z",
] as const;

export function MetrikMark({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      fill="none"
      aria-hidden={!title}
      role={title ? "img" : undefined}
      className={cn("size-[22px]", className)}
    >
      {title ? <title>{title}</title> : null}
      <path d={BARS[0]} fill="currentColor" />
      <path d={BARS[1]} fill="currentColor" />
      <path d={BARS[2]} fill={MARK_PURPLE} />
    </svg>
  );
}
