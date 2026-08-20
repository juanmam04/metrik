"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { easeOutExpo } from "@/lib/easing";

/** La secuencia inicial ya contó la filosofía — una frase cierra */
export function PhilosophyClose() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      className="relative border-t border-border py-24 md:py-32"
      aria-label="Filosofía"
    >
      <Container>
        <motion.blockquote
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="max-w-3xl"
        >
          <p className="font-display text-2xl leading-[1.15] font-medium tracking-[-0.04em] md:text-4xl lg:text-[2.75rem]">
            El producto correcto empieza antes de la primera pantalla.
          </p>
        </motion.blockquote>
      </Container>
    </section>
  );
}
