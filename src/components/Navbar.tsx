import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'

const navLinks = [
  { name: 'Platform Capabilities', href: '#platform-capabilities' },
  { name: 'Our Solutions', href: '#our-solutions' },
  { name: 'Case Studies', href: '#resources' },
  { name: 'Footer', href: '#footer' },
]

// Cinematic slow easing curve
const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  const handleScrollTo = (target: string | number) => {
    // @ts-ignore
    if (window.lenis) {
      let distance = 0

      if (typeof target === 'number') {
        distance = window.scrollY // If going to top, distance is current scroll pos
      } else {
        const el = document.querySelector(target)
        if (el) distance = Math.abs(el.getBoundingClientRect().top)
      }

      // Balanced cinematic scrolling: max 3.5 seconds so it doesn't take forever, min 1.5s
      const dynamicDuration = Math.min(7, Math.max(4, distance / 4000))

      // @ts-ignore
      window.lenis.scrollTo(target, {
        offset: 0,
        duration: dynamicDuration,
        easing: easeInOutCubic
      })
    } else {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' })
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between transition-all duration-500 ${scrolled
        ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/[0.07]'
        : 'bg-transparent'
        }`}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={(e) => {
          e.preventDefault()
          handleScrollTo(0)
        }}
      >
        <div className="w-7 h-7 rounded-full bg-[#a3e635] flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a0a]" />
        </div>
        <span className="text-[18px] font-bold tracking-tight text-white lowercase">
          alethia
        </span>
      </div>

      {/* Center Nav */}
      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => {
              e.preventDefault()
              handleScrollTo(link.href)
            }}
            className="text-[11.5px] font-semibold tracking-[0.18em] text-white/50 uppercase hover:text-white transition-colors duration-300 flex items-center gap-1"
          >
            {link.name}
            <span className="text-[8px] opacity-60">▾</span>
          </a>
        ))}
      </div>
    </motion.nav>
  )
}
