'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface StaggerChildrenProps {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
  y?: number
}

export function StaggerChildren({
  children,
  className = '',
  stagger = 0.1,
  delay = 0,
  y = 40,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const items = ref.current.children

    gsap.set(items, { y, opacity: 0 })

    const tl = gsap.to(items, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      stagger,
      delay,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        once: true,
      },
    })

    return () => {
      tl.kill()
    }
  }, [stagger, delay, y])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
