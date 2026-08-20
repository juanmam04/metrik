export type Service = {
  id: "software" | "web" | "premium";
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    id: "software",
    title: "Software",
    description:
      "Productos digitales construidos alrededor de operaciones reales.",
  },
  {
    id: "web",
    title: "Web",
    description: "Sitios que comunican, convierten y funcionan.",
  },
  {
    id: "premium",
    title: "Premium",
    description:
      "Experiencias donde diseño, motion y tecnología son una sola pieza.",
  },
];
