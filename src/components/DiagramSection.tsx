import { useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const drawPath = (delay = 0) => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 2, delay, ease: 'easeInOut' as any }, opacity: { duration: 0.3, delay } }
  }
})

// ── SVG: Meteorological Tower ─────────────────────────────────────
const TowerSVG = () => (
  <svg viewBox="0 0 180 300" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <motion.line x1="90" y1="280" x2="90" y2="20" variants={drawPath(0)} />
    <motion.line x1="60" y1="260" x2="120" y2="260" variants={drawPath(0.2)} />
    <motion.line x1="65" y1="200" x2="115" y2="200" variants={drawPath(0.4)} />
    <motion.line x1="70" y1="140" x2="110" y2="140" variants={drawPath(0.6)} />
    <motion.line x1="90" y1="260" x2="30" y2="280" variants={drawPath(0.8)} />
    <motion.line x1="90" y1="260" x2="150" y2="280" variants={drawPath(0.8)} />
    <motion.circle cx="90" cy="20" r="6" variants={drawPath(1)} />
    <motion.line x1="90" y1="20" x2="110" y2="5" variants={drawPath(1.1)} />
    <motion.line x1="110" y1="5" x2="130" y2="10" variants={drawPath(1.2)} />
    <motion.line x1="60" y1="200" x2="90" y2="260" variants={drawPath(0.5)} />
    <motion.line x1="120" y1="200" x2="90" y2="260" variants={drawPath(0.5)} />
    <motion.line x1="65" y1="140" x2="90" y2="200" variants={drawPath(0.7)} />
    <motion.line x1="115" y1="140" x2="90" y2="200" variants={drawPath(0.7)} />
    <motion.circle cx="70" cy="140" r="8" variants={drawPath(0.9)} />
    <motion.circle cx="110" cy="140" r="8" variants={drawPath(0.9)} />
    <motion.circle cx="90" cy="120" r="8" variants={drawPath(0.9)} />
  </svg>
)

// ── SVG: Blockchain Arm ────────────────────────────────────────────
const BlockchainSVG = () => (
  <svg viewBox="0 0 260 220" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <motion.line x1="20" y1="200" x2="240" y2="200" variants={drawPath(0)} />
    <motion.line x1="130" y1="200" x2="130" y2="120" variants={drawPath(0.3)} />
    <motion.line x1="130" y1="120" x2="170" y2="80"  variants={drawPath(0.5)} />
    <motion.line x1="170" y1="80"  x2="210" y2="100" variants={drawPath(0.7)} />
    <motion.line x1="200" y1="100" x2="220" y2="120" variants={drawPath(0.9)} />
    <motion.line x1="220" y1="100" x2="200" y2="120" variants={drawPath(0.9)} />
    {[60, 100, 140, 180].map((x, i) => (
      <motion.rect key={x} x={x} y={175} width="22" height="22" rx="3" variants={drawPath(0.2 + i * 0.1)} />
    ))}
    {[71, 111, 151].map((x, i) => (
      <motion.circle key={x} cx={x} cy="186" r="3" fill="white" variants={drawPath(0.3 + i * 0.1)} />
    ))}
    <motion.path d="M 80 175 Q 90 140 130 120" variants={drawPath(1)} />
    <motion.path d="M 140 175 Q 155 150 170 80"  variants={drawPath(1.2)} />
  </svg>
)

// ── SVG: Satellite Dish ───────────────────────────────────────────
const SatelliteSVG = () => (
  <svg viewBox="0 0 200 200" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <motion.path d="M 30 160 Q 100 30 170 160" variants={drawPath(0)} />
    <motion.line x1="100" y1="30" x2="100" y2="100" variants={drawPath(0.5)} />
    <motion.line x1="100" y1="160" x2="100" y2="185" variants={drawPath(0.7)} />
    <motion.line x1="70"  y1="185" x2="130" y2="185" variants={drawPath(0.8)} />
    <motion.path d="M 100 100 Q 130 70 160 100" strokeDasharray="4 4" variants={drawPath(1)} />
    <motion.path d="M 100 100 Q 120 80 140 100" strokeDasharray="4 4" variants={drawPath(1.1)} />
    <motion.circle cx="100" cy="100" r="6" variants={drawPath(1.2)} />
    <motion.path d="M 155 90 L 165 85 L 165 95 Z" fill="white" stroke="none" variants={drawPath(1.3)} />
  </svg>
)

export const DiagramSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftContentRef = useRef<HTMLDivElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const diagramsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Left side content stagger
    const leftElements = leftContentRef.current?.children ? Array.from(leftContentRef.current.children) : []
    gsap.fromTo(leftElements,
      { opacity: 0, x: -50 },
      {
        opacity: 1, x: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    )

    // Tags stagger
    const tags = tagsRef.current?.children ? Array.from(tagsRef.current.children) : []
    gsap.fromTo(tags,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: leftContentRef.current,
          start: 'top 70%',
        }
      }
    )

    // Diagram cards stagger and parallax
    const diagrams = diagramsRef.current?.children ? Array.from(diagramsRef.current.children) : []
    gsap.fromTo(diagrams,
      { opacity: 0, y: 100, rotateY: -15 },
      {
        opacity: 1, y: 0, rotateY: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      }
    )

    // Independent parallax for the diagrams
    diagrams.forEach((diagram, i) => {
      gsap.to(diagram, {
        y: i === 1 ? -40 : -80, // Middle one floats differently
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      })
    })

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative z-10 bg-[#0a0a0a] py-32 border-t border-white/[0.06] perspective-[1000px]">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* ── LEFT TEXT ───────────────────────────────────────────── */}
          <div>
            <div ref={leftContentRef}>
              <span className="text-[10px] font-mono tracking-[0.28em] text-white/30 uppercase mb-10 block">
                03 / Technology
              </span>

              <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-bold tracking-[-0.03em] leading-[1.1] text-white mb-8">
                Scientific Rigor.
                <br />
                <span className="text-white/40">Commercial Precision.</span>
                <br />
                Unmatched Trust.
              </h2>

              <p className="text-[14.5px] leading-[1.8] text-white/40 max-w-[440px] mb-12">
                We're the first to bring Atmospheric-Based Digital MRV to corporate climate action—turning real-world emissions data into verified insight your board and regulators trust.
              </p>
            </div>

            {/* Pill tags */}
            <div ref={tagsRef} className="flex flex-wrap gap-3">
              {['EPA-Standard', 'NOAA Sensors', 'Blockchain MRV', 'ISO 14064'].map((tag) => (
                <span key={tag} className="px-4 py-1.5 rounded-full border border-white/10 text-[10.5px] font-mono tracking-wider text-white/40 hover:border-[#a3e635]/40 hover:text-[#a3e635] transition-all duration-300 cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT: THREE SVG DIAGRAMS ───────────────────────────── */}
          <div ref={diagramsRef} className="grid grid-cols-3 gap-4 will-change-transform">
            {[
              { Svg: TowerSVG,      label: 'Flux Tower' },
              { Svg: BlockchainSVG, label: 'Blockchain MRV' },
              { Svg: SatelliteSVG,  label: 'Satellite Link' },
            ].map(({ Svg, label }, i) => (
              <div
                key={label}
                className="glass rounded-2xl p-6 flex flex-col items-center gap-4 will-change-transform"
              >
                <motion.svg
                  viewBox={i === 1 ? '0 0 260 220' : '0 0 200 300'}
                  className="w-full h-32 md:h-40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.15 }}
                >
                  <Svg />
                </motion.svg>
                <span className="text-[9px] font-mono tracking-[0.2em] text-white/25 uppercase text-center">{label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
