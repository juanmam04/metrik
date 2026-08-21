export const siteConfig = {
  name: "Metrik",
  tagline: "Producto digital, software y webs.",
  description:
    "Metrik diseña y construye software, productos digitales y experiencias web — con pensamiento previo, arquitectura clara y ejecución precisa.",
  url: "https://metrik.dev",
  locale: "es_AR",
  /** Pegá tu link de Calendly en .env.local como NEXT_PUBLIC_CALENDLY_URL */
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
  email: "hola@metrik.dev",
} as const;
