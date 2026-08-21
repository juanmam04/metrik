"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { PremiumFooter } from "@/components/premium/layout/premium-footer";
import { PremiumNav } from "@/components/premium/layout/premium-nav";
import { Container } from "@/components/ui/container";
import { PrimaryButton, SecondaryButton } from "@/components/ui/metrik-button";
import type { Project } from "@/data/projects";
import { easeOutExpo } from "@/lib/easing";

type CaseStudyViewProps = {
  project: Project;
};

export function CaseStudyView({ project }: CaseStudyViewProps) {
  return (
    <>
      <PremiumNav />
      <main className="pt-24">
        <Container className="py-16 md:py-24">
          <Link
            href="/#trabajo"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-sm"
          >
            ← Trabajo
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="mt-10 max-w-3xl"
          >
            <p className="font-mono text-[11px] tracking-[0.14em] text-accent/70 uppercase">
              {project.category} · {project.year}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.06] font-medium tracking-[-0.04em] md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-3 text-xl tracking-[-0.02em] text-white/50">{project.line}</p>
            <p className="mt-8 text-[16px] leading-relaxed text-white/55">{project.summary}</p>
          </motion.div>

          <div className="mt-16 grid gap-12 border-t border-white/[0.06] pt-16 md:grid-cols-3 md:gap-10">
            <section>
              <h2 className="font-mono text-[11px] tracking-[0.16em] text-white/35 uppercase">
                Problema
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/55">{project.problem}</p>
            </section>
            <section>
              <h2 className="font-mono text-[11px] tracking-[0.16em] text-white/35 uppercase">
                Enfoque
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/55">{project.approach}</p>
            </section>
            <section>
              <h2 className="font-mono text-[11px] tracking-[0.16em] text-white/35 uppercase">
                Resultado
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/55">{project.outcome}</p>
            </section>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-4 gap-y-2">
            {project.tags.map((tag) => (
              <span key={tag} className="font-mono text-[11px] tracking-[0.08em] text-white/30">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap gap-4 border-t border-white/[0.06] pt-12">
            {project.external ? (
              <PrimaryButton href={project.url}>Abrir proyecto →</PrimaryButton>
            ) : null}
            <SecondaryButton href="/#contacto">Hablar de un proyecto así</SecondaryButton>
          </div>
        </Container>
      </main>
      <PremiumFooter />
    </>
  );
}
