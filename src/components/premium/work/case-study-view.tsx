"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { PremiumFooter } from "@/components/premium/layout/premium-footer";
import { PremiumNav } from "@/components/premium/layout/premium-nav";
import { SiteAtmosphere } from "@/components/background/site-atmosphere";
import { Container } from "@/components/ui/container";
import { PrimaryButton } from "@/components/ui/metrik-button";
import type { Project } from "@/data/projects";
import { CAMERA_FRAMES } from "@/data/sequence-frames";
import { easeOutExpo } from "@/lib/easing";

type CaseStudyViewProps = {
  project: Project;
};

export function CaseStudyView({ project }: CaseStudyViewProps) {
  const hero = project.image ?? CAMERA_FRAMES.chaos.src;

  return (
    <>
      <SiteAtmosphere />
      <PremiumNav />
      <main className="pt-24">
        <Container className="py-16 md:py-24">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-sm"
          >
            ← Trabajo
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="mt-8 max-w-3xl"
          >
            <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
              {project.year}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.06] font-medium tracking-[-0.04em] md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-3 text-xl text-muted-foreground tracking-[-0.02em]">
              {project.line}
            </p>
          </motion.div>
        </Container>

        <div className="relative aspect-[16/10] w-full bg-[#071018] md:aspect-auto">
          <Image
            src={hero}
            alt={project.title}
            width={1024}
            height={665}
            className="mx-auto h-auto w-full max-w-6xl"
            sizes="100vw"
            priority
          />
        </div>

        <Container className="space-y-16 py-16 md:py-24">
          {project.context ? (
            <p className="max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
              {project.context}
            </p>
          ) : null}

          {project.problem ? (
            <section>
              <h2 className="font-display text-2xl font-medium tracking-[-0.03em]">
                Problema
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                {project.problem}
              </p>
            </section>
          ) : null}

          {project.approach ? (
            <section>
              <h2 className="font-display text-2xl font-medium tracking-[-0.03em]">
                Enfoque
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                {project.approach}
              </p>
            </section>
          ) : null}

          <section className="rounded-xl border border-border bg-surface/40 p-8 text-center md:p-12">
            <h2 className="font-display text-2xl font-medium tracking-[-0.03em] md:text-3xl">
              Construí lo que realmente necesitás.
            </h2>
            <PrimaryButton href="/#contacto" className="mt-8">
              Contacto
            </PrimaryButton>
          </section>
        </Container>
      </main>
      <PremiumFooter />
    </>
  );
}
