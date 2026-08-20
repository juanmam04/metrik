"use client";

import { Container } from "@/components/ui/container";

const PRINCIPLES = [
  {
    n: "01",
    title: "Entender",
    lead: "Pensamos antes de construir.",
    body: "Primero el problema, la operación y lo que realmente necesita funcionar.",
  },
  {
    n: "02",
    title: "Diseñar",
    lead: "Diseñamos alrededor del sistema.",
    body: "Cada pantalla y decisión responde a una razón.",
  },
  {
    n: "03",
    title: "Construir",
    lead: "Construimos para que dure.",
    body: "Productos sólidos, mantenibles y listos para evolucionar.",
  },
  {
    n: "04",
    title: "Iterar",
    lead: "Seguimos después del lanzamiento.",
    body: "Medimos, ajustamos y mejoramos con uso real.",
  },
] as const;

export function PrinciplesSection() {
  return (
    <section
      className="relative border-t border-white/[0.06] py-20 md:py-36"
      aria-labelledby="principles-title"
    >
      <Container>
        <h2
          id="principles-title"
          className="font-display text-3xl font-medium tracking-[-0.045em] md:text-4xl"
        >
          Cómo pensamos
        </h2>

        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {PRINCIPLES.map((item) => (
            <article key={item.n}>
              <p className="font-mono text-[11px] tracking-[0.16em] text-accent/70">
                {item.n}
              </p>
              <h3 className="mt-4 font-display text-xl tracking-[-0.04em] text-white md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-white/75">
                {item.lead}
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-white/40">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
