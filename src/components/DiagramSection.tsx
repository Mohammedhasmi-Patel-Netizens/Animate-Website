import { useRef, useEffect } from 'react'
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

  useGSAP(() => {
    if (!containerRef.current) return
    const q = gsap.utils.selector(containerRef.current)

    // Initial States
    gsap.set(q('.left-elem'), { opacity: 0, y: 30, filter: 'blur(10px)' })
    gsap.set(q('.pill-tag'), { opacity: 0, scale: 0.5, y: 20 })
    gsap.set(q('.diagram-card'), { opacity: 0, y: 150, z: -500, rotateX: 45, scale: 0.7 })

    // --- Floating Ambient Orbs ---
    gsap.to(q('.floating-orb'), {
      y: 'random(-40, 40)',
      x: 'random(-40, 40)',
      rotation: 'random(-30, 30)',
      duration: 'random(4, 7)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.6
    })

    // --- Mouse Parallax ---
    const xTo = gsap.quickTo(q('.parallax-layer'), "x", {duration: 0.8, ease: "power3.out"})
    const yTo = gsap.quickTo(q('.parallax-layer'), "y", {duration: 0.8, ease: "power3.out"})
    const cardXTo = gsap.quickTo(q('.diagram-container'), "rotateY", {duration: 0.5, ease: "power2.out"})
    const cardYTo = gsap.quickTo(q('.diagram-container'), "rotateX", {duration: 0.5, ease: "power2.out"})

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 30
      const y = (clientY / window.innerHeight - 0.5) * 30
      
      xTo(x)
      yTo(y)
      
      // 3D tilt based on mouse position for the diagrams
      cardXTo((clientX / window.innerWidth - 0.5) * 20)
      cardYTo(-(clientY / window.innerHeight - 0.5) * 20)
    }

    window.addEventListener('mousemove', handleMouseMove)

    // --- Master Pinned Scrubbing Timeline ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%', // Pin the section for 2 viewport heights for a luxurious long scroll
        pin: true,
        scrub: 1, // Smooth interaction
      }
    })

    // Phase 1: Left text unblurs and slides in sequentially
    tl.to(q('.left-elem'), {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      stagger: 0.15,
      duration: 1.2,
      ease: 'power3.out'
    }, 0)

    // Phase 2: Pill tags pop in rapidly
    tl.to(q('.pill-tag'), {
      opacity: 1,
      scale: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: 'back.out(1.5)'
    }, 0.5)

    // Phase 3: The SVG diagram cards fly into existence, dramatically from Z-space
    tl.to(q('.diagram-card'), {
      opacity: 1,
      y: 0,
      z: 0,
      rotateX: 0,
      scale: 1,
      stagger: 0.25,
      duration: 1.8,
      ease: 'power4.out'
    }, 0.7)

    // Phase 4: A dynamic 3D fan-out effect as you complete the scroll
    tl.to(q('.diagram-card')[0], { y: -30, rotateZ: -6, rotateY: 10, scale: 1.05, duration: 1.5 }, 2)
      .to(q('.diagram-card')[1], { y: 15, rotateZ: 0, scale: 1.1, duration: 1.5, border: '1px solid rgba(163,230,53,0.3)', boxShadow: '0 0 40px rgba(163,230,53,0.1)' }, 2.2)
      .to(q('.diagram-card')[2], { y: -30, rotateZ: 6, rotateY: -10, scale: 1.05, duration: 1.5 }, 2.4)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative z-10 bg-[#0a0a0a] h-screen w-full flex items-center overflow-hidden border-t border-white/[0.06] perspective-[1500px]">
      
      {/* Background ambient glows matching ProductGrid */}
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-[#a3e635]/5 rounded-full blur-[150px] pointer-events-none floating-orb" />
      <div className="absolute bottom-1/4 -left-32 w-[500px] h-[500px] bg-[#a3e635]/5 rounded-full blur-[120px] pointer-events-none floating-orb" />

      <div className="w-full max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col justify-center h-full parallax-layer">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* ── LEFT TEXT ───────────────────────────────────────────── */}
          <div className="relative z-10">
            <div>
              <span className="left-elem text-[10px] font-mono tracking-[0.28em] text-[#a3e635] uppercase bg-[#a3e635]/10 px-4 py-2 rounded-full border border-[#a3e635]/20 backdrop-blur-md inline-block mb-10 will-change-transform origin-left">
                03 / Technology
              </span>

              <h2 className="left-elem text-[clamp(2.2rem,4vw,3.6rem)] font-bold tracking-[-0.03em] leading-[1.1] text-white mb-8 will-change-transform origin-left">
                Scientific Rigor.
                <br />
                <span className="text-[#a3e635]">Commercial Precision.</span>
                <br />
                Unmatched Trust.
              </h2>

              <p className="left-elem text-[15px] leading-[1.8] text-white/50 max-w-[460px] mb-12 will-change-transform origin-left font-medium">
                We're the first to bring Atmospheric-Based Digital MRV to corporate climate action—turning real-world emissions data into verified insight your board and regulators trust.
              </p>
            </div>

            {/* Pill tags */}
            <div className="flex flex-wrap gap-3">
              {['EPA-Standard', 'NOAA Sensors', 'Blockchain MRV', 'ISO 14064'].map((tag) => (
                <span key={tag} className="pill-tag px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[11px] font-mono tracking-wider text-white/60 hover:border-[#a3e635]/50 hover:text-[#a3e635] hover:bg-[#a3e635]/10 hover:shadow-[0_0_20px_rgba(163,230,53,0.2)] hover:scale-105 transition-all duration-300 cursor-default will-change-transform">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT: THREE SVG DIAGRAMS ───────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-[1200px] diagram-container transform-gpu will-change-transform">
            {[
              { Svg: TowerSVG,      label: 'Flux Tower' },
              { Svg: BlockchainSVG, label: 'Blockchain MRV' },
              { Svg: SatelliteSVG,  label: 'Satellite Link' },
            ].map(({ Svg, label }, i) => (
              <div
                key={label}
                className="diagram-card glass rounded-[1.5rem] p-6 flex flex-col items-center justify-center gap-6 will-change-transform transform-gpu shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 bg-[#111111]/80 backdrop-blur-xl hover:bg-[#151515] hover:border-[#a3e635]/30 hover:shadow-[0_10px_40px_rgba(163,230,53,0.15)] transition-all duration-500 relative group overflow-hidden"
              >
                {/* Subtle hover gradient inside card */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#a3e635]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <motion.svg
                  viewBox={i === 1 ? '0 0 260 220' : '0 0 200 300'}
                  className="w-full h-28 md:h-40 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_25px_rgba(163,230,53,0.4)] transition-all duration-500 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.15 }}
                >
                  <g className="text-white group-hover:text-[#a3e635] transition-colors duration-500">
                    <Svg />
                  </g>
                </motion.svg>
                
                <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase text-center group-hover:text-[#a3e635] transition-colors duration-500 relative z-10">
                  {label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
