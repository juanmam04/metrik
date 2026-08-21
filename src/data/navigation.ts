export const navLinks = [
  { href: "#trabajo", label: "Trabajo" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#equipo", label: "Equipo" },
  { href: "#contacto", label: "Contacto" },
] as const;

export type NavLink = (typeof navLinks)[number];
