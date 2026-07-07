"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ReactLenis, useLenis } from "lenis/react"
import { usePathname } from "next/navigation"
import { useEffect, type ReactNode } from "react"

function LenisScrollSync() {
  const pathname = usePathname()
  const lenis = useLenis()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!lenis) return

    return lenis.on("scroll", ScrollTrigger.update)
  }, [lenis])

  useEffect(() => {
    if (!lenis) return

    lenis.scrollTo(0, { immediate: true, force: true })
    lenis.start()

    const frame = requestAnimationFrame(() => {
      lenis.resize()
      ScrollTrigger.refresh()
    })

    return () => cancelAnimationFrame(frame)
  }, [pathname, lenis])

  return null
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  if (pathname.startsWith("/studio")) {
    return children
  }

  return (
    <ReactLenis root options={{ stopInertiaOnNavigate: true }}>
      <LenisScrollSync />
      {children}
    </ReactLenis>
  )
}
