export type ProjectCategory = "software" | "web" | "producto";

export type Project = {
  slug: string;
  title: string;
  year: string;
  /** Una línea de posicionamiento */
  line: string;
  category: ProjectCategory;
  featured: boolean;
  /** Qué es / para qué sirve */
  summary: string;
  /** Problema de partida */
  problem: string;
  /** Qué hicimos */
  approach: string;
  /** Resultado o estado */
  outcome: string;
  /** Tags cortos */
  tags: string[];
  /** Link externo o ruta interna */
  url: string;
  /** Si el link sale del sitio */
  external?: boolean;
  image?: string;
  context?: string;
};

/**
 * Trabajo mostrable. Sin fotos: el peso está en el copy + link.
 * Reemplazá `url` por el link real de cada proyecto cuando lo tengas.
 */
export const projects: Project[] = [
  {
    slug: "servo",
    title: "Servo",
    year: "2026",
    line: "Marketplace de servicios en Uruguay",
    category: "producto",
    featured: true,
    summary:
      "Plataforma para encontrar profesionales cerca, con calificaciones y contacto directo — un marketplace pensado para operar en Uruguay.",
    problem:
      "Conseguir un servicio de confianza era lento y opaco: recomendaciones sueltas, poco contexto y fricción para contactar.",
    approach:
      "Diseñamos y construimos el producto de punta a punta: búsqueda, perfiles, confianza y el flujo hasta el contacto.",
    outcome: "Un marketplace vivo en producción: https://servo.com.uy",
    tags: ["Marketplace", "Producto", "Web", "Uruguay"],
    url: "https://servo.com.uy/",
    external: true,
  },
  {
    slug: "fanalytics",
    title: "Fanalytics",
    year: "2026",
    line: "Football lives here",
    category: "producto",
    featured: true,
    summary:
      "Plataforma de fútbol en vivo: partidos, proyecciones, FanPicks y comunidad — scores y reacciones en un solo lugar.",
    problem:
      "El fan seguía el partido en un lado, las predicciones en otro y la conversación en un tercero. Faltaba un hub con criterio.",
    approach:
      "Producto de punta a punta: match center, competiciones, picks y fandom, con datos y experiencia pensados para el día de partido.",
    outcome: "Producto vivo en producción: https://fanalyticshq.com",
    tags: ["Producto", "Deportes", "Comunidad", "Datos"],
    url: "https://fanalyticshq.com/",
    external: true,
  },
  {
    slug: "exist",
    title: "exist",
    year: "2025",
    line: "Make ideas exist",
    category: "producto",
    featured: true,
    summary:
      "Producto para pasar de idea a algo concreto: menos fricción entre pensar y construir.",
    problem:
      "Las ideas se quedaban en notas y conversaciones. Faltaba un camino claro para hacerlas existir.",
    approach:
      "Diseño y build del producto con foco en claridad: del concepto al resultado usable.",
    outcome: "Producto publicado: https://exist-theta.vercel.app",
    tags: ["Producto", "Web", "MVP"],
    url: "https://exist-theta.vercel.app/",
    external: true,
  },
  {
    slug: "agency-os",
    title: "Agency OS",
    year: "2026",
    line: "El estudio, en un solo lugar",
    category: "software",
    featured: true,
    summary:
      "Sistema interno de Metrik: clientes, pipeline, proyectos y el día a día de la agencia — con la calma de un espacio bien diseñado.",
    problem:
      "Operar el estudio entre chats, planillas y herramientas sueltas no escala. Faltaba un lugar con criterio para el trabajo real.",
    approach:
      "Construimos el OS de la agencia: pipeline, clientes y proyectos en un producto propio, pensado para Montevideo y cómo trabajamos.",
    outcome: "En uso: https://agency-os-web-22tw.vercel.app",
    tags: ["Software", "Operaciones", "Pipeline", "Agencia"],
    url: "https://agency-os-web-22tw.vercel.app/",
    external: true,
  },
  {
    slug: "metrik-web",
    title: "Metrik",
    year: "2026",
    line: "Sitio premium del estudio",
    category: "web",
    featured: true,
    summary:
      "La propia web de Metrik: una experiencia scroll-driven que explica cómo pensamos antes de construir.",
    problem:
      "Una landing genérica no alcanza para vender trabajo de producto. Hacía falta una web que demuestre criterio, no solo servicios.",
    approach:
      "Narrativa continua, tipografía editorial, atmósfera propia y un arco claro: del problema al sistema.",
    outcome: "La web es el primer caso premium del estudio — y el filtro de quién nos contacta.",
    tags: ["Next.js", "GSAP", "Diseño", "Producto"],
    url: "/",
    external: false,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
