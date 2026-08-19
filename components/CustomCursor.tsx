'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    setVisible(true)

    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    let mx = 0, my = 0
    let cx = 0, cy = 0

    function onMove(e: MouseEvent) {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
    }

    function animate() {
      cx += (mx - cx) * 0.12
      cy += (my - cy) * 0.12
      cursor.style.transform = `translate(${cx - 16}px, ${cy - 16}px)`
      requestAnimationFrame(animate)
    }

    function onEnter() { setHovering(true) }
    function onLeave() { setHovering(false) }

    document.addEventListener('mousemove', onMove)
    requestAnimationFrame(animate)

    const interactives = document.querySelectorAll('a, button, [role="button"]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  if (!visible) return null

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden mix-blend-difference md:block"
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: hovering ? 'rgba(255,255,255,0.15)' : 'transparent',
          border: '1px solid rgba(255,255,255,0.5)',
          transition: 'width 0.3s, height 0.3s, background 0.3s',
          ...(hovering ? { width: 48, height: 48, transform: 'translate(-16px, -16px)' } : {}),
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#fff',
        }}
      />
    </>
  )
}
