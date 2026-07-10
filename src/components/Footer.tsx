import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const footerLinks = {
  Solutions:  ['Carbon MRV', 'Biodiversity', 'Water Stewardship', 'Reporting Suite'],
  Technology: ['Sensor Network', 'Blockchain Layer', 'AI Processing', 'API Access'],
  Company:    ['About Us', 'Science Team', 'Careers', 'Press'],
  Resources:  ['Documentation', 'Case Studies', 'Whitepapers', 'Blog'],
}

export const Footer = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const logoScale = useTransform(scrollYProgress, [0, 1], [0.5, 1])
  const logoOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <footer ref={ref} className="relative overflow-hidden">

      {/* ── STANDARD FOOTER CONTENT (dark bg) ──────────────────────── */}
      <div className="bg-[#0a0a0a] border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 pt-24 pb-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-24">

            {/* Brand column */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 rounded-full bg-[#a3e635] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a0a]" />
                </div>
                <span className="text-[17px] font-bold text-white lowercase tracking-tight">alethia</span>
              </div>
              <p className="text-[12px] text-white/30 leading-relaxed max-w-[200px]">
                Environmental intelligence you can trust—built on science, blockchain, and transparency.
              </p>
              <div className="flex gap-4 mt-8">
                {['X', 'Li', 'Gh', 'Em'].map((icon) => (
                  <a
                    key={icon}
                    href="#"
                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-white/30 hover:border-[#a3e635]/40 hover:text-[#a3e635] transition-all duration-300"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group}>
                <div className="text-[9.5px] font-mono tracking-[0.22em] text-white/25 uppercase mb-6">{group}</div>
                <ul className="space-y-3.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[12.5px] text-white/40 hover:text-white transition-colors duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/[0.06]">
            <p className="text-[10.5px] font-mono text-white/20">
              © 2024 Alethia Environmental Intelligence. All rights reserved.
            </p>
            <div className="flex gap-8">
              {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((l) => (
                <a key={l} href="#" className="text-[10.5px] font-mono text-white/20 hover:text-white/50 transition-colors duration-300">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── GIANT FOREST FOOTER — Frame 19 ──────────────────────────── */}
      <div className="relative h-[90vh] overflow-hidden flex items-center justify-center">
        {/* Forest background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/forest.png"
            alt="Forest backdrop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a3d0a]/80 via-[#0a3d0a]/40 to-[#0a3d0a]/70" />
        </div>

        {/* CTA Button floating above */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-16 left-1/2 -translate-x-1/2 z-20"
        >
          <button className="px-8 py-3 rounded-full bg-[#a3e635] text-[#0a0a0a] text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#bfff00] transition-all duration-300 flex items-center gap-2 shadow-lg">
            Let's Talk
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>

        {/* Giant "alethia" wordmark */}
        <motion.div
          style={{ scale: logoScale, opacity: logoOpacity }}
          className="relative z-10 text-center"
        >
          <span
            className="block font-black lowercase leading-none select-none"
            style={{
              fontSize: 'clamp(6rem, 22vw, 22rem)',
              letterSpacing: '-0.05em',
              color: '#a3e635',
              textShadow: '0 0 120px rgba(163, 230, 53, 0.4), 0 0 60px rgba(163, 230, 53, 0.2)',
              WebkitTextStroke: '2px rgba(163, 230, 53, 0.8)',
            }}
          >
            alethia
          </span>
        </motion.div>
      </div>
    </footer>
  )
}
