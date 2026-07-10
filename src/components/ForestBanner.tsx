import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export const ForestBanner = () => {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  // The card recession animations (happens at the very end of the scroll: 0.8 -> 1)
  const scale = useTransform(scrollYProgress, [0.8, 1], [1, 0.85])
  const borderRadius = useTransform(scrollYProgress, [0.8, 1], ['0px', '48px'])
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0.3])
  const y = useTransform(scrollYProgress, [0.8, 1], ['0%', '10%'])

  // Internal parallax for the background image
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25])

  // Staggered scroll-scrubbed effects for text & HUD
  // Phase 1 (0 to 0.2): Background only.
  // Phase 2 (0.2 to 0.5): Text fades in.
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.7, 0.9], [0, 1, 1, 0])
  const textY = useTransform(scrollYProgress, [0.2, 0.4, 0.7, 0.9], [50, 0, 0, -50])

  const labelOpacity = useTransform(scrollYProgress, [0.25, 0.45, 0.7, 0.9], [0, 1, 1, 0])
  const labelX = useTransform(scrollYProgress, [0.25, 0.45, 0.7, 0.9], [-30, 0, 0, -30])

  const marker1Opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7, 0.9], [0, 1, 1, 0])
  const marker1Scale = useTransform(scrollYProgress, [0.3, 0.5, 0.7, 0.9], [0, 1, 1, 0.5])

  const marker2Opacity = useTransform(scrollYProgress, [0.35, 0.55, 0.7, 0.9], [0, 1, 1, 0])
  const marker2Scale = useTransform(scrollYProgress, [0.35, 0.55, 0.7, 0.9], [0, 1, 1, 0.5])

  const marker3Opacity = useTransform(scrollYProgress, [0.4, 0.6, 0.7, 0.9], [0, 1, 1, 0])
  const marker3Scale = useTransform(scrollYProgress, [0.4, 0.6, 0.7, 0.9], [0, 1, 1, 0.5])

  const containerScale = useTransform(scrollYProgress, [0.7, 1], [1, 1.7])

  // Phase 3 (0.5 to 0.8): Background changes
  const bg2Opacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1])
  const bg2Scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2])

  return (
    <section
      ref={ref}
      className="relative h-[300vh] bg-[#0a0a0a]"
      style={{ zIndex: 0 }}
    >
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden">
        <motion.div
          style={{ scale, borderRadius, opacity, y }}
          className="relative w-full h-full overflow-hidden origin-top"
        >
          {/* Parallax background */}
          <motion.div
            style={{ scale: bgScale }}
            className="absolute inset-[-10%] z-0"
          >
            <img
              src="/forest.png"
              alt="Forest ecosystem with sensors"
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#0a0a0a]/55" />
          </motion.div>

          {/* Content - HUD Layout */}
          <motion.div
            style={{ scale: containerScale }}
            className="relative z-10 w-full h-full flex flex-col items-center justify-center max-w-[1400px] mx-auto px-8 md:px-16 origin-center"
          >
            {/* Top Left Label */}
            <motion.div
              style={{ opacity: labelOpacity, x: labelX }}
              className="absolute top-[15%] left-[8%] md:left-[10%] max-w-[200px] text-left"
            >
              <p className="text-[9px] font-mono tracking-widest text-white/80 uppercase leading-relaxed font-bold">
                Real-Time<br />
                Blockchain-Backed<br />
                Carbon Intelligence
              </p>
            </motion.div>

            {/* Main Centered Text */}
            <motion.div
              style={{ opacity: textOpacity, y: textY }}
              className="mx-auto max-w-[800px] text-center mt-[-5%]"
            >
              <h2 className="text-[clamp(1.5rem,3.5vw,2.8rem)] font-medium leading-[1.25] tracking-tight text-white drop-shadow-md">
                Our Ecosystem-Level Accounting<br className="hidden md:block" />
                Solutions translate complex<br className="hidden md:block" />
                scientific data into verifiable,<br className="hidden md:block" />
                compliance-ready metrics—so<br className="hidden md:block" />
                you can drive measurable results,<br className="hidden md:block" />
                not just reports.
              </h2>
            </motion.div>

            {/* HUD Markers Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Marker 1 (Bottom Left) */}
              <motion.div
                style={{ opacity: marker1Opacity, scale: marker1Scale }}
                className="absolute bottom-[25%] left-[15%] flex items-center gap-3"
              >
                <div className="w-7 h-7 rounded-full bg-[#a3e635]/80 backdrop-blur-md flex items-center justify-center relative shadow-[0_0_20px_rgba(163,230,53,0.5)]">
                  <span className="w-3 h-3 border border-[#0a0a0a]/40 rounded-full flex items-center justify-center">
                    <span className="w-1 h-1 bg-[#0a0a0a] rounded-full" />
                  </span>
                </div>
                <p className="text-[7px] font-mono tracking-widest text-white/90 uppercase leading-tight font-bold drop-shadow-sm text-left">
                  All Emissions<br />
                  Measured Using High<br />
                  Grade Tech
                </p>
              </motion.div>

              {/* Marker 2 (Center Bottom) */}
              <motion.div
                style={{ opacity: marker2Opacity, scale: marker2Scale }}
                className="absolute bottom-[35%] left-[55%] flex items-center gap-3"
              >
                <div className="w-7 h-7 rounded-full bg-[#a3e635]/80 backdrop-blur-md flex items-center justify-center relative shadow-[0_0_20px_rgba(163,230,53,0.5)]">
                  <span className="w-3 h-3 border border-[#0a0a0a]/40 rounded-full flex items-center justify-center">
                    <span className="w-1 h-1 bg-[#0a0a0a] rounded-full" />
                  </span>
                </div>
                <p className="text-[7px] font-mono tracking-widest text-white/90 uppercase leading-tight font-bold drop-shadow-sm text-left">
                  All Measurement<br />
                  Data is Validated<br />
                  By Protocol
                </p>
              </motion.div>

              {/* Marker 3 (Right Center) */}
              <motion.div
                style={{ opacity: marker3Opacity, scale: marker3Scale }}
                className="absolute bottom-[20%] right-[15%] flex items-center gap-3"
              >
                <div className="w-7 h-7 rounded-full bg-[#a3e635]/80 backdrop-blur-md flex items-center justify-center relative shadow-[0_0_20px_rgba(163,230,53,0.5)]">
                  <span className="w-3 h-3 border border-[#0a0a0a]/40 rounded-full flex items-center justify-center">
                    <span className="w-1 h-1 bg-[#0a0a0a] rounded-full" />
                  </span>
                </div>
                <p className="text-[7px] font-mono tracking-widest text-white/90 uppercase leading-tight font-bold drop-shadow-sm text-left">
                  Fully Transparent<br />
                  Blockchain Ledger<br />
                  Integrated
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Second Parallax Background (fades in with text) */}
          <motion.div
            style={{ scale: bg2Scale, opacity: bg2Opacity }}
            className="absolute inset-[-10%] z-0"
          >
            <img
              src="/ecosystem-banner.png" // The second background image
              alt="Ecosystem shift"
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#0a0a0a]/55" />
          </motion.div>

          {/* Side fade vignettes */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-30 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-30 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  )
}
