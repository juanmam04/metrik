"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { PhilosophyConnection } from "@/components/philosophy/philosophy-connection";
import { PhilosophyStep } from "@/components/philosophy/philosophy-step";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { philosophySteps } from "@/data/philosophy-steps";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { easeOutExpo } from "@/lib/easing";

export function Philosophy() {
  const reducedMotion = usePrefersReducedMotion();
  const isStacked = useMediaQuery("(max-width: 1023px)");
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [connectionStage, setConnectionStage] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    if (reducedMotion) {
      setConnectionStage(2);
      return;
    }

    const timers = [
      window.setTimeout(() => setConnectionStage(1), 450),
      window.setTimeout(() => setConnectionStage(2), 950),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [visible, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="proceso"
      className="relative border-t border-border py-28 md:py-36 lg:py-40"
      aria-labelledby="philosophy-title"
    >
      <Container>
        <motion.div
          initial={false}
          animate={
            reducedMotion || visible
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="max-w-2xl"
        >
          <SectionLabel className="mb-6">Filosofía</SectionLabel>
          <h2
            id="philosophy-title"
            className="text-4xl leading-[1.08] font-medium tracking-[-0.04em] text-foreground md:text-5xl lg:text-[3.4rem]"
          >
            No empezamos programando.
          </h2>
        </motion.div>

        <div className="mt-16 md:mt-24">
          {isStacked ? (
            <div className="flex flex-col items-stretch">
              {philosophySteps.map((step, index) => (
                <div key={step.id} className="flex flex-col">
                  <PhilosophyStep
                    step={step}
                    index={index}
                    visible={visible}
                    reducedMotion={reducedMotion}
                    active={hovered === step.id}
                    dimmed={Boolean(hovered && hovered !== step.id)}
                    onHover={setHovered}
                  />
                  {index < philosophySteps.length - 1 ? (
                    <div className="flex justify-center py-1">
                      <PhilosophyConnection
                        orientation="vertical"
                        active={connectionStage > index}
                        dimmed={Boolean(
                          hovered &&
                            hovered !== step.id &&
                            hovered !== philosophySteps[index + 1]?.id
                        )}
                        reducedMotion={reducedMotion}
                        delay={0.05}
                      />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-start gap-4 lg:gap-6">
              {philosophySteps.map((step, index) => (
                <div key={step.id} className="contents">
                  <PhilosophyStep
                    step={step}
                    index={index}
                    visible={visible}
                    reducedMotion={reducedMotion}
                    active={hovered === step.id}
                    dimmed={Boolean(hovered && hovered !== step.id)}
                    onHover={setHovered}
                  />
                  {index < philosophySteps.length - 1 ? (
                    <div className="mt-14 px-1">
                      <PhilosophyConnection
                        orientation="horizontal"
                        active={connectionStage > index}
                        dimmed={Boolean(
                          hovered &&
                            hovered !== step.id &&
                            hovered !== philosophySteps[index + 1]?.id
                        )}
                        reducedMotion={reducedMotion}
                        delay={0.05}
                      />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Anchor targets for navbar links without new sections */}
        <div id="proyectos" className="sr-only" aria-hidden />
        <div id="servicios" className="sr-only" aria-hidden />
        <div id="contacto" className="sr-only" aria-hidden />
      </Container>
    </section>
  );
}
