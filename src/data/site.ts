export const siteConfig = {
  name: "Metrik",
  tagline: "Producto digital, software y webs.",
  description:
    "Metrik diseña y construye software, productos digitales y experiencias web — con pensamiento previo, arquitectura clara y ejecución precisa.",
  url: "https://metrik.site",
  locale: "es_AR",
  /** Pegá tu link de Calendly en .env.local como NEXT_PUBLIC_CALENDLY_URL */
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
  email: "hola@metrik.dev",
  /**
   * Web3Forms access key (pública por diseño: se usa en el browser).
   * Override con NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY en Vercel si la rotás.
   */
  web3formsAccessKey:
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ??
    "e3d858bc-aad5-4075-aed7-26c3246eb028",
} as const;
