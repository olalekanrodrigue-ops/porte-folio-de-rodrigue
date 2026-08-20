'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/about', label: 'À propos' },
  { href: '/projects', label: 'Projets' },
  { href: '/skills', label: 'Compétences' },
  { href: '/experience', label: 'Expérience' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-neutral-200/60 bg-white/80 backdrop-blur-xl'
          : 'border-b border-neutral-200/40 bg-white/60 backdrop-blur-md'
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/logo/logo.png"
            alt="Logo"
            width={28}
            height={28}
            className="rounded"
          />
          <span className="text-sm font-semibold tracking-tight">R. Assogba</span>
        </Link>

        <ul className="hidden gap-8 md:flex">
          {NAV_ITEMS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="group relative text-sm text-neutral-600 transition-colors hover:text-neutral-900"
              >
                {label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="relative z-50 md:hidden p-1 text-neutral-600 hover:text-neutral-900"
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

    </header>

    {/* Mobile menu is outside the filtered header so fixed positioning covers the full viewport. */}
    <div
      ref={menuRef}
      className={`md:hidden fixed left-0 right-0 top-[61px] bottom-0 z-[60] isolate w-screen overflow-y-auto overscroll-contain bg-white shadow-xl shadow-neutral-900/10 transition-all duration-300 ease-out ${
        open
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-3 pointer-events-none'
      }`}
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="mx-auto min-h-full max-w-5xl bg-white px-6 py-8">
        <ul className="space-y-2">
          {NAV_ITEMS.map(({ href, label }, i) => (
            <li
              key={href}
              className="transition-all duration-300"
              style={{ transitionDelay: open ? `${i * 60}ms` : '0ms' }}
            >
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-5 py-4 text-lg font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}
