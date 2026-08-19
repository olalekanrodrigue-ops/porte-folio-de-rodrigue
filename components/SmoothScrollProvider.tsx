'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let destroyed = false

    import('lenis').then(({ default: Lenis }) => {
      if (destroyed) return

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)

      setReady(true)

      return () => {
        lenis.destroy()
      }
    })

    return () => { destroyed = true }
  }, [])

  return <>{children}</>
}
