'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
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
  const pathname = usePathname()
  const isWideRoute = pathname === '/' || pathname === '/projects' || pathname.startsWith('/projects/')

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navbar />
      <main className={`mx-auto px-4 py-10 sm:px-6 sm:py-12 ${isWideRoute ? 'max-w-7xl' : 'max-w-5xl'}`}>
        {children}
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
