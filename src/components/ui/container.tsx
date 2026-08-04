import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "main";
};

export function Container({
  children,
  className,
  as: Comp = "div",
}: ContainerProps) {
  return (
    <Comp className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 md:px-8", className)}>
      {children}
    </Comp>
  );
}
