'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export function PwaSplash() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const storageKey = 'assogba-pwa-splash-seen'
    const alreadySeen = window.sessionStorage.getItem(storageKey)

    if (alreadySeen) {
      setVisible(false)
      return
    }

    window.sessionStorage.setItem(storageKey, 'true')
    const timeout = window.setTimeout(() => setVisible(false), 1500)
    return () => window.clearTimeout(timeout)
  }, [])

  if (!visible) return null

  return (
    <div
      role="status"
      aria-label="Chargement du portfolio de Rodrigue ASSOGBA"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#07152f] text-white transition-opacity duration-500"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(37,99,235,0.34),transparent_34%),radial-gradient(circle_at_18%_90%,rgba(14,165,233,0.2),transparent_32%)]" />
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/15 shadow-[0_0_120px_rgba(59,130,246,0.18)]" />
      <div className="relative flex w-full max-w-sm flex-col items-center px-8 text-center">
        <div className="relative mb-7 h-20 w-20 overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-3 shadow-2xl shadow-blue-950/40">
          <Image src="/images/logo/logo.png" alt="Logo ASSOGBA" fill sizes="80px" className="object-contain" priority />
        </div>
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.34em] text-blue-200/80">ASSOGBA.tech</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Rodrigue ASSOGBA</h1>
        <p className="mt-3 text-sm text-blue-100/65">Finance × Data × Digital</p>
        <div className="mt-9 h-px w-36 overflow-hidden bg-white/15">
          <div className="h-full w-1/2 animate-[splash-progress_1.3s_ease-out_forwards] bg-blue-400" />
        </div>
      </div>
    </div>
  )
}
