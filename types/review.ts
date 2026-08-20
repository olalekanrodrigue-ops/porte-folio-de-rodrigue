export type Review = {
  id: string
  slug: string
  name: string
  company: string | null
  role: string | null
  content: string
  project: string
  consent: boolean
  client_photo_url: string | null
  project_photo_urls: string[]
  created_at: string
}
