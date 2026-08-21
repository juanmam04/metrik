"use client";

import { Container } from "@/components/ui/container";
import { processSteps } from "@/data/studio";

export function ProcessSection() {
  return (
    <section
      id="proceso"
      className="relative border-t border-white/[0.06] py-20 md:py-36"
      aria-labelledby="process-title"
    >
      <Container>
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent/75 uppercase">
            Proceso
          </p>
          <h2
            id="process-title"
            className="mt-4 font-display text-3xl font-medium tracking-[-0.045em] md:text-4xl"
          >
            Cómo se trabaja con Metrik.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-white/45">
            Un camino claro: menos incertidumbre, más decisiones útiles. Sin sprints de teatro.
          </p>
        </div>

        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step) => (
            <li key={step.n}>
              <p className="font-mono text-[11px] tracking-[0.16em] text-accent/70">{step.n}</p>
              <h3 className="mt-4 font-display text-xl tracking-[-0.04em] text-white md:text-2xl">
                {step.title}
              </h3>
              <p className="mt-2 font-mono text-[11px] tracking-[0.08em] text-white/35">
                {step.time}
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-white/45">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
