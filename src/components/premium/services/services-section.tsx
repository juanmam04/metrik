"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Container } from "@/components/ui/container";
import { services } from "@/data/services";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { easeOutExpo } from "@/lib/easing";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  const [active, setActive] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const service = services[active];

  return (
    <section
      id="servicios"
      className="relative py-28 md:py-40"
      aria-labelledby="services-title"
    >
      <Container>
        <h2 id="services-title" className="sr-only">
          Capacidades
        </h2>

        <div className="flex flex-wrap gap-2 md:gap-3">
          {services.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm transition-colors duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
                active === index
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="relative mt-14 min-h-[8rem] md:min-h-[10rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={service.id}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: easeOutExpo }}
            >
              <p className="max-w-xl font-display text-3xl font-medium tracking-[-0.04em] md:text-5xl">
                {service.title}
              </p>
              <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {service.id === "premium" ? (
          <motion.div
            key="premium-demo"
            initial={reducedMotion ? false : { clipPath: "inset(50% 50% 50% 50%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 0.9, ease: easeOutExpo }}
            className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent"
            aria-hidden
          />
        ) : (
          <div className="mt-16 h-px w-full bg-border" aria-hidden />
        )}
      </Container>
    </section>
  );
}
