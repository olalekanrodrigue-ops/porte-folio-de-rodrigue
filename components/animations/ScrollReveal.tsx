'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  x?: number
  scale?: number
  blur?: number
  rotate?: number
  once?: boolean
  stagger?: number
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 1,
  y = 60,
  x = 0,
  scale = 1,
  blur = 0,
  rotate = 0,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.set(ref.current, {
      y,
      x,
      scale: scale !== 1 ? scale : undefined,
      opacity: 0,
      filter: blur > 0 ? `blur(${blur}px)` : undefined,
      rotate,
    })

    const tl = gsap.to(ref.current, {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      rotate: 0,
      duration,
      ease: 'power3.out',
      delay,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 88%',
        once,
      },
    })

    return () => {
      tl.kill()
    }
  }, [delay, duration, y, x, scale, blur, rotate, once])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
