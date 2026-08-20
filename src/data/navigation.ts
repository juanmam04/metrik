export const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#contacto", label: "Contacto" },
] as const;

export type NavLink = (typeof navLinks)[number];
