"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

import { ProcessNetwork } from "@/components/hero/process-network";
import { Container } from "@/components/ui/container";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui/metrik-button";
import { SectionLabel } from "@/components/ui/section-label";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { easeOutExpo } from "@/lib/easing";

function Reveal({
  children,
  delay = 0,
  reducedMotion,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  reducedMotion: boolean;
  className?: string;
}) {
  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.75, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [networkProgress, setNetworkProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  const progress = useTransform(scrollYProgress, [0, 0.55], [0, 1]);

  useMotionValueEvent(progress, "change", (latest) => {
    setNetworkProgress(latest);
  });

  useEffect(() => {
    if (reducedMotion) setNetworkProgress(1);
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center pt-28 pb-16 md:pt-32 md:pb-24"
      aria-labelledby="hero-title"
    >
      <Container className="grid w-full items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 xl:gap-20">
        <motion.div
          style={
            reducedMotion ? undefined : { y: contentY, opacity: contentOpacity }
          }
          className="max-w-[36rem]"
        >
          <Reveal reducedMotion={reducedMotion} delay={0.05}>
            <SectionLabel className="mb-7 md:mb-8">
              Ingeniería de sistemas
            </SectionLabel>
          </Reveal>

          <h1
            id="hero-title"
            className="text-[2.35rem] leading-[1.05] font-medium tracking-[-0.045em] sm:text-5xl md:text-[3.5rem] lg:text-[4.1rem]"
          >
            <Reveal reducedMotion={reducedMotion} delay={0.16}>
              <span className="block text-foreground">
                Tu empresa ya tiene{" "}
                <span className="text-[#C8C8C8]">procesos</span>.
              </span>
            </Reveal>
            <Reveal
              reducedMotion={reducedMotion}
              delay={0.28}
              className="mt-3 block"
            >
              <span className="block text-[#D4D4D4]">
                Nosotros construimos los{" "}
                <span className="text-accent">sistemas</span> que los hacen{" "}
                <span className="text-foreground">mejores</span>.
              </span>
            </Reveal>
          </h1>

          <Reveal reducedMotion={reducedMotion} delay={0.4}>
            <p className="mt-7 max-w-[28rem] text-[15px] leading-relaxed text-muted-foreground md:mt-8 md:text-base">
              Conectamos herramientas, automatizamos operaciones y damos
              visibilidad real a tu negocio — con ingeniería clara y sin
              complejidad innecesaria.
            </p>
          </Reveal>

          <Reveal reducedMotion={reducedMotion} delay={0.52}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PrimaryButton href="#contacto">Agendar una llamada</PrimaryButton>
              <SecondaryButton href="#proceso">Ver proceso</SecondaryButton>
            </div>
          </Reveal>
        </motion.div>

        <Reveal
          reducedMotion={reducedMotion}
          delay={0.62}
          className="w-full lg:justify-self-end"
        >
          <ProcessNetwork scrollProgress={networkProgress} />
        </Reveal>
      </Container>
    </section>
  );
}
