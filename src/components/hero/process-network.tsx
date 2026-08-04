"use client";

import { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useTransform,
} from "framer-motion";

import { ConnectionLine } from "@/components/hero/connection-line";
import { DataPulse, SparsePulse } from "@/components/hero/data-pulse";
import { ProcessNode } from "@/components/hero/process-node";
import { PROCESS_VIEWBOX, processNodes } from "@/data/process-nodes";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMouseParallax } from "@/hooks/use-mouse-parallax";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { easeOutExpo } from "@/lib/easing";
import { cn } from "@/lib/utils";

type ProcessNetworkProps = {
  scrollProgress?: number;
  className?: string;
};

export function ProcessNetwork({
  scrollProgress = 0,
  className,
}: ProcessNetworkProps) {
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useMediaQuery("(pointer: coarse)");
  const compact = useMediaQuery("(max-width: 1023px)");
  const { ref, x, y } = useMouseParallax(!reducedMotion && !isTouch);

  const [organized, setOrganized] = useState(reducedMotion);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    if (reducedMotion) {
      setOrganized(true);
      return;
    }

    const timer = window.setTimeout(() => setOrganized(true), 1200);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (scrollProgress > 0.08) setOrganized(true);
  }, [scrollProgress]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  const reinforce = Math.min(scrollProgress * 1.4, 1);
  const rotateX = useTransform(y, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);
  const glowX = useTransform(x, [-0.5, 0.5], [30, 70]);
  const glowY = useTransform(y, [-0.5, 0.5], [24, 76]);
  const glow = useMotionTemplate`
    radial-gradient(
      360px circle at ${glowX}% ${glowY}%,
      rgba(124, 92, 255, ${0.08 + reinforce * 0.05}),
      transparent 58%
    )
  `;

  const pathPoints = useMemo(
    () => processNodes.map((node) => ({ x: node.x, y: node.y })),
    []
  );

  const pulsesActive = organized && inView && !reducedMotion;
  const pulseDuration = compact ? 5.4 : 4.8;

  useEffect(() => {
    if (!pulsesActive) {
      setActiveNode(organized ? 0 : null);
      return;
    }

    let index = 0;
    setActiveNode(0);
    const stepMs = pulseDuration / (processNodes.length - 1);
    const timer = window.setInterval(() => {
      index = (index + 1) % processNodes.length;
      setActiveNode(index);
    }, stepMs);

    return () => window.clearInterval(timer);
  }, [pulsesActive, pulseDuration, organized]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative mx-auto w-full max-w-[400px] select-none",
        className
      )}
      style={
        reducedMotion || isTouch
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1100 }
      }
      aria-label="Visualización del flujo Cliente a Reportes"
      role="img"
    >
      <motion.div
        aria-hidden
        style={{ background: glow }}
        className="pointer-events-none absolute -inset-8 rounded-[2.5rem]"
      />

      <div
        className={cn(
          "relative overflow-visible rounded-[1.75rem] border bg-surface/65 backdrop-blur-sm transition-[border-color,box-shadow] duration-500",
          organized
            ? "border-border shadow-[0_0_0_1px_rgba(27,27,27,0.8)]"
            : "border-border/70"
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent"
        />

        <div
          className="relative w-full"
          style={{
            aspectRatio: `${PROCESS_VIEWBOX.width} / ${PROCESS_VIEWBOX.height}`,
          }}
        >
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${PROCESS_VIEWBOX.width} ${PROCESS_VIEWBOX.height}`}
            fill="none"
            aria-hidden
          >
            <defs>
              <linearGradient
                id="metrik-flow-stroke"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#7C5CFF"
                  stopOpacity={0.15 + reinforce * 0.15}
                />
                <stop
                  offset="50%"
                  stopColor="#7C5CFF"
                  stopOpacity={0.45 + reinforce * 0.25}
                />
                <stop
                  offset="100%"
                  stopColor="#7C5CFF"
                  stopOpacity={0.15 + reinforce * 0.15}
                />
              </linearGradient>
            </defs>

            {processNodes.slice(0, -1).map((node, index) => {
              const next = processNodes[index + 1];
              return (
                <ConnectionLine
                  key={`${node.id}-${next.id}`}
                  x1={node.x}
                  y1={node.y + 22}
                  x2={next.x}
                  y2={next.y - 22}
                  organized={organized}
                  reducedMotion={reducedMotion}
                  delay={0.7 + index * 0.12}
                  active={
                    activeNode === index ||
                    activeNode === index + 1 ||
                    reinforce > 0.35
                  }
                />
              );
            })}

            {!organized &&
              processNodes.slice(0, -1).map((node, index) => {
                const next = processNodes[index + 1];
                return (
                  <SparsePulse
                    key={`sparse-${node.id}`}
                    x={node.x + (index % 2 === 0 ? -8 : 10)}
                    fromY={node.y + 10}
                    toY={next.y - 10}
                    delay={index * 0.35}
                    organized={organized}
                    reducedMotion={reducedMotion}
                  />
                );
              })}

            {pulsesActive ? (
              <>
                <DataPulse
                  points={pathPoints}
                  active={pulsesActive}
                  reducedMotion={reducedMotion}
                  delay={0.2}
                  duration={pulseDuration}
                />
                <DataPulse
                  points={pathPoints}
                  active={pulsesActive}
                  reducedMotion={reducedMotion}
                  delay={pulseDuration * 0.52}
                  duration={pulseDuration}
                />
              </>
            ) : null}
          </svg>

          {processNodes.map((node, index) => (
            <ProcessNode
              key={node.id}
              node={node}
              index={index}
              organized={organized}
              lit={activeNode === index || (!pulsesActive && organized)}
              reducedMotion={reducedMotion}
              mouseX={x}
              mouseY={y}
              compact={compact}
              viewWidth={PROCESS_VIEWBOX.width}
              viewHeight={PROCESS_VIEWBOX.height}
            />
          ))}
        </div>
      </div>

      <motion.p
        aria-hidden
        initial={false}
        animate={{
          opacity: organized ? 0.7 : 0.35,
        }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        className="mt-4 text-center text-[11px] tracking-[0.16em] text-muted-foreground uppercase"
      >
        {organized ? "Sistema estabilizado" : "Solucionando el flujo"}
      </motion.p>
    </motion.div>
  );
}
