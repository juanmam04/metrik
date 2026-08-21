"use client";

import Link from "next/link";

import { Container } from "@/components/ui/container";
import { PrimaryButton, SecondaryButton } from "@/components/ui/metrik-button";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

const CATEGORY_LABEL: Record<string, string> = {
  software: "Software",
  web: "Web",
  producto: "Producto",
};

export function WorkSection() {
  return (
    <section
      id="trabajo"
      className="relative border-t border-white/[0.06] py-20 md:py-36"
      aria-labelledby="work-title"
    >
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-[11px] tracking-[0.18em] text-accent/75 uppercase">
              Trabajo
            </p>
            <h2
              id="work-title"
              className="mt-4 font-display text-3xl font-medium tracking-[-0.045em] md:text-4xl"
            >
              Proyectos de software.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-white/45">
              Cada pieza tiene un problema concreto detrás. Abrí el proyecto y mirá de qué se trata.
            </p>
          </div>
          <SecondaryButton href="#contacto" className="shrink-0 self-start md:self-auto">
            Hablemos de uno tuyo
          </SecondaryButton>
        </div>

        <ul className="mt-16 divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {projects.map((project) => (
            <li key={project.slug} className="py-10 md:py-12">
              <article className="grid gap-8 lg:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] lg:gap-14">
                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-accent/70">
                      {CATEGORY_LABEL[project.category] ?? project.category}
                    </span>
                    <span className="text-white/20" aria-hidden>
                      ·
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.08em] text-white/35">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl tracking-[-0.04em] text-white md:text-[1.85rem]">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-[15px] text-white/50">{project.line}</p>
                </div>

                <div>
                  <p className="max-w-2xl text-[15px] leading-relaxed text-white/55">
                    {project.summary}
                  </p>
                  <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div>
                      <dt className="font-mono text-[10px] tracking-[0.16em] text-white/30 uppercase">
                        Problema
                      </dt>
                      <dd className="mt-2 text-[14px] leading-relaxed text-white/45">
                        {project.problem}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] tracking-[0.16em] text-white/30 uppercase">
                        Enfoque
                      </dt>
                      <dd className="mt-2 text-[14px] leading-relaxed text-white/45">
                        {project.approach}
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-6 max-w-2xl text-[14px] leading-relaxed text-white/70">
                    {project.outcome}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] tracking-[0.06em] text-white/28"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <PrimaryButton
                      href={project.url}
                      className={cn("min-w-[10.5rem]")}
                      {...(project.external
                        ? { "aria-label": `Abrir ${project.title} en una pestaña nueva` }
                        : {})}
                    >
                      {project.external ? "Ver proyecto →" : "Ver detalle →"}
                    </PrimaryButton>
                    <Link
                      href="#contacto"
                      className="inline-flex h-11 items-center px-2 text-[14px] text-white/45 transition-colors hover:text-white/80"
                    >
                      Consultar algo parecido
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
