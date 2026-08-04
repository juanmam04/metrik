"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SystemFlow } from "@/components/visual/system-flow";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center pt-24 pb-20">
      <Container className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 text-[13px] tracking-[0.18em] text-muted-foreground uppercase"
          >
            Systems engineering
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2.5rem] leading-[1.05] font-medium tracking-[-0.045em] text-foreground sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          >
            Tu empresa ya tiene procesos.
            <span className="mt-3 block text-muted-foreground">
              Nosotros construimos los sistemas que los hacen mejores.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Conectamos herramientas, automatizamos operaciones y damos
            visibilidad real a tu negocio — con ingeniería clara y sin
            complejidad innecesaria.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button
              size="lg"
              render={<a href="#contact" />}
              className="rounded-full bg-foreground text-primary-foreground hover:bg-foreground/90"
            >
              Book a Call
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<a href="#process" />}
              className="rounded-full border-border bg-transparent text-foreground hover:bg-surface"
            >
              Ver proceso
              <ArrowRight data-icon="inline-end" className="size-4 opacity-70" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:justify-self-end"
        >
          <SystemFlow />
        </motion.div>
      </Container>
    </section>
  );
}
