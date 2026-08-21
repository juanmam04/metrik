import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { TextLink } from "@/components/ui/metrik-button";
import { navLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site";

export function PremiumFooter() {
  const year = new Date().getFullYear();
  const scheduleHref = siteConfig.calendlyUrl || "#contacto";

  return (
    <footer className="border-t border-border py-12 md:py-16">
      <Container>
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <TextLink href={scheduleHref} className="mt-6 text-[14px]">
              {siteConfig.calendlyUrl ? "Agendar una llamada" : "Escribinos"}
            </TextLink>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-[10px] tracking-[0.16em] text-white/30 uppercase">
              Navegación
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-12 text-[12px] text-muted-foreground/70">
          © {year} {siteConfig.name}. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}
