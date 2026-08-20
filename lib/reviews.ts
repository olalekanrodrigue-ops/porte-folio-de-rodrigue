import { supabase } from '@/lib/supabase'
import type { Review } from '@/types/review'

export async function getPublicReviews(): Promise<Review[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('consent', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase reviews read error:', error.message)
    return []
  }

  return (data ?? []) as Review[]
}

export async function getPublicReview(slug: string): Promise<Review | null> {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('slug', slug)
    .eq('consent', true)
    .maybeSingle()

  if (error) {
    console.error('Supabase review detail error:', error.message)
    return null
  }

  return (data as Review | null) ?? null
}
