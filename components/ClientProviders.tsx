'use client'

import { SmoothScrollProvider } from './SmoothScrollProvider'
import { CustomCursor } from './CustomCursor'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

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
