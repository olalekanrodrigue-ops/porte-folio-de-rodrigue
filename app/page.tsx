import { getFeaturedProjects } from '@/lib/projects'
import { HomeClient } from '@/components/HomeClient'

export default function HomePage() {
  const featured = getFeaturedProjects()
  return <HomeClient featured={featured} />
}
