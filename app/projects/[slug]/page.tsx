import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getAllProjects, getProjectSlugs, getProjectMeta, getProjectContent } from '@/lib/projects'
import { ProjectCaseStudy } from '@/components/ProjectCaseStudy'
import { MdxContent } from '@/components/MdxContent'
import { ProjectEvidence } from '@/components/ProjectEvidence'

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const project = getAllProjects().find((p) => p.slug === slug)
  if (!project) return {}
  return { title: project.title, description: project.description }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const slugs = getProjectSlugs()
  if (!slugs.includes(slug)) notFound()

  const project = getProjectMeta(slug)
  const mdxContent = getProjectContent(slug)
  const allProjects = getAllProjects()
  const currentIndex = allProjects.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

  return (
    <div>
      <ProjectCaseStudy project={project} />
      <ProjectEvidence project={project} />

      <div className="mt-8 border-t border-neutral-200 pt-8">
        <MdxContent source={mdxContent} />
      </div>

      <div className="mt-16 flex flex-col gap-4 border-t border-neutral-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
        {prevProject ? (
          <Link href={`/projects/${prevProject.slug}`} className="group inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
            <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="min-w-0 truncate">{prevProject.title}</span>
          </Link>
        ) : <div />}
        {nextProject ? (
          <Link href={`/projects/${nextProject.slug}`} className="group inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
            <span className="min-w-0 truncate">{nextProject.title}</span>
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
