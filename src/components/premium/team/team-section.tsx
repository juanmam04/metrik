"use client";

import { Container } from "@/components/ui/container";
import { PrimaryButton } from "@/components/ui/metrik-button";
import { siteConfig } from "@/data/site";
import { team } from "@/data/studio";

export function TeamSection() {
  const scheduleHref = siteConfig.calendlyUrl || "#contacto";

  return (
    <section
      id="equipo"
      className="relative border-t border-white/[0.06] py-20 md:py-36"
      aria-labelledby="team-title"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-20">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-accent/75 uppercase">
              Equipo
            </p>
            <h2
              id="team-title"
              className="mt-4 font-display text-3xl font-medium tracking-[-0.045em] md:text-4xl"
            >
              Personas detrás del criterio.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/45">
              No somos una fábrica de pantallas. Diseñamos y construimos juntos: el mismo equipo
              entiende el problema y lo lleva a producción.
            </p>
            <PrimaryButton href={scheduleHref} className="mt-10">
              {siteConfig.calendlyUrl ? "Agendar 20 min →" : "Escribinos →"}
            </PrimaryButton>
          </div>

          <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {team.map((person) => (
              <li key={person.id} className="flex gap-5 py-8">
                <div
                  className="flex size-14 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] font-display text-lg tracking-[-0.04em] text-white/80"
                  aria-hidden
                >
                  {person.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-[-0.04em] text-white">
                    {person.name}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] tracking-[0.12em] text-accent/70">
                    {person.role}
                  </p>
                  <p className="mt-3 max-w-md text-[14px] leading-relaxed text-white/45">
                    {person.bio}
                  </p>
                  {"link" in person && person.link ? (
                    <a
                      href={person.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block font-mono text-[11px] tracking-[0.12em] text-white/55 transition-colors hover:text-accent"
                    >
                      {person.link.label}
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
