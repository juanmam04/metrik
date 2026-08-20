"use client";

import { Logo } from "@/components/ui/logo";
import { NarrativeProduct } from "@/components/premium/narrative/narrative-product";

const STEPS = [
  {
    num: "01",
    title: "Entender",
    body: "Miramos la operación real antes de dibujar pantallas.",
  },
  {
    num: "02",
    title: "Criterio",
    body: "Separar ruido de lo que sí hay que resolver.",
  },
  {
    num: "03",
    title: "Estructura",
    body: "Convertir complejidad en un sistema que se sostiene.",
  },
  {
    num: "04",
    title: "Producto",
    body: "Construir solo lo que la operación necesita.",
  },
] as const;

/**
 * Mobile: sin pin/scrub. Hero + pasos cortos + producto.
 */
export function NarrativeMobile() {
  return (
    <section className="relative bg-[#050505]" aria-label="Metrik">
      <div className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-12 pt-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 70% 20%, rgba(81,60,250,0.18), transparent 55%), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(81,60,250,0.08), transparent 50%)",
          }}
        />

        <div className="relative z-10">
          <Logo className="mb-10 [&_span]:font-display [&_span]:text-[1.35rem] [&_span]:tracking-[-0.04em]" />

          <h1 className="font-display text-[2.35rem] leading-[1.05] font-medium tracking-[-0.045em] text-white">
            Software que empieza
            <br />
            por entender el <span className="text-white/50">problema.</span>
          </h1>

          <p className="mt-5 max-w-[20rem] text-[15px] leading-relaxed text-white/50">
            Diseñamos y construimos software, productos digitales y webs alrededor de lo que
            realmente necesitás.
          </p>

          <div className="mt-9 flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <a href="#servicios" className="text-[15px] text-white transition-opacity hover:opacity-70">
              Qué hacemos
            </a>
            <a
              href="#contacto"
              className="text-[14px] text-white/45 transition-colors hover:text-white/75"
            >
              Hablemos →
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06] px-5 py-16">
        <p className="font-mono text-[11px] tracking-[0.18em] text-accent/75 uppercase">
          Cómo trabajamos
        </p>
        <ul className="mt-10 space-y-10">
          {STEPS.map((step) => (
            <li key={step.num}>
              <p className="font-mono text-[11px] tracking-[0.14em] text-white/30">{step.num}</p>
              <h2 className="mt-2 font-display text-2xl tracking-[-0.04em] text-white">
                {step.title}
              </h2>
              <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-white/45">{step.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-white/[0.06] px-5 py-16 pb-20">
        <h2 className="font-display text-[1.85rem] leading-[1.08] font-medium tracking-[-0.045em] text-white">
          Una operación.
          <br />
          Un sistema.
          <br />
          <span className="text-white/50">Todo conectado.</span>
        </h2>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/45">
          El producto es la consecuencia de haber entendido el problema.
        </p>
        <div className="mt-10">
          <NarrativeProduct variant="inline" />
        </div>
      </div>
    </section>
  );
}
