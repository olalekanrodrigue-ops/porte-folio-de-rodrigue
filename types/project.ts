export type ProjectCategory = string

export type ProjectStatus = string

export type Project = {
  slug: string
  title: string
  section?: string
  domains?: string[]
  category?: string
  description: string
  stack: string[]
  status: string
  year?: number
  featured: boolean
  demo?: string
  github?: string
  targetMarket?: string
  proofImage?: string
  proofAlt?: string
  proofImages?: string[]
  proofAlts?: string[]
}

export type ProjectFrontmatter = Omit<Project, 'slug'>
