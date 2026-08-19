'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextReveal } from '@/components/animations/TextReveal'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { ContactForm } from '@/components/ContactForm'

gsap.registerPlugin(ScrollTrigger)

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!formRef.current) return
    gsap.fromTo(
      formRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    )
  }, [])

  return (
    <div>
      <div className="mb-16 sm:mb-20">
        <TextReveal
          text="Contact"
          as="h1"
          className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        />
        <ScrollReveal delay={0.2}>
          <p className="max-w-xl text-lg text-neutral-500">
            Une question, un projet, une collaboration ? Contactez-moi.
          </p>
        </ScrollReveal>
      </div>
      <div ref={formRef} className="opacity-0">
        <ContactForm />
      </div>
    </div>
  )
}
