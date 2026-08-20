import type { MetadataRoute } from 'next'
import { getAllProjects } from '@/lib/projects'
import { getPublicReviews } from '@/lib/reviews'

const BASE_URL = 'https://assogba.tech'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = getAllProjects()
  const reviews = await getPublicReviews()

  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/skills`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/experience`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
  ]

  const projectPages = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const reviewPages = reviews.map((review) => ({
    url: `${BASE_URL}/avis/${review.slug}`,
    lastModified: new Date(review.created_at),
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))

  return [...staticPages, ...projectPages, ...reviewPages]
}
