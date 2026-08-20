"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { NarrativeProduct } from "@/components/premium/narrative/narrative-product";
import { NarrativeWorld } from "@/components/premium/narrative/narrative-world";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const SCROLL_VH = { desktop: 7, mobile: 5.4 };

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
    id: "understand",
    title: (
      <>
        Antes de escribir código,
        <br />
        entendemos qué tiene que funcionar.
      </>
    ),
    body: "El producto empieza mucho antes de la primera pantalla.",
  },
  {
    id: "arch",
    title: (
      <>
        Cada decisión
        <br />
        afecta al producto entero.
      </>
    ),
    body: "Estructura clara. Un sistema que se sostiene.",
  },
  {
    id: "decision",
    title: (
      <>
        No diseñamos pantallas aisladas.
        <br />
        Pensamos sistemas.
      </>
    ),
    body: "Una decisión conecta el resto.",
  },
  {
    id: "interface",
    title: (
      <>
        La interfaz aparece
        <br />
        cuando el sistema ya está claro.
      </>
    ),
    body: "Primero la lógica. Después la pantalla.",
  },
  {
    id: "product",
    title: (
      <>
        No construimos pantallas.
        <br />
        Construimos herramientas.
      </>
    ),
    body: "Una operación. Un sistema. Todo conectado.",
  },
] as const;

function prepDraws(root: HTMLElement) {
  root.querySelectorAll<SVGGeometryElement>(".nv-draw").forEach((node) => {
    if (typeof node.getTotalLength !== "function") return;
    const len = node.getTotalLength();
    if (!len || !Number.isFinite(len)) return;
    // Atributos SVG (no px de CSS) para que el trazo empiece oculto
    node.setAttribute("stroke-dasharray", `${len}`);
    node.setAttribute("stroke-dashoffset", `${len}`);
    gsap.set(node, { attr: { "stroke-dashoffset": len } });
  });
}

/** Corta una capa y recién después muestra la siguiente. Sin crossfade. */
function hardCut(
  tl: gsap.core.Timeline,
  leave: string,
  enter: string | null,
  at: number,
  dur = 0.03
) {
  tl.to(leave, { autoAlpha: 0, duration: dur }, at);
  if (enter) {
    tl.to(enter, { autoAlpha: 1, duration: dur }, at + dur + 0.01);
  }
}

/** Una sola capa visible. Copy único. Sin apilar. */
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
      gsap.set(
        stage.querySelectorAll(
          ".nv-act-b, .nv-act-c, .nv-act-d, .nv-act-e, .nv-product, .nv-beat:not(.nv-beat-hero)"
        ),
        { autoAlpha: 0 }
      );
      gsap.set(stage.querySelector(".nv-act-a"), { autoAlpha: 1 });
      gsap.set(stage.querySelector(".nv-beat-hero"), { autoAlpha: 1 });
      const line = stage.querySelector<SVGGeometryElement>("#nv-line");
      if (line && typeof line.getTotalLength === "function") {
        gsap.set(line, { attr: { "stroke-dashoffset": 0 } });
      }
      return;
    }

    const ctx = gsap.context(() => {
      prepDraws(stage);

      const line = stage.querySelector<SVGPathElement>("#nv-line");
      const pulse = stage.querySelector<SVGCircleElement>(".nv-pulse");
      const lineLen = line && typeof line.getTotalLength === "function" ? line.getTotalLength() : 0;

      gsap.set(".nv-act-a", { autoAlpha: 1 });
      gsap.set(".nv-act-b, .nv-act-c, .nv-act-d, .nv-act-e", { autoAlpha: 0 });
      gsap.set(".nv-step", { autoAlpha: 0, y: 18 });
      gsap.set(".nv-row", { autoAlpha: 0, y: 10 });
      gsap.set(".nv-panel", { autoAlpha: 0, y: 14 });
      gsap.set(".nv-product", { autoAlpha: 0, y: 16 });
      gsap.set(".nv-beat", { autoAlpha: 0 });
      gsap.set(".nv-beat-hero", { autoAlpha: 1 });

      // Reset pelota: sin transforms viejos del HMR / path anterior
      if (pulse) {
        gsap.set(pulse, {
          autoAlpha: 0,
          clearProps: "transform",
          x: 0,
          y: 0,
          xPercent: 0,
          yPercent: 0,
        });
      }

      if (line && lineLen > 0) {
        line.setAttribute("stroke-dasharray", `${lineLen}`);
        line.setAttribute("stroke-dashoffset", `${lineLen}`);
        gsap.set(line, { attr: { "stroke-dasharray": lineLen, "stroke-dashoffset": lineLen } });
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

      /* —— A: traza la línea actual + pelota sobre ESA misma curva —— */
      if (line && lineLen > 0) {
        tl.fromTo(
          line,
          { attr: { "stroke-dashoffset": lineLen } },
          { attr: { "stroke-dashoffset": 0 }, duration: 0.26 },
          0
        );
      }

      if (pulse && line && lineLen > 0) {
        // Mover por geometría real del path (no MotionPath/CSS — evita path viejo / HMR)
        const traveler = { p: 0 };
        const placePulse = () => {
          const pt = line.getPointAtLength(traveler.p * lineLen);
          pulse.setAttribute("cx", String(pt.x));
          pulse.setAttribute("cy", String(pt.y));
        };
        placePulse();
        tl.to(pulse, { autoAlpha: 1, duration: 0.02 }, 0.01);
        tl.to(
          traveler,
          {
            p: 1,
            duration: 0.26,
            onUpdate: placePulse,
          },
          0
        );
      }

      /* —— A → B —— */
      hardCut(tl, ".nv-beat-hero", ".nv-beat-understand", 0.28);
      hardCut(tl, ".nv-act-a", ".nv-act-b", 0.28);
      tl.to(".nv-act-b .nv-draw", { attr: { "stroke-dashoffset": 0 }, duration: 0.08, stagger: 0.01 }, 0.33);

      /* —— B → C —— */
      hardCut(tl, ".nv-beat-understand", ".nv-beat-arch", 0.42);
      hardCut(tl, ".nv-act-b", ".nv-act-c", 0.42);
      tl.to(".nv-step-0", { autoAlpha: 1, y: 0, duration: 0.035 }, 0.47);
      tl.to(".nv-step-1", { autoAlpha: 1, y: 0, duration: 0.035 }, 0.5);
      tl.to(".nv-step-2", { autoAlpha: 1, y: 0, duration: 0.035 }, 0.53);
      tl.to(".nv-step-3", { autoAlpha: 1, y: 0, duration: 0.035 }, 0.56);
      tl.to(".nv-step-4", { autoAlpha: 1, y: 0, duration: 0.035 }, 0.59);
      tl.to(".nv-act-c .nv-draw", { attr: { "stroke-dashoffset": 0 }, duration: 0.07 }, 0.5);

      /* —— C → D —— */
      hardCut(tl, ".nv-beat-arch", ".nv-beat-decision", 0.62);
      hardCut(tl, ".nv-act-c", ".nv-act-d", 0.62);
      tl.to(".nv-row", { autoAlpha: 1, y: 0, duration: 0.07, stagger: 0.012 }, 0.67);

      /* —— D → E —— */
      hardCut(tl, ".nv-beat-decision", ".nv-beat-interface", 0.76);
      hardCut(tl, ".nv-act-d", ".nv-act-e", 0.76);
      tl.to(".nv-act-e .nv-draw", { attr: { "stroke-dashoffset": 0 }, duration: 0.07 }, 0.81);
      tl.to(".nv-panel-0", { autoAlpha: 1, y: 0, duration: 0.035 }, 0.82);
      tl.to(".nv-panel-1", { autoAlpha: 1, y: 0, duration: 0.035 }, 0.84);
      tl.to(".nv-panel-2", { autoAlpha: 1, y: 0, duration: 0.035 }, 0.86);
      tl.to(".nv-panel-3", { autoAlpha: 1, y: 0, duration: 0.035 }, 0.88);
      tl.to(".nv-panel-4", { autoAlpha: 1, y: 0, duration: 0.035 }, 0.9);

      /* —— E → producto —— */
      hardCut(tl, ".nv-beat-interface", ".nv-beat-product", 0.92);
      hardCut(tl, ".nv-act-e", null, 0.92);
      tl.to(".nv-product", { autoAlpha: 1, y: 0, duration: 0.04 }, 0.96);

      tl.to(".nv-beat-product", { autoAlpha: 0, duration: 0.025 }, 0.985);
      tl.to(".nv-product", { autoAlpha: 0, y: -12, duration: 0.025 }, 0.99);

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
          <div className="relative z-20 flex w-full shrink-0 items-center overflow-hidden px-5 py-14 sm:px-8 lg:w-[46%] lg:px-12 lg:py-0 xl:w-[48%] xl:px-16">
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

          <div className="relative z-10 min-h-[42vh] flex-1 overflow-hidden lg:min-h-0">
            <div className="absolute inset-0 opacity-90">
              <NarrativeWorld />
              <NarrativeProduct />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
