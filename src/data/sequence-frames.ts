export const CAMERA_FRAMES = {
  chaos: {
    src: "/images/premium/sequence/act1-chaos.png",
    alt: "Mesa de trabajo de producto digital: interfaces impresas, alternativas y notas",
  },
  closer: {
    src: "/images/premium/sequence/act2-understand.png",
    alt: "La cámara se acerca a una tarjeta de interfaz impresa",
  },
  paper: {
    src: "/images/premium/sequence/act3-card-paper.png",
    alt: "Macro de una tarjeta de interfaz impresa",
  },
  digital: {
    src: "/images/premium/sequence/act4-card-digital.png",
    alt: "La misma tarjeta convertida en superficie digital",
  },
  mobile: {
    src: "/images/premium/sequence/act-light-mobile.png",
    alt: "Producto en un teléfono, escena clara",
  },
} as const;

/** Longitud de la escena cinematográfica en viewport heights */
export const SCENE_SCROLL = {
  desktop: 9,
  mobile: 6,
} as const;
