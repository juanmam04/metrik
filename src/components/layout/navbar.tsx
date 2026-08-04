"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

import { MobileMenu } from "@/components/layout/mobile-menu";
import { AnimatedLink } from "@/components/ui/animated-link";
import { Logo } from "@/components/ui/logo";
import { PrimaryButton } from "@/components/ui/metrik-button";
import { navLinks } from "@/data/navigation";
import { useScrollState } from "@/hooks/use-scroll-state";
import { easeOutExpo } from "@/lib/easing";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrolled } = useScrollState(18);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:px-4 md:pt-4">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easeOutExpo }}
          className={cn(
            "pointer-events-auto w-full transition-[max-width,background-color,border-color,box-shadow,backdrop-filter,border-radius] duration-500 ease-out",
            scrolled
              ? "max-w-3xl rounded-full border border-border/90 bg-background/70 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              : "max-w-6xl rounded-none border border-transparent bg-transparent shadow-none backdrop-blur-0"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between gap-4 transition-[height,padding] duration-500",
              scrolled ? "h-14 px-4 md:px-5" : "h-16 px-3 md:h-[4.25rem] md:px-2"
            )}
          >
            <a
              href="#"
              aria-label="Metrik — inicio"
              className="group inline-flex items-center rounded-sm transition-opacity duration-300 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="transition-transform duration-300 group-hover:-translate-y-px">
                <Logo />
              </span>
            </a>

            <nav
              className="hidden items-center gap-7 md:flex"
              aria-label="Navegación principal"
            >
              {navLinks.map((link) => (
                <AnimatedLink key={link.href} href={link.href}>
                  {link.label}
                </AnimatedLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <PrimaryButton
                href="#contacto"
                className={cn(
                  "hidden h-9 px-4 text-[13px] sm:inline-flex",
                  scrolled && "h-9"
                )}
              >
                Agendar una llamada
              </PrimaryButton>

              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 md:hidden"
                aria-label="Abrir menú"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
              >
                <Menu className="size-4" />
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
