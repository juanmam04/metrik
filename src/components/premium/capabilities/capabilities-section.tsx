"use client";

import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/metrik-button";

const CAPABILITIES = [
  {
    id: "software",
    title: "Software",
    outcome: "Sistemas que sostienen la operación diaria.",
    description:
      "Construimos herramientas internas y plataformas alrededor de flujos reales: pedidos, clientes, pagos, stock, reportes. El objetivo no es “tener un sistema”, es dejar de depender de planillas y memoria.",
    examples: ["CRM", "gestión", "automatizaciones", "dashboards", "integraciones", "herramientas internas"],
    forWhom: "Equipos que ya operan y necesitan orden sin frenar el negocio.",
  },
  {
    id: "web",
    title: "Web",
    outcome: "Sitios que explican, convencen y convierten.",
    description:
      "Webs con estrategia, diseño y tecnología alineados. Desde corporativas claras hasta experiencias premium que demuestran el nivel del producto o del estudio.",
    examples: ["corporativas", "ecommerce", "experiencias digitales", "plataformas"],
    forWhom: "Marcas y estudios que necesitan verse a la altura de lo que venden.",
  },
  {
    id: "producto",
    title: "Producto digital",
    outcome: "De la idea al producto usable — sin features de más.",
    description:
      "Acompañamos discovery, diseño y build. Recortamos al problema correcto, priorizamos el flujo crítico y entregamos algo que se pueda usar, medir e iterar.",
    examples: ["MVP", "SaaS", "marketplaces", "apps"],
    forWhom: "Fundadores y equipos con una idea clara de dolor, no solo de pantalla.",
  },
] as const;

export function CapabilitiesSection() {
  return (
    <section
      id="servicios"
      className="relative border-t border-white/[0.06] py-20 md:py-36"
      aria-labelledby="capabilities-title"
    >
      <Container>
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent/75 uppercase">
            Servicios
          </p>
          <h2
            id="capabilities-title"
            className="mt-4 font-display text-3xl font-medium tracking-[-0.045em] md:text-4xl"
          >
            Qué construimos
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-white/45">
            Tres líneas de trabajo. El mismo criterio en todas: entender primero, construir después.
          </p>
        </div>

        <div className="mt-16 divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {CAPABILITIES.map((item) => (
            <article
              key={item.id}
              className="grid gap-6 py-10 md:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] md:gap-12 md:py-14"
            >
              <div>
                <h3 className="font-display text-2xl tracking-[-0.04em] text-white md:text-[1.75rem]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/70">{item.outcome}</p>
              </div>
              <div>
                <p className="max-w-2xl text-[15px] leading-relaxed text-white/50">
                  {item.description}
                </p>
                <p className="mt-5 text-[13px] leading-relaxed text-white/35">
                  <span className="text-white/50">Para quién: </span>
                  {item.forWhom}
                </p>
                <p className="mt-5 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[11px] tracking-[0.04em] text-white/28">
                  {item.examples.map((ex, i) => (
                    <span key={ex}>
                      {ex}
                      {i < item.examples.length - 1 ? (
                        <span className="ml-3 text-white/12" aria-hidden>
                          ·
                        </span>
                      ) : null}
                    </span>
                  ))}
                </p>
                <TextLink href="#contacto" className="mt-8 text-[14px] text-white/55 hover:text-white">
                  Hablar de este servicio
                </TextLink>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
