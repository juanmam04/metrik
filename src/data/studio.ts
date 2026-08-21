export const team = [
  {
    id: "jm",
    name: "Juan Manuel Martínez",
    role: "Producto & ingeniería",
    bio: "Construye el producto: arquitectura, código y lo que realmente hay que hacer existir.",
    link: {
      href: "https://juanmadevv.vercel.app/",
      label: "Ver CV →",
    },
  },
  {
    id: "vm",
    name: "Victoria Martínez",
    role: "Operación & crecimiento",
    bio: "Consigue clientes, arma los planes de acción y lleva la conversación — del primer contacto al proyecto en marcha.",
  },
] as const;

export const processSteps = [
  {
    n: "01",
    title: "Discovery",
    time: "1–2 semanas",
    body: "Entramos en la operación: qué duele, qué se hace a mano, qué tiene que quedar visible. Salís con el problema correcto escrito.",
  },
  {
    n: "02",
    title: "Diseño del sistema",
    time: "1–3 semanas",
    body: "Criterios, flujos y estructura. Prototipamos lo crítico antes de escribir código de más.",
  },
  {
    n: "03",
    title: "Build",
    time: "Según alcance",
    body: "Construimos el producto o la web con base sólida: mantenible, clara y lista para crecer.",
  },
  {
    n: "04",
    title: "Lanzamiento & iteración",
    time: "Continuo",
    body: "Publicamos, medimos el uso real y ajustamos. El lanzamiento no es el final.",
  },
] as const;
