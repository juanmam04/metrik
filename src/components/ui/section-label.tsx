import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-[12px] font-medium tracking-[0.2em] text-muted-foreground uppercase",
        className
      )}
    >
      {children}
    </p>
  );
}
