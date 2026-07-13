import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'

const navLinks = [
  { name: 'Platform Capabilities', href: '#platform-capabilities' },
  { name: 'Our Solutions', href: '#our-solutions' },
  { name: 'Case Studies', href: '#resources' },
  { name: 'Footer', href: '#footer' },
]

// Cinematic slow easing curve

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  const handleScrollTo = (target: string | number) => {
    // @ts-ignore
    if (window.lenis) {
      // @ts-ignore
      window.lenis.scrollTo(target, { immediate: true })
    } else {
      if (typeof target === 'number') {
        window.scrollTo({ top: target })
      } else {
        const el = document.querySelector(target)
        if (el) el.scrollIntoView()
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
