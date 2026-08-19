'use client'

import dynamic from 'next/dynamic'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

const SmoothScrollProvider = dynamic(
  () => import('./SmoothScrollProvider').then((m) => m.SmoothScrollProvider),
  { ssr: false }
)

const CustomCursor = dynamic(
  () => import('./CustomCursor').then((m) => m.CustomCursor),
  { ssr: false }
)

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-12">{children}</main>
      <Footer />
    </SmoothScrollProvider>
  )
}
