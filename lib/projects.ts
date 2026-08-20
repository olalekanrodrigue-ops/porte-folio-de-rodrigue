import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Project, ProjectFrontmatter } from '@/types/project'

const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects')

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return []
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
}

export function getProjectMeta(slug: string): Project {
  const fullPath = path.join(PROJECTS_DIR, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data } = matter(fileContents)
  const frontmatter = data as ProjectFrontmatter
  return {
    slug,
    title: frontmatter.title || slug,
    description: frontmatter.description || '',
    stack: frontmatter.stack || [],
    status: frontmatter.status || 'Projet',
    featured: frontmatter.featured ?? false,
    section: frontmatter.section,
    domains: frontmatter.domains,
    category: frontmatter.category,
    demo: frontmatter.demo,
    github: frontmatter.github,
    targetMarket: frontmatter.targetMarket,
    proofImage: frontmatter.proofImage,
    proofAlt: frontmatter.proofAlt,
    proofImages: frontmatter.proofImages,
    proofAlts: frontmatter.proofAlts,
  }
}

export function getProjectContent(slug: string): string {
  const fullPath = path.join(PROJECTS_DIR, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { content } = matter(fileContents)
  return content
}

export function getAllProjects(): Project[] {
  return getProjectSlugs()
    .map(getProjectMeta)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      return 0
    })
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured)
}

export function getProjectsBySection(section: string): Project[] {
  return getAllProjects().filter((p) => p.section === section)
}
