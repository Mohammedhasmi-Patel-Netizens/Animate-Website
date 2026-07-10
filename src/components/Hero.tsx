import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import WaterWaveImport from 'react-water-wave'

// Handle Vite CJS/ESM interop issue where default export is nested
const WaterWave = (WaterWaveImport as any).default || WaterWaveImport

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
}
const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as any } }
}

export const Hero = () => {
  const container = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start']
  })

  const textY   = useTransform(scrollYProgress, [0, 1], [0, 180])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <WaterWave
      imageUrl="/ecosystem-banner.png" // Using an existing dark image for the ripple texture
      dropRadius={20}
      perturbance={0.03}
      resolution={512}
      className="relative min-h-screen bg-[#0a0a0a] overflow-hidden"
      style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {() => (
        <section ref={container} className="relative min-h-screen flex items-center noise w-full">
          {/* Overlay to darken the image so it matches the brand aesthetic */}
          <div className="absolute inset-0 bg-[#0a0a0a]/90 pointer-events-none" />

          {/* Subtle radial glow */}
          <div className="absolute top-0 left-0 w-[900px] h-[900px] bg-[#a3e635]/5 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#a3e635]/3 rounded-full blur-[140px] pointer-events-none" />

          {/* Faint grid */}
          <div className="absolute inset-0 grid-pattern pointer-events-none opacity-60" />

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 items-center">
            
            {/* TEXT COLUMN */}
            <motion.div
              style={{ y: textY, opacity }}
              variants={stagger}
              initial="hidden"
              animate="show"
              className="flex flex-col"
            >
              {/* Tag */}
              <motion.div variants={fadeUp} className="mb-8">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#a3e635]/30 text-[#a3e635] text-[10px] font-mono tracking-[0.22em] uppercase bg-[#0a0a0a]/50 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse" />
                  Environmental Intelligence
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="text-[clamp(2.8rem,6vw,5.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white mb-8"
              >
                Where Ecosystem
                <br />
                Science and
                <br />
                Enterprise Strategy
                <br />
                <span className="text-[#a3e635]">Meet</span>
              </motion.h1>

              {/* CTA */}
              <motion.div variants={fadeUp} className="mb-10">
                <button className="px-6 py-2.5 cursor-pointer rounded-full text-[11px] font-bold tracking-[0.2em] uppercase border border-white/20 text-white hover:bg-white hover:text-[#0a0a0a] transition-all duration-300 bg-[#0a0a0a]/50 backdrop-blur-sm">
                  Let's Talk
                </button>
              </motion.div>

              {/* Body copy */}
              <motion.p
                variants={fadeUp}
                className="text-[15px] leading-[1.75] text-white max-w-[400px]"
              >
                Know your impact—precisely.
                <br />
                End-to-end environmental intelligence powered by science, blockchain, and transparent data you can trust.
              </motion.p>

              {/* Stats row */}
              <motion.div variants={fadeUp} className="mt-12 flex items-center gap-10 border-t border-white/[0.07] pt-10">
                {[
                  { val: '2.4M+', label: 'tCO₂e Verified' },
                  { val: '99.9%', label: 'Data Accuracy' },
                  { val: '40+',   label: 'Countries' },
                ].map(({ val, label }) => (
                  <div key={label}>
                    <div className="text-2xl font-bold text-white font-mono tracking-tight">{val}</div>
                    <div className="text-[10px] font-semibold tracking-[0.18em] text-white/35 uppercase mt-1">{label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* HUD OVERLAYS & ROCKS */}
            <div className="relative h-[600px] lg:h-[700px] pointer-events-none">
              {/* Rock 1 — big center */}
              <div className="absolute top-[5%] right-[5%] w-[340px] float-1 drop-shadow-2xl z-10 pointer-events-auto cursor-pointer">
                <img src="/rocks.png" alt="Mossy ecosystem rock" className="w-full h-full object-contain" />
              </div>
              {/* Rock 2 — bottom left offset */}
              <div className="absolute bottom-[5%] left-[0%] w-[200px] float-2 drop-shadow-2xl z-0 opacity-80 pointer-events-auto cursor-pointer">
                <img src="/rock-left.png" alt="Gray rock" className="w-full h-full object-contain" />
              </div>
              {/* Rock 3 — small top accent */}
              <div className="absolute top-[30%] left-[10%] w-[130px] float-1 drop-shadow-2xl opacity-70 pointer-events-auto cursor-pointer" style={{ animationDelay: '2s' }}>
                <img src="/rock-right.png" alt="Accent rock" className="w-full h-full object-contain" />
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute top-[18%] left-[0%] glass px-4 py-3 rounded-xl text-left pointer-events-auto"
              >
                <div className="text-[9px] font-mono tracking-widest text-white/40 uppercase mb-1">CO₂ Flux</div>
                <div className="text-[22px] font-mono font-bold text-[#a3e635] leading-none">-2.41</div>
                <div className="text-[9px] font-mono text-white/40 mt-1">tCO₂e / ha / yr</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-[20%] right-[2%] glass px-4 py-3 rounded-xl text-left pointer-events-auto"
              >
                <div className="text-[9px] font-mono tracking-widest text-white/40 uppercase mb-1">Blockchain</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse" />
                  <span className="text-[11px] font-mono text-white">Verified ✓</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-4 right-4 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
                <span className="text-[10px] uppercase tracking-widest text-white/30 font-mono">Scroll to discover</span>
              </motion.div>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
        </section>
      )}
    </WaterWave>
  )
}
