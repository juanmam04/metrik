import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyView } from "@/components/premium/work/case-study-view";
import { getProject, projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} — ${siteConfig.name}`,
    description: `${project.line}. Designed & built by Metrik.`,
    openGraph: {
      title: `${project.title} — ${siteConfig.name}`,
      description: `${project.line}. Designed & built by Metrik.`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <CaseStudyView project={project} />;
}
