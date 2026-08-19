'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CountUpProps {
  end: number
  suffix?: string
  duration?: number
  className?: string
}

export function CountUp({ end, suffix = '', duration = 2, className = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!ref.current) return

    const obj = { val: 0 }

    const tl = gsap.to(obj, {
      val: end,
      duration,
      ease: 'power2.out',
      onUpdate: () => setValue(Math.round(obj.val)),
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        once: true,
      },
    })

    return () => {
      tl.kill()
    }
  }, [end, duration])

  return (
    <span ref={ref} className={className}>
      {value}{suffix}
    </span>
  )
}
