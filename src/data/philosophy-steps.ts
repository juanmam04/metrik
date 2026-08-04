import type { LucideIcon } from "lucide-react";
import { Boxes, Eye, PenLine } from "lucide-react";

export type PhilosophyStepData = {
  id: string;
  number: string;
  title: string;
  description: string;
  detail: string;
  icon: LucideIcon;
};

export const philosophySteps: PhilosophyStepData[] = [
  {
    id: "entender",
    number: "01",
    title: "Entender",
    description:
      "Mapeamos cómo trabaja tu empresa hoy: fricciones, huecos y oportunidades reales — antes de tocar una línea de código.",
    detail: "Diagnóstico antes de arquitectura.",
    icon: Eye,
  },
  {
    id: "disenar",
    number: "02",
    title: "Diseñar",
    description:
      "Definimos la arquitectura del sistema: flujos, integraciones y decisiones que duran. Claridad antes que complejidad.",
    detail: "Estructura pensada para escalar.",
    icon: PenLine,
  },
  {
    id: "construir",
    number: "03",
    title: "Construir",
    description:
      "Implementamos con precisión. Entregamos sistemas estables, medibles y listos para evolucionar con tu operación.",
    detail: "Entrega medible y durable.",
    icon: Boxes,
  },
];
