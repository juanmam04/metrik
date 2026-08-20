"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

import { MobileMenu } from "@/components/layout/mobile-menu";
import { Logo } from "@/components/ui/logo";
import { navLinks } from "@/data/navigation";
import { useScrollState } from "@/hooks/use-scroll-state";
import { easeOutExpo } from "@/lib/easing";
import { cn } from "@/lib/utils";

export function PremiumNav() {
  const { scrolled, y } = useScrollState(48);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(y < 80 || scrolled);
  }, [y, scrolled]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -8 }}
        transition={{ duration: 0.35, ease: easeOutExpo }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500",
          scrolled
            ? "border-b border-border/40 bg-background/55 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-5 sm:h-[4.75rem] sm:px-6 md:px-8 lg:h-20">
          <Link
            href="/"
            aria-label="Metrik — inicio"
            className="rounded-sm transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <Logo />
          </Link>

          <nav
            className="hidden items-center gap-10 md:flex"
            aria-label="Navegación principal"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-sm text-[15px] tracking-[-0.01em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
                  link.href === "#contacto"
                    ? "text-foreground/90 hover:text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 md:hidden"
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
