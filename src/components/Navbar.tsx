import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'

const navLinks = ['Solutions', 'Our Tech', 'Company', 'Resources']

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  return (
    <motion.nav
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/[0.07]'
          : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5">
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
            key={link}
            href={`#${link.toLowerCase().replace(' ', '-')}`}
            className="text-[11.5px] font-semibold tracking-[0.18em] text-white/50 uppercase hover:text-white transition-colors duration-300 flex items-center gap-1"
          >
            {link}
            <span className="text-[8px] opacity-60">▾</span>
          </a>
        ))}
      </div>

      {/* CTA */}
      <button className="px-6 py-2.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase border border-white/20 text-white hover:bg-white hover:text-[#0a0a0a] transition-all duration-300">
        Let's Talk
      </button>
    </motion.nav>
  )
}
