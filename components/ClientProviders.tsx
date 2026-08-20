'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { PwaSplash } from './PwaSplash'

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
  const mainSpacing = pathname === '/' ? 'pt-[60px] pb-10 sm:pb-12' : 'pt-[76px] pb-10 sm:pb-12'

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <PwaSplash />
      <Navbar />
      <main className={`mx-auto px-4 sm:px-6 ${mainSpacing} ${isWideRoute ? 'max-w-7xl' : 'max-w-5xl'}`}>
        {children}
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
