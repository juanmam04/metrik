"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { PrimaryButton } from "@/components/ui/metrik-button";
import { easeOutExpo } from "@/lib/easing";
import { siteConfig } from "@/data/site";

type Status = "idle" | "sending" | "sent" | "error";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!ACCESS_KEY) {
      setStatus("error");
      setError("El formulario todavía no está configurado.");
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: si un bot lo llenó, fingimos éxito
    if (String(data.get("website") ?? "").trim()) {
      setStatus("sent");
      form.reset();
      return;
    }

    data.delete("website");
    data.append("access_key", ACCESS_KEY);
    data.append("subject", "Consulta — Metrik");
    data.append("from_name", "Metrik");

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const payload = (await res.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null;

      if (!res.ok || !payload?.success) {
        setStatus("error");
        setError(payload?.message || "No se pudo enviar. Probá de nuevo.");
        return;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("No se pudo enviar. Probá de nuevo.");
    }
  };

  return (
    <section
      id="contacto"
      className="relative border-t border-white/[0.06] py-20 md:py-36 lg:py-44"
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
              No hace falta que tengas definido el producto. Con una conversación alcanza para
              saber si podemos ayudar.
            </p>
            <ul className="mt-8 space-y-3 text-[14px] text-white/40">
              <li>· Respondemos personalmente, no con un bot.</li>
              <li>· Si no es un buen fit, te lo decimos.</li>
              <li>· Software, web o producto: el proceso es el mismo.</li>
            </ul>
            {siteConfig.calendlyUrl ? (
              <PrimaryButton href={siteConfig.calendlyUrl} className="mt-10">
                Agendar 20 min →
              </PrimaryButton>
            ) : (
              <p className="mt-8 text-[13px] text-white/30">
                O escribinos directo a{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-white/55 underline-offset-4 hover:text-white hover:underline"
                >
                  {siteConfig.email}
                </a>
              </p>
            )}
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="space-y-5"
          >
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm text-white/45">
                Nombre
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                disabled={status === "sending"}
                className="h-11 w-full rounded-lg border border-white/[0.1] bg-white/[0.03] px-4 text-sm text-foreground outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-sm text-white/45">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                disabled={status === "sending"}
                className="h-11 w-full rounded-lg border border-white/[0.1] bg-white/[0.03] px-4 text-sm text-foreground outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-2 block text-sm text-white/45">
                ¿Qué necesitás resolver?
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                disabled={status === "sending"}
                className="w-full resize-none rounded-lg border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
              />
            </div>

            <PrimaryButton
              type="submit"
              className="w-full sm:w-auto"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Enviando…" : "Contanos →"}
            </PrimaryButton>

            {status === "sent" ? (
              <p className="text-sm text-white/55" role="status">
                Listo. Te respondemos a la brevedad.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="text-sm text-red-300/80" role="alert">
                {error}
              </p>
            ) : null}
          </motion.form>
        </div>
      </Container>
    </section>
  );
}
