"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { NarrativeProduct } from "@/components/premium/narrative/narrative-product";
import { NarrativeWorld } from "@/components/premium/narrative/narrative-world";
import { MARK_PURPLE, MARK_VIEWBOX } from "@/components/ui/metrik-mark";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const LOGO_BARS = [
  "M1.84 56.54 L15.23 56.64 L33.33 37.73 L33.23 23.51 Z",
  "M36.19 56.84 L47.13 45.39 L47.03 23.92 L36.19 44.98 Z",
  "M50.61 57.35 L50.61 17.99 L62.06 6.65 L62.06 45.8 Z",
] as const;

const SCROLL_VH = { desktop: 9.8, mobile: 7.4 };

const BEATS = [
  {
    id: "hero",
    title: (
      <>
        Software que empieza
        <br />
        por entender el <span className="text-white/50">problema.</span>
      </>
    ),
    body: "Diseñamos y construimos software, productos digitales y webs alrededor de lo que realmente necesitás.",
    cta: true,
  },
  {
    id: "observe",
    title: (
      <>
        Entender
        <br />
        antes de construir.
      </>
    ),
  },
  {
    id: "understand",
    title: (
      <>
        Encontrar
        <br />
        el problema correcto.
      </>
    ),
  },
  {
    id: "structure",
    title: (
      <>
        Convertir complejidad
        <br />
        en estructura.
      </>
    ),
  },
  {
    id: "build",
    title: (
      <>
        Construir lo que
        <br />
        realmente necesitás.
      </>
    ),
  },
  {
    id: "product",
    title: (
      <>
        Una operación.
        <br />
        Un sistema.
        <br />
        <span className="text-white/50">Todo conectado.</span>
      </>
    ),
    body: "El producto es la consecuencia de haber entendido el problema.",
  },
] as const;

function prepDraws(root: HTMLElement) {
  root.querySelectorAll<SVGGeometryElement>(".nv-draw").forEach((node) => {
    if (typeof node.getTotalLength !== "function") return;
    const len = node.getTotalLength();
    if (!len || !Number.isFinite(len)) return;
    node.setAttribute("stroke-dasharray", `${len}`);
    node.setAttribute("stroke-dashoffset", `${len}`);
    gsap.set(node, { attr: { "stroke-dashoffset": len } });
  });
}

function prepThinkLine(line: SVGPathElement) {
  const len = line.getTotalLength();
  if (!len || !Number.isFinite(len)) return 0;
  // Empieza en cero: sin trazo visible
  line.setAttribute("stroke-dasharray", `${len}`);
  line.setAttribute("stroke-dashoffset", `${len}`);
  gsap.set(line, { attr: { "stroke-dashoffset": len } });
  return len;
}

/** Copia izquierda — sale completa antes de que entre la siguiente. */
function copySwap(
  tl: gsap.core.Timeline,
  leave: string,
  enter: string | null,
  at: number
) {
  tl.to(leave, { autoAlpha: 0, y: -10, duration: 0.05, ease: "none" }, at);
  if (enter) {
    tl.fromTo(
      enter,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.07, ease: "none" },
      at + 0.05
    );
  }
}

/**
 * Un mundo continuo. Scrub reversible.
 * CAOS → OBSERVAR → ENTENDER → ESTRUCTURAR → CONSTRUIR → PRODUCTO
 */
export function NarrativeExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    if (reducedMotion) {
      gsap.set(stage.querySelectorAll(".nv-beat:not(.nv-beat-hero)"), { autoAlpha: 0 });
      gsap.set(stage.querySelector(".nv-beat-hero"), { autoAlpha: 1 });
      const line = stage.querySelector<SVGPathElement>("#nv-line");
      if (line) {
        const len = line.getTotalLength();
        line.setAttribute("stroke-dasharray", `${len}`);
        line.setAttribute("stroke-dashoffset", "0");
      }
      return;
    }

    const ctx = gsap.context(() => {
      prepDraws(stage);

      const line = stage.querySelector<SVGPathElement>("#nv-line");
      const pulse = stage.querySelector<SVGCircleElement>(".nv-pulse");
      const lineLen = line ? prepThinkLine(line) : 0;

      gsap.set(".nv-frag-axis", { opacity: 0 });
      gsap.set(".nv-frag-chaos", { opacity: 1 });
      gsap.set(".nv-frag", { x: 0, y: 0, opacity: 1 });
      gsap.set(".nv-sys", { opacity: 0, x: 0, y: 0, scale: 1 });
      gsap.set(".nv-axis-stage", { opacity: 0 });
      gsap.set(".nv-sys-head", { opacity: 0 });
      gsap.set(".nv-sys-links", { opacity: 0 });
      gsap.set(".nv-wire", { opacity: 0 });
      gsap.set(".nv-hot-frame", { attr: { height: 220, y: 270 } });
      gsap.set(".nv-camera", { x: 0, y: 0, scale: 1, opacity: 1, svgOrigin: "470 380" });
      gsap.set(".nv-product", {
        autoAlpha: 0,
        scale: 0.92,
        y: 24,
        transformOrigin: "50% 45%",
      });
      gsap.set(".nv-logo-forge", { autoAlpha: 0, y: 0 });
      gsap.set(".nv-logo-bar-0, .nv-logo-bar-1, .nv-logo-bar-2, .nv-logo-word", {
        autoAlpha: 0,
        y: 10,
      });
      gsap.set(".nv-beat", { autoAlpha: 0 });
      gsap.set(".nv-beat-hero", { autoAlpha: 1 });
      gsap.set(".nv-need", { opacity: 1 });
      gsap.set(".nv-atmosphere", { opacity: 0.9 });
      gsap.set(".nv-annos", { opacity: 0.35 });
      gsap.set(".nv-deadends", { opacity: 0.35 });
      gsap.set(".nv-think", { opacity: 1 });
      gsap.set(".nv-think-glow", { opacity: 0 });
      gsap.set(".nv-pulse-ring", { opacity: 0 });
      gsap.set(".nv-frag-halo", { opacity: 0.15 });
      gsap.set(".nv-frag-chaos", { opacity: 0.2 });
      gsap.set(".nv-frag-tick", { opacity: 0.15 });
      gsap.set(".nv-frag-tag", { opacity: 0.35 });

      const traveler = { p: 0 };
      const placePulse = () => {
        if (!pulse || !line || lineLen <= 0) return;
        const pt = line.getPointAtLength(Math.min(1, Math.max(0, traveler.p)) * lineLen);
        pulse.setAttribute("cx", String(pt.x));
        pulse.setAttribute("cy", String(pt.y));
        const ring = stage.querySelector(".nv-pulse-ring");
        if (ring) {
          ring.setAttribute("cx", String(pt.x));
          ring.setAttribute("cy", String(pt.y));
        }
      };
      placePulse();
      if (pulse) gsap.set(pulse, { autoAlpha: 1 });

      // Glow bajo el trazo: mismo dash que la línea (empieza vacío)
      const glow = stage.querySelector<SVGPathElement>(".nv-think-glow");
      if (glow && lineLen > 0) {
        glow.setAttribute("stroke-dasharray", `${lineLen}`);
        glow.setAttribute("stroke-dashoffset", `${lineLen}`);
        gsap.set(glow, { attr: { "stroke-dashoffset": lineLen }, opacity: 0 });
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin: stage,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* ——— 0–0.26 OBSERVAR: trazo desde cero + nodos que se “descubren” ——— */
      copySwap(tl, ".nv-beat-hero", ".nv-beat-observe", 0.08);
      if (line && lineLen > 0) {
        tl.fromTo(
          line,
          { attr: { "stroke-dashoffset": lineLen } },
          { attr: { "stroke-dashoffset": 0 }, duration: 0.26 },
          0
        );
        if (glow) {
          tl.fromTo(
            glow,
            { attr: { "stroke-dashoffset": lineLen }, opacity: 0 },
            { attr: { "stroke-dashoffset": 0 }, opacity: 0.55, duration: 0.26 },
            0
          );
        }
        tl.fromTo(traveler, { p: 0 }, { p: 1, duration: 0.26, onUpdate: placePulse }, 0);
      }
      tl.to(".nv-pulse-ring", { opacity: 0.75, duration: 0.04 }, 0.02);
      tl.to(".nv-annos", { opacity: 1, duration: 0.1 }, 0.04);
      tl.to(".nv-deadends", { opacity: 0.9, duration: 0.12 }, 0.06);

      // Cada síntoma gana presencia cuando el criterio lo alcanza
      tl.to(".nv-frag-0 .nv-frag-chaos", { opacity: 1, duration: 0.03 }, 0.055);
      tl.to(".nv-frag-0 .nv-frag-halo", { opacity: 0.95, duration: 0.03 }, 0.055);
      tl.to(".nv-frag-0 .nv-frag-tick", { opacity: 0.85, duration: 0.03 }, 0.055);
      tl.to(".nv-frag-0 .nv-frag-tag", { opacity: 1, duration: 0.03 }, 0.055);

      tl.to(".nv-frag-1 .nv-frag-chaos", { opacity: 1, duration: 0.03 }, 0.11);
      tl.to(".nv-frag-1 .nv-frag-halo", { opacity: 0.95, duration: 0.03 }, 0.11);
      tl.to(".nv-frag-1 .nv-frag-tick", { opacity: 0.85, duration: 0.03 }, 0.11);
      tl.to(".nv-frag-1 .nv-frag-tag", { opacity: 1, duration: 0.03 }, 0.11);

      tl.to(".nv-frag-2 .nv-frag-chaos", { opacity: 1, duration: 0.03 }, 0.165);
      tl.to(".nv-frag-2 .nv-frag-halo", { opacity: 0.95, duration: 0.03 }, 0.165);
      tl.to(".nv-frag-2 .nv-frag-tick", { opacity: 0.85, duration: 0.03 }, 0.165);
      tl.to(".nv-frag-2 .nv-frag-tag", { opacity: 1, duration: 0.03 }, 0.165);

      tl.to(".nv-frag-3 .nv-frag-chaos", { opacity: 1, duration: 0.03 }, 0.22);
      tl.to(".nv-frag-3 .nv-frag-halo", { opacity: 0.95, duration: 0.03 }, 0.22);
      tl.to(".nv-frag-3 .nv-frag-tick", { opacity: 0.85, duration: 0.03 }, 0.22);
      tl.to(".nv-frag-3 .nv-frag-tag", { opacity: 1, duration: 0.03 }, 0.22);

      // Al cerrar el trazo, el ruido periférico baja — ya vimos el patrón
      tl.to(".nv-annos", { opacity: 0.45, duration: 0.08 }, 0.2);
      tl.to(".nv-deadends", { opacity: 0.35, duration: 0.08 }, 0.2);

      /* ——— 0.26–0.46 ENTENDER: criterios con peso editorial ——— */
      copySwap(tl, ".nv-beat-observe", ".nv-beat-understand", 0.26);

      tl.to(".nv-need", { opacity: 0, duration: 0.08 }, 0.26);
      tl.to(".nv-atmosphere", { opacity: 0, duration: 0.08 }, 0.26);
      tl.to(".nv-annos", { opacity: 0, duration: 0.06 }, 0.26);
      tl.to(".nv-deadends", { opacity: 0, duration: 0.06 }, 0.26);
      tl.to(".nv-think", { opacity: 0, duration: 0.1 }, 0.28);
      tl.to(".nv-think-glow", { opacity: 0, duration: 0.08 }, 0.28);
      tl.to(pulse, { autoAlpha: 0, duration: 0.08 }, 0.28);
      tl.to(".nv-pulse-ring", { opacity: 0, duration: 0.06 }, 0.28);
      tl.to(".nv-frag-tag", { opacity: 0, duration: 0.06 }, 0.3);
      tl.to(".nv-frag-tick", { opacity: 0, duration: 0.06 }, 0.3);
      tl.to(".nv-frag-halo", { opacity: 0, duration: 0.08 }, 0.3);
      tl.to(".nv-frag-3", { opacity: 0, duration: 0.08 }, 0.28);

      // Tres columnas alineadas
      tl.to(".nv-frag-0", { x: -10, y: 35, duration: 0.14 }, 0.28);
      tl.to(".nv-frag-1", { x: -20, y: 115, duration: 0.14 }, 0.28);
      tl.to(".nv-frag-2", { x: 10, y: -50, duration: 0.14 }, 0.28);

      tl.to(".nv-frag-0 .nv-frag-chaos", { opacity: 0, duration: 0.06 }, 0.34);
      tl.to(".nv-frag-1 .nv-frag-chaos", { opacity: 0, duration: 0.06 }, 0.35);
      tl.to(".nv-frag-2 .nv-frag-chaos", { opacity: 0, duration: 0.06 }, 0.36);

      tl.to(".nv-frag-0 .nv-frag-axis", { opacity: 1, duration: 0.08 }, 0.35);
      tl.to(".nv-frag-1 .nv-frag-axis", { opacity: 1, duration: 0.08 }, 0.37);
      tl.to(".nv-frag-2 .nv-frag-axis", { opacity: 1, duration: 0.08 }, 0.39);

      tl.to(".nv-frag-dot", { attr: { r: 4 }, fillOpacity: 1, duration: 0.08 }, 0.36);

      tl.to(".nv-axis-stage", { opacity: 1, duration: 0.08 }, 0.38);
      tl.to(".nv-axis-spine", { attr: { "stroke-dashoffset": 0 }, duration: 0.12 }, 0.4);

      /* ——— 0.46–0.54 HANDOFF limpio ——— */
      copySwap(tl, ".nv-beat-understand", ".nv-beat-structure", 0.46);

      tl.to(".nv-frag", { opacity: 0, duration: 0.08 }, 0.46);
      tl.to(".nv-axis-stage", { opacity: 0, duration: 0.08 }, 0.46);

      /* ——— 0.54–0.66 ESTRUCTURAR: arquitectura abierta ——— */
      tl.to(".nv-sys-head", { opacity: 1, duration: 0.08 }, 0.54);
      tl.fromTo(".nv-sys-pedidos", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.08 }, 0.55);
      tl.fromTo(".nv-sys-clientes", { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.07 }, 0.58);
      tl.fromTo(".nv-sys-pagos", { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: 0.07 }, 0.6);
      tl.fromTo(".nv-sys-operacion", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.07 }, 0.625);
      tl.fromTo(".nv-sys-reportes", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.07 }, 0.645);

      tl.to(".nv-sys-links", { opacity: 1, duration: 0.06 }, 0.59);
      tl.to(".nv-sys-links .nv-draw", { attr: { "stroke-dashoffset": 0 }, duration: 0.1, stagger: 0.02 }, 0.59);

      /* ——— 0.66–0.82 CONSTRUIR: satélites se van, hub crece (sin zoom que recorta) ——— */
      copySwap(tl, ".nv-beat-structure", ".nv-beat-build", 0.66);

      tl.to(".nv-sys-head", { opacity: 0, duration: 0.08 }, 0.68);
      tl.to(".nv-sys-links", { opacity: 0, duration: 0.08 }, 0.68);
      tl.to(".nv-sys-clientes", { opacity: 0, x: -40, duration: 0.1 }, 0.68);
      tl.to(".nv-sys-pagos", { opacity: 0, x: 40, duration: 0.1 }, 0.68);
      tl.to(".nv-sys-operacion", { opacity: 0, y: 36, duration: 0.1 }, 0.69);
      tl.to(".nv-sys-reportes", { opacity: 0, y: 36, duration: 0.1 }, 0.69);

      // El módulo crece en el espacio abierto — no hay placa que lo corte
      tl.to(".nv-hot-frame", { attr: { height: 290, width: 300, x: 320 }, duration: 0.12 }, 0.7);
      tl.to(".nv-hot-chrome", { attr: { width: 300, x: 320 }, duration: 0.12 }, 0.7);
      tl.to(".nv-wire", { opacity: 1, duration: 0.1 }, 0.74);
      tl.to(".nv-sys-pedidos", { x: isMobile ? 0 : 20, y: isMobile ? -10 : -24, duration: 0.12 }, 0.7);
      // Hold
      tl.to(".nv-wire", { opacity: 1, duration: 0.06 }, 0.8);

      /* ——— 0.82–0.92 PRODUCTO ——— */
      copySwap(tl, ".nv-beat-build", ".nv-beat-product", 0.82);

      tl.to(".nv-sys-pedidos", { opacity: 0, duration: 0.08 }, 0.82);
      tl.to(".nv-camera", { opacity: 0, duration: 0.08 }, 0.82);

      tl.fromTo(
        ".nv-product",
        { autoAlpha: 0, scale: 0.92, y: 24 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.1,
          transformOrigin: "50% 45%",
        },
        0.84
      );
      // Hold del producto
      tl.to(".nv-product", { autoAlpha: 1, duration: 0.06 }, 0.9);

      /* ——— 0.92–1.0 LOGO: forge + hold hasta el unpin ——— */
      tl.to(".nv-product", { autoAlpha: 0, scale: 0.97, y: -12, duration: 0.05 }, 0.92);
      tl.to(".nv-beat-product", { autoAlpha: 0, duration: 0.05 }, 0.92);

      tl.to(".nv-logo-forge", { autoAlpha: 1, duration: 0.04 }, 0.93);
      tl.fromTo(
        ".nv-logo-bar-0",
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.03 },
        0.935
      );
      tl.fromTo(
        ".nv-logo-bar-1",
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.03 },
        0.95
      );
      tl.fromTo(
        ".nv-logo-bar-2",
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.03 },
        0.962
      );
      tl.fromTo(
        ".nv-logo-word",
        { autoAlpha: 0, y: 6 },
        { autoAlpha: 1, y: 0, duration: 0.035 },
        0.972
      );

      // Se queda hasta el final: al soltar el pin entra Capabilities, sin hueco negro
      tl.to(".nv-logo-forge", { autoAlpha: 1, y: 0, duration: 0.02 }, 1);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, stage);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  const vh = isMobile ? SCROLL_VH.mobile : SCROLL_VH.desktop;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050505]"
      style={{ height: reducedMotion ? "auto" : `${vh * 100}vh` }}
      aria-label="De un problema a un producto"
    >
      <div
        ref={stageRef}
        className={cn(
          "relative w-full overflow-hidden",
          reducedMotion ? "min-h-[100svh]" : "h-[100svh]"
        )}
      >
        <div className="flex h-full w-full flex-col lg:flex-row">
          <div className="relative z-20 flex w-full shrink-0 items-center overflow-hidden px-5 py-14 sm:px-8 lg:w-[40%] lg:px-10 lg:py-0 xl:w-[42%] xl:px-14">
            <div className="relative w-full max-w-xl">
              {BEATS.map((beat) => (
                <div
                  key={beat.id}
                  className={cn(
                    "nv-beat",
                    `nv-beat-${beat.id}`,
                    beat.id === "hero" ? "relative" : "absolute inset-x-0 top-1/2 -translate-y-1/2"
                  )}
                  style={beat.id === "hero" ? undefined : { visibility: "hidden", opacity: 0 }}
                >
                  <h2
                    className={cn(
                      "font-display font-medium tracking-[-0.045em] text-white",
                      "text-[2.35rem] leading-[1.05] sm:text-[2.85rem] lg:text-[3.35rem] xl:text-[3.6rem]"
                    )}
                  >
                    {beat.title}
                  </h2>
                  {"body" in beat && beat.body ? (
                    <p className="mt-7 max-w-[28rem] text-[16px] leading-[1.65] text-white/55 sm:text-[17px] sm:leading-[1.7]">
                      {beat.body}
                    </p>
                  ) : null}
                  {"cta" in beat && beat.cta ? (
                    <div className="mt-10 flex flex-wrap items-baseline gap-x-10 gap-y-3">
                      <a
                        href="#servicios"
                        className="pointer-events-auto text-[15px] text-white transition-opacity hover:opacity-70"
                      >
                        Qué hacemos
                      </a>
                      <a
                        href="#contacto"
                        className="pointer-events-auto text-[14px] text-white/45 transition-colors hover:text-white/75"
                      >
                        Hablemos →
                      </a>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 min-h-[44vh] flex-1 lg:min-h-0">
            <div className="absolute inset-0 overflow-visible">
              <NarrativeWorld />
              <NarrativeProduct />
            </div>
          </div>
        </div>

        {/* Logo forjado al centro — cierre de la secuencia */}
        <div
          className="nv-logo-forge pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
          style={{ visibility: "hidden", opacity: 0 }}
          aria-hidden
        >
          <div className="flex items-center gap-3.5">
            <svg
              viewBox={MARK_VIEWBOX}
              className="size-11 text-white sm:size-12"
              fill="none"
              aria-hidden
            >
              <path className="nv-logo-bar-0" d={LOGO_BARS[0]} fill="currentColor" />
              <path className="nv-logo-bar-1" d={LOGO_BARS[1]} fill="currentColor" />
              <path className="nv-logo-bar-2" d={LOGO_BARS[2]} fill={MARK_PURPLE} />
            </svg>
            <span className="nv-logo-word font-display text-[1.35rem] font-medium tracking-[-0.04em] text-white sm:text-[1.5rem]">
              Metrik
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
