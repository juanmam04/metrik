"use client";

import { Eye, PenLine, Boxes } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Container } from "@/components/ui/container";

const pillars = [
  {
    title: "Entender",
    description:
      "Mapeamos cómo trabaja tu empresa hoy: fricciones, huecos y oportunidades reales — antes de tocar una línea de código.",
    icon: Eye,
  },
  {
    title: "Diseñar",
    description:
      "Definimos la arquitectura del sistema: flujos, integraciones y decisiones que duran. Claridad antes que complejidad.",
    icon: PenLine,
  },
  {
    title: "Construir",
    description:
      "Implementamos con precisión. Entregamos sistemas estables, medibles y listos para evolucionar con tu operación.",
    icon: Boxes,
  },
] as const;

export function Philosophy() {
  return (
    <section id="process" className="relative border-t border-border py-32 md:py-40">
      <Container>
        <FadeIn className="max-w-2xl">
          <p className="mb-6 text-[13px] tracking-[0.18em] text-muted-foreground uppercase">
            Philosophy
          </p>
          <h2 className="text-4xl leading-[1.1] font-medium tracking-[-0.04em] text-foreground md:text-5xl lg:text-[3.5rem]">
            No empezamos programando.
          </h2>
        </FadeIn>

        <div className="mt-20 grid gap-14 md:mt-28 md:grid-cols-3 md:gap-12">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <FadeIn key={pillar.title} delay={0.08 * index} y={24}>
                <div className="flex h-full flex-col">
                  <div className="mb-8 flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground">
                    <Icon className="size-4" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl tracking-[-0.03em] text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
