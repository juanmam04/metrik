export type ProcessNodeData = {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  chaos: { x: number; y: number; rotate: number };
};

export const PROCESS_VIEWBOX = { width: 320, height: 420 };

export const processNodes: ProcessNodeData[] = [
  {
    id: "cliente",
    label: "Cliente",
    description: "Origen del flujo: demanda, contexto y señales reales.",
    x: 160,
    y: 36,
    chaos: { x: -22, y: 10, rotate: -4 },
  },
  {
    id: "crm",
    label: "CRM",
    description: "Centraliza relaciones, estados y datos operativos.",
    x: 160,
    y: 118,
    chaos: { x: 26, y: -8, rotate: 3 },
  },
  {
    id: "automatizacion",
    label: "Automatización",
    description: "Orquesta tareas repetibles sin fricción manual.",
    x: 160,
    y: 200,
    chaos: { x: -16, y: 14, rotate: -2 },
  },
  {
    id: "ia",
    label: "IA",
    description: "Interpreta patrones y acelera decisiones.",
    x: 160,
    y: 282,
    chaos: { x: 20, y: -12, rotate: 5 },
  },
  {
    id: "reportes",
    label: "Reportes",
    description: "Visibilidad clara para operar con precisión.",
    x: 160,
    y: 364,
    chaos: { x: -10, y: 8, rotate: -3 },
  },
];
