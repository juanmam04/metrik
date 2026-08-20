"use client";

import { Container } from "@/components/ui/container";

const CAPABILITIES = [
  {
    id: "software",
    title: "Software",
    description:
      "Productos digitales construidos alrededor de operaciones reales.",
    examples: ["CRM", "gestión", "automatizaciones", "dashboards", "integraciones", "herramientas internas"],
  },
  {
    id: "web",
    title: "Web",
    description:
      "Sitios donde estrategia, diseño y tecnología trabajan para conseguir un objetivo.",
    examples: ["corporativas", "ecommerce", "experiencias digitales", "plataformas"],
  },
  {
    id: "producto",
    title: "Producto digital",
    description:
      "Desde una idea hasta un producto usable, escalable y preparado para crecer.",
    examples: ["MVP", "SaaS", "marketplaces", "apps"],
  },
] as const;

export function CapabilitiesSection() {
  return (
    <section
      id="servicios"
      className="relative border-t border-white/[0.06] py-28 md:py-36"
      aria-labelledby="capabilities-title"
    >
      <Container>
        <h2
          id="capabilities-title"
          className="font-display text-3xl font-medium tracking-[-0.045em] md:text-4xl"
        >
          Qué construimos
        </h2>

        <div className="mt-16 divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {CAPABILITIES.map((item) => (
            <article
              key={item.id}
              className="group grid gap-6 py-10 transition-colors md:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] md:gap-12 md:py-12"
            >
              <h3 className="font-display text-2xl tracking-[-0.04em] text-white md:text-[1.75rem]">
                {item.title}
              </h3>
              <div>
                <p className="max-w-xl text-[15px] leading-relaxed text-white/50">
                  {item.description}
                </p>
                <p className="mt-5 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[11px] tracking-[0.04em] text-white/30">
                  {item.examples.map((ex, i) => (
                    <span key={ex}>
                      {ex}
                      {i < item.examples.length - 1 ? (
                        <span className="ml-3 text-white/15" aria-hidden>
                          ·
                        </span>
                      ) : null}
                    </span>
                  ))}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
