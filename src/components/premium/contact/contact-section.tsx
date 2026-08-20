"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { PrimaryButton } from "@/components/ui/metrik-button";
import { easeOutExpo } from "@/lib/easing";

export function ContactSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = encodeURIComponent("Consulta — Metrik");
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section
      id="contacto"
      className="relative border-t border-white/[0.06] py-28 md:py-36 lg:py-44"
      aria-labelledby="contact-title"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2
              id="contact-title"
              className="font-display text-3xl leading-[1.08] font-medium tracking-[-0.04em] md:text-4xl lg:text-[2.75rem]"
            >
              Contanos qué estás tratando de resolver.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/45">
              No hace falta que tengas definido el producto.
            </p>
            <p className="mt-8 text-[13px] text-white/30">Respondemos personalmente.</p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="contact-name"
                className="mb-2 block text-sm text-white/45"
              >
                Nombre
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="h-11 w-full rounded-lg border border-white/[0.1] bg-white/[0.03] px-4 text-sm text-foreground outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="mb-2 block text-sm text-white/45"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="h-11 w-full rounded-lg border border-white/[0.1] bg-white/[0.03] px-4 text-sm text-foreground outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm text-white/45"
              >
                ¿Qué necesitás resolver?
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                className="w-full resize-none rounded-lg border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <PrimaryButton type="submit" className="w-full sm:w-auto">
              Contanos →
            </PrimaryButton>
            {sent ? (
              <p className="text-sm text-white/40" role="status">
                Se abrirá tu cliente de correo para completar el envío.
              </p>
            ) : null}
          </motion.form>
        </div>
      </Container>
    </section>
  );
}
