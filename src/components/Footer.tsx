import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const footerLinks = {
  Solutions: ['Carbon MRV', 'Biodiversity', 'Water Stewardship', 'Reporting Suite'],
  Technology: ['Sensor Network', 'Blockchain Layer', 'AI Processing', 'API Access'],
  Company: ['About Us', 'Science Team', 'Careers', 'Press'],
  Resources: ['Documentation', 'Case Studies', 'Whitepapers', 'Blog'],
}

export const Footer = () => {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // 1. Slow, staggered entrance for the columns
    const columns = ref.current?.querySelectorAll('.footer-col')
    if (columns) {
      gsap.fromTo(columns,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.8,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
          }
        }
      )
    }

    // 2. Slow fade in for the bottom bar
    const bottomBar = ref.current?.querySelector('.footer-bottom')
    if (bottomBar) {
      gsap.fromTo(bottomBar,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 90%',
          }
        }
      )
    }

    // 3. Very subtle parallax on the whole footer background
    gsap.fromTo(ref.current,
      { y: 50 },
      {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        }
      }
    )

  }, { scope: ref })

  return (
    <footer ref={ref} className="relative overflow-hidden z-20">

      {/* ── STANDARD FOOTER CONTENT (dark bg) ──────────────────────── */}
      <div className="bg-[#0a0a0a] border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 pt-24 pb-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-24">

            {/* Brand column */}
            <div className="col-span-2 md:col-span-1 footer-col will-change-transform">
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
              <div key={group} className="footer-col will-change-transform">
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/[0.06] footer-bottom will-change-transform">
            <p className="text-[10.5px] font-mono text-white">
              © {new Date().getFullYear()} Alethia Environmental Intelligence. All rights reserved.
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
    </footer>
  )
}
