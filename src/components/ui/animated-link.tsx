"use client";

import { cn } from "@/lib/utils";

type AnimatedLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode;
};

export function AnimatedLink({
  children,
  className,
  ...props
}: AnimatedLinkProps) {
  return (
    <a
      className={cn(
        "group relative inline-flex items-center text-[13px] text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:rounded-sm focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-foreground/70 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </a>
  );
}
