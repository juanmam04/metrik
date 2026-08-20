export type ProjectCategory = "software" | "web" | "premium";

export type Project = {
  slug: string;
  title: string;
  year: string;
  line: string;
  category: ProjectCategory;
  featured: boolean;
  image?: string;
  context?: string;
  problem?: string;
  approach?: string;
};

/** Sin proyectos publicados en la home. */
export const projects: Project[] = [];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProject(): Project | undefined {
  return projects.find((p) => p.featured) ?? projects[0];
}
