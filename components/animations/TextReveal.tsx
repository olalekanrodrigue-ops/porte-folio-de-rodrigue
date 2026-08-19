'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  once?: boolean
}

export function TextReveal({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.04,
  as: Tag = 'h2',
  once = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const words = containerRef.current.querySelectorAll('.reveal-word')

    gsap.set(words, {
      y: 40,
      opacity: 0,
      filter: 'blur(8px)',
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        once,
      },
    })

    tl.to(words, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out',
      stagger: staggerDelay,
      delay,
    })

    return () => {
      tl.kill()
    }
  }, [delay, staggerDelay, once])

  const words = text.split(' ')

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <Tag className="flex flex-wrap">
        {words.map((word, i) => (
          <span key={i} className="mr-[0.3em] inline-block">
            <span className="reveal-word inline-block">{word}</span>
          </span>
        ))}
      </Tag>
    </div>
  )
}
