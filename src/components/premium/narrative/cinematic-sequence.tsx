"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { CAMERA_FRAMES, SCENE_SCROLL } from "@/data/sequence-frames";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

import {
  NarrativeProgressProvider,
  smoothstep,
  useNarrativeProgress,
} from "./narrative-progress";
import { MetrikReveal, ProductStage } from "./product-stage";

gsap.registerPlugin(ScrollTrigger);

function CameraLayer() {
  const progress = useNarrativeProgress();

  const zoom = 1 + smoothstep(0.02, 0.36, progress) * 1.55;
  const panX = smoothstep(0.02, 0.36, progress) * 8;
  const panY = smoothstep(0.02, 0.36, progress) * 4;

  const closer = smoothstep(0.22, 0.38, progress);
  const paper = smoothstep(0.36, 0.52, progress);
  const digital = smoothstep(0.5, 0.64, progress);
  const productHidesPhoto = 1 - smoothstep(0.62, 0.72, progress);

  const copyOut = 1 - smoothstep(0.04, 0.16, progress);
  const line = smoothstep(0.32, 0.4, progress) * (1 - smoothstep(0.48, 0.56, progress));

  return (
    <>
      <div className="absolute inset-0 overflow-hidden bg-black">
        <div
          className="absolute inset-[-12%] will-change-transform"
          style={{
            transform: `translate(${panX}%, ${panY}%) scale(${zoom})`,
            transformOrigin: "72% 62%",
            opacity: productHidesPhoto,
          }}
        >
          <Image
            src={CAMERA_FRAMES.chaos.src}
            alt={CAMERA_FRAMES.chaos.alt}
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-[58%_48%]"
          />
          <div
            className="absolute inset-0"
            style={{ opacity: closer }}
          >
            <Image
              src={CAMERA_FRAMES.closer.src}
              alt=""
              fill
              sizes="100vw"
              quality={90}
              className="object-cover object-[70%_55%]"
            />
          </div>
          <div className="absolute inset-0" style={{ opacity: paper }}>
            <Image
              src={CAMERA_FRAMES.paper.src}
              alt=""
              fill
              sizes="100vw"
              quality={90}
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0" style={{ opacity: digital }}>
            <Image
              src={CAMERA_FRAMES.digital.src}
              alt=""
              fill
              sizes="100vw"
              quality={90}
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to right, rgba(5,5,5,${0.82 * copyOut}) 0%, rgba(5,5,5,${0.35 * copyOut}) 36%, transparent 62%)`,
        }}
      />

      <div
        className="absolute top-[max(5rem,13vh)] left-5 z-20 max-w-md sm:left-8 md:left-12"
        style={{ opacity: copyOut }}
      >
        <h1 className="font-display text-[2.6rem] leading-[1.02] font-medium tracking-[-0.05em] sm:text-5xl md:text-[3.5rem]">
          Metrik
        </h1>
        <p className="mt-5 text-[15px] leading-relaxed text-foreground/90 md:text-base">
          Software, productos digitales y webs.
        </p>
        <p className="mt-2 text-sm text-foreground/55">
          Construimos alrededor de lo que realmente hace falta.
        </p>
      </div>

      <p
        className="pointer-events-none absolute inset-x-0 bottom-[18%] z-20 text-center text-[15px] tracking-[-0.02em] text-foreground/80 md:text-lg"
        style={{ opacity: line }}
        aria-hidden
      >
        Antes de construir, entendemos.
      </p>
    </>
  );
}

function CinematicPinned() {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const wrapper = wrapperRef.current;
    const pin = pinRef.current;
    if (!wrapper || !pin) return;

    const length =
      (isMobile ? SCENE_SCROLL.mobile : SCENE_SCROLL.desktop) *
      window.innerHeight;

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: `+=${length}`,
      pin,
      scrub: 0.55,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => setProgress(self.progress),
    });

    document.documentElement.style.setProperty(
      "--nav-cinematic",
      "1"
    );

    return () => {
      trigger.kill();
      document.documentElement.style.removeProperty("--nav-cinematic");
    };
  }, [reducedMotion, isMobile]);

  const minHeight = useMemo(
    () =>
      reducedMotion
        ? "auto"
        : `${(isMobile ? SCENE_SCROLL.mobile : SCENE_SCROLL.desktop) * 100}vh`,
    [reducedMotion, isMobile]
  );

  if (reducedMotion) {
    return (
      <section className="relative">
        <div className="relative h-[100svh] w-full">
          <Image
            src={CAMERA_FRAMES.chaos.src}
            alt={CAMERA_FRAMES.chaos.alt}
            fill
            priority
            className="object-cover object-[58%_48%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute top-[max(5rem,13vh)] left-5 max-w-md sm:left-8">
            <h1 className="font-display text-4xl font-medium tracking-[-0.04em]">
              Metrik
            </h1>
            <p className="mt-4 text-foreground/85">
              Software, productos digitales y webs.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <NarrativeProgressProvider progress={progress}>
      <section
        ref={wrapperRef}
        className="relative"
        aria-label="Experiencia Metrik"
        style={{ minHeight }}
      >
        <div
          ref={pinRef}
          className={cn("relative h-[100svh] w-full overflow-hidden bg-black")}
        >
          <CameraLayer />
          <ProductStage />
          <MetrikReveal />
        </div>
      </section>
    </NarrativeProgressProvider>
  );
}

export function CinematicSequence() {
  return <CinematicPinned />;
}
