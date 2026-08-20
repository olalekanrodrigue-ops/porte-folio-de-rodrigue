import { getFeaturedProjects } from '@/lib/projects'
import { HomeClient } from '@/components/HomeClient'
import { getPublicReviews } from '@/lib/reviews'

export const revalidate = 60

export default async function HomePage() {
  const featured = getFeaturedProjects()
  const reviews = await getPublicReviews()
  return <HomeClient featured={featured} reviews={reviews} />
}
