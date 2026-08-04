"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const nodes = [
  { id: "cliente", label: "Cliente" },
  { id: "crm", label: "CRM" },
  { id: "automation", label: "Automatización" },
  { id: "ai", label: "IA" },
  { id: "reports", label: "Reportes" },
] as const;

const spring = { stiffness: 140, damping: 24, mass: 0.35 };

export function SystemFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, spring);
  const springY = useSpring(mouseY, spring);

  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7, 7]);

  const glowX = useTransform(springX, [-0.5, 0.5], [28, 72]);
  const glowY = useTransform(springY, [-0.5, 0.5], [22, 78]);
  const glowBackground = useMotionTemplate`
    radial-gradient(
      380px circle at ${glowX}% ${glowY}%,
      rgba(124, 92, 255, 0.1),
      transparent 58%
    )
  `;

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className="relative mx-auto w-full max-w-[380px] select-none"
    >
      <motion.div
        aria-hidden
        style={{ background: glowBackground }}
        className="pointer-events-none absolute -inset-6 rounded-[2.5rem]"
      />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-surface/70 px-7 py-10 backdrop-blur-sm">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        />

        <div className="relative flex flex-col items-center">
          {nodes.map((node, index) => (
            <div key={node.id} className="flex w-full flex-col items-center">
              <FlowNode
                label={node.label}
                index={index}
                mouseX={springX}
                mouseY={springY}
              />
              {index < nodes.length - 1 && (
                <motion.div
                  aria-hidden
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.28 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="my-1 h-8 w-px origin-top bg-gradient-to-b from-accent/40 via-border to-accent/40"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

type FlowNodeProps = {
  label: string;
  index: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
};

function FlowNode({ label, index, mouseX, mouseY }: FlowNodeProps) {
  const intensity = 1 + Math.abs(index - 2) * 0.2;
  const x = useTransform(mouseX, (value) => value * 16 * intensity);
  const y = useTransform(mouseY, (value) => value * 10 * intensity);

  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: 0.15 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group w-full"
    >
      <div className="flex w-full items-center justify-between rounded-full border border-border bg-background/75 px-5 py-3 transition-[border-color,background-color] duration-300 group-hover:border-accent/35 group-hover:bg-background">
        <span className="text-[13px] tracking-[-0.015em] text-foreground/90">
          {label}
        </span>
        <span className="size-1.5 rounded-full bg-muted-foreground/40 transition-colors duration-300 group-hover:bg-accent" />
      </div>
    </motion.div>
  );
}
