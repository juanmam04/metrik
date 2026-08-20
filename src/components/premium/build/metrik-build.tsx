"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  BuildPlaneGrid,
  BuildPlaneLine,
  BuildPlaneModules,
  BuildPlaneStructure,
} from "@/components/premium/build/build-world";
import { BuildProduct } from "@/components/premium/build/build-product";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const SCROLL_VH = { desktop: 8.8, mobile: 6.4 };

export function MetrikBuild() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    if (reducedMotion) {
      gsap.set(stage.querySelector(".mb-product"), { opacity: 0 });
      gsap.set(stage.querySelector(".mb-copy-end"), { opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const draws = Array.from(stage.querySelectorAll(".mb-draw")) as SVGGeometryElement[];
      draws.forEach((node) => {
        if (typeof node.getTotalLength !== "function") return;
        const length = node.getTotalLength();
        gsap.set(node, { strokeDasharray: length, strokeDashoffset: length });
      });

      const line = stage.querySelector("#mb-line") as SVGGeometryElement | null;
      if (line && typeof line.getTotalLength === "function") {
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length * 0.52,
        });
      }

      gsap.set(".mb-pulse", { opacity: 0 });
      gsap.set(".mb-node-b, .mb-node-c", { opacity: 0 });
      gsap.set(".mb-sw-inn, .mb-web-inn, .mb-pr-inn", { opacity: 0.18 });
      gsap.set(".mb-node-ring", { stroke: "rgba(81,60,250,0)", attr: { r: 7 } });
      gsap.set(".mb-product", { opacity: 0, xPercent: -50, yPercent: -50, y: 24 });
      gsap.set(".mb-copy-end", { opacity: 0, y: 16 });
      gsap.set(".mb-camera", { rotateX: 3, rotateY: -5, z: 0, scale: 1, x: 0, y: 0 });
      gsap.set(".mb-p1", { z: -80 });
      gsap.set(".mb-p2", { z: -36 });
      gsap.set(".mb-p3", { z: 0 });
      gsap.set(".mb-p4", { z: 40 });

      const depth = isMobile ? 0.4 : 1;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin: stage,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(".mb-p1", { y: 36 * depth, duration: 1 }, 0);
      tl.to(".mb-p2", { y: 14 * depth, duration: 1 }, 0);
      tl.to(".mb-p3", { y: -8 * depth, duration: 1 }, 0);
      tl.to(".mb-p4", { y: -18 * depth, duration: 1 }, 0);

      tl.to("#mb-line", { strokeDashoffset: 0, duration: 0.08 }, 0);
      tl.to(".mb-node-ring", { stroke: "rgba(81,60,250,0.75)", attr: { r: 11 }, duration: 0.02 }, 0.03);
      tl.to(".mb-pulse", { opacity: 1, duration: 0.02 }, 0.03);
      tl.to(".mb-cause-1", { strokeDashoffset: 0, duration: 0.03 }, 0.04);
      tl.to(".mb-sw-inn", { opacity: 1, duration: 0.04 }, 0.05);

      tl.to(
        ".mb-pulse",
        {
          duration: 0.16,
          motionPath: {
            path: "#mb-line",
            align: "#mb-line",
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
            start: 0.2,
            end: 1,
          },
        },
        0.02
      );

      tl.to(".mb-node-b", { opacity: 1, duration: 0.02 }, 0.09);
      tl.to(".mb-cause-2", { strokeDashoffset: 0, duration: 0.03 }, 0.1);
      tl.to(".mb-web-inn", { opacity: 1, duration: 0.04 }, 0.11);
      tl.to(".mb-node-c", { opacity: 1, duration: 0.02 }, 0.15);
      tl.to(".mb-cause-3", { strokeDashoffset: 0, duration: 0.03 }, 0.16);
      tl.to(".mb-pr-inn", { opacity: 1, duration: 0.05 }, 0.17);
      tl.to(draws, { strokeDashoffset: 0, duration: 0.08 }, 0.1);
      tl.to(".mb-copy-hero", { opacity: 0.5, duration: 0.08 }, 0.14);

      tl.to(
        ".mb-camera",
        {
          scale: isMobile ? 1.55 : 2.1,
          x: isMobile ? 80 : 210,
          y: isMobile ? -8 : -16,
          rotateY: -7 * depth,
          rotateX: 5 * depth,
          duration: 0.1,
        },
        0.22
      );
      tl.to(".mb-copy-hero", { opacity: 0.08, duration: 0.08 }, 0.24);

      tl.to(
        ".mb-camera",
        {
          scale: 0.94,
          x: 48,
          y: 4,
          rotateY: -10 * depth,
          rotateX: 6 * depth,
          duration: 0.08,
        },
        0.32
      );
      tl.to(".mb-copy-hero", { opacity: 0, duration: 0.06 }, 0.34);

      tl.to(".mb-p2, .mb-p3, .mb-p4", { opacity: 0.12, duration: 0.06 }, 0.38);
      tl.to(".mb-product", { opacity: 1, y: 0, duration: 0.1 }, 0.42);
      tl.to(".mb-p2, .mb-p3, .mb-p4", { opacity: 0, duration: 0.06 }, 0.48);

      tl.to(
        ".mb-camera",
        { rotateY: -6 * depth, rotateX: 3 * depth, scale: 1.05, duration: 0.1 },
        0.72
      );
      tl.to(".mb-camera", { rotateY: 0, rotateX: 0, scale: 1.08, x: 0, y: -10, duration: 0.1 }, 0.82);
      tl.to(".mb-p1", { opacity: 0, duration: 0.06 }, 0.84);
      tl.to(".mb-pulse", { opacity: 0, duration: 0.04 }, 0.84);

      tl.to(".mb-product", { y: -40, opacity: 0.18, duration: 0.05 }, 0.9);
      tl.to(".mb-copy-end", { opacity: 1, y: 0, duration: 0.05 }, 0.92);
      tl.to(".mb-product", { y: -88, opacity: 0, duration: 0.05 }, 0.95);
    }, stage);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  const vh = isMobile ? SCROLL_VH.mobile : SCROLL_VH.desktop;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050505]"
      style={{ height: reducedMotion ? "auto" : `${vh * 100}vh` }}
      aria-label="Construcción Metrik"
    >
      <div
        ref={stageRef}
        className={cn(
          "relative w-full overflow-hidden",
          reducedMotion ? "min-h-[100svh]" : "h-[100svh]"
        )}
      >
        <div
          className="absolute inset-0"
          style={{ perspective: isMobile ? "900px" : "1600px" }}
        >
          <div
            className="mb-camera absolute will-change-transform"
            style={{
              transformStyle: "preserve-3d",
              width: "142%",
              height: "142%",
              left: "-18%",
              top: "-16%",
            }}
          >
            <div className="mb-p1 absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
              <BuildPlaneGrid />
            </div>
            <div className="mb-p2 absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
              <BuildPlaneStructure />
            </div>
            <div className="mb-p3 absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
              <BuildPlaneModules />
            </div>
            <div className="mb-p4 absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
              <BuildPlaneLine />
            </div>
            <BuildProduct />
          </div>
        </div>

        <div className="mb-copy-hero pointer-events-none relative z-20 flex min-h-[100svh] flex-col justify-center px-5 pt-16 sm:px-8 lg:px-14">
          <div className="max-w-[min(100%,36rem)] lg:max-w-[min(52vw,38rem)]">
            <h1 className="font-display text-[2.6rem] leading-[0.96] font-medium tracking-[-0.058em] text-white sm:text-5xl lg:text-[4.35rem]">
              Software que empieza
              <br />
              por entender el{" "}
              <span className="text-white/55">problema.</span>
            </h1>
            <p className="mt-8 max-w-[22rem] text-[15px] leading-[1.7] tracking-[-0.012em] text-white/45 sm:max-w-[26rem]">
              Diseñamos y construimos software, productos digitales y webs alrededor de lo que realmente necesitás.
            </p>
            <div className="pointer-events-auto mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3">
              <a
                href="#servicios"
                className="text-[14px] tracking-[-0.02em] text-white underline-offset-[6px] transition-opacity hover:opacity-70"
              >
                Qué hacemos
              </a>
              <a
                href="#contacto"
                className="text-[13px] tracking-[-0.01em] text-white/40 transition-colors hover:text-white/70"
              >
                Hablemos →
              </a>
            </div>
          </div>
        </div>

        <div className="mb-copy-end pointer-events-none absolute inset-0 z-30 flex flex-col items-start justify-center px-5 sm:px-8 lg:px-14">
          <p className="font-display text-[1.85rem] leading-[1.08] tracking-[-0.045em] sm:text-4xl lg:text-[2.75rem]">
            Pensar antes de construir.
          </p>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/42">
            De una necesidad
            <br />
            a un producto que funciona.
          </p>
        </div>
      </div>
    </section>
  );
}
