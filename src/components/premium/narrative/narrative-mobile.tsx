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
    <section className="relative" aria-label="Metrik">
      <div className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-16 pt-24 sm:px-8 sm:pb-12 sm:pt-28">
        <div className="relative z-10">
          <Logo className="mb-8 sm:mb-10 [&_span]:font-display [&_span]:text-[1.25rem] sm:[&_span]:text-[1.35rem] [&_span]:tracking-[-0.04em]" />

          <h1 className="font-display text-[2rem] leading-[1.1] sm:text-[2.35rem] sm:leading-[1.05] font-medium tracking-[-0.045em] text-white">
            Software que empieza
            <br />
            por entender el <span className="text-white/50">problema.</span>
          </h1>

          <p className="mt-5 max-w-[22rem] sm:max-w-[20rem] text-[15px] leading-[1.65] sm:leading-relaxed text-white/60">
            Diseñamos y construimos software, productos digitales y webs alrededor de lo que
            realmente necesitás.
          </p>

          <div className="mt-8 sm:mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-8 sm:gap-y-3">
            <a href="#servicios" className="inline-block text-[15px] text-white transition-opacity hover:opacity-70 active:opacity-50">
              Qué hacemos
            </a>
            <a
              href="#contacto"
              className="inline-block text-[14px] text-white/50 transition-colors hover:text-white/75 active:text-white/60"
            >
              Hablemos →
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06] px-5 py-14 sm:px-8 sm:py-16">
        <p className="font-mono text-[11px] tracking-[0.16em] text-accent/80 uppercase">
          Cómo trabajamos
        </p>
        <ul className="mt-9 space-y-9 sm:mt-10 sm:space-y-10">
          {STEPS.map((step) => (
            <li key={step.num}>
              <p className="font-mono text-[11px] tracking-[0.12em] text-white/35">{step.num}</p>
              <h2 className="mt-2.5 font-display text-[1.4rem] leading-[1.15] sm:text-2xl tracking-[-0.04em] text-white">
                {step.title}
              </h2>
              <p className="mt-2.5 max-w-md text-[15px] leading-[1.65] text-white/55">{step.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-white/[0.06] px-5 py-14 pb-20 sm:px-8 sm:py-16 sm:pb-20">
        <h2 className="font-display text-[1.65rem] leading-[1.12] sm:text-[1.85rem] sm:leading-[1.08] font-medium tracking-[-0.045em] text-white">
          Una operación.
          <br />
          Un sistema.
          <br />
          <span className="text-white/50">Todo conectado.</span>
        </h2>
        <p className="mt-5 max-w-md text-[15px] leading-[1.65] text-white/55">
          El producto es la consecuencia de haber entendido el problema.
        </p>
        <div className="mt-10 sm:mt-10">
          <NarrativeProduct variant="inline" />
        </div>
      </div>
    </section>
  );
}
