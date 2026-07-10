import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    title: 'Scientific Credibility',
    body: 'U.S. EPA & NOAA-standard monitoring systems with peer-reviewed methodologies for rigorous environmental data collection.',
  },
  {
    title: 'World-Class Understories',
    body: 'Distributed IoT networks across biomes, capturing hyper-local soil, moisture, biodiversity, and flux tower readings.',
  },
  {
    title: 'Blockchain-Backed Traceability',
    body: 'Every data point cryptographically hashed and anchored on a public ledger, ensuring tamper-proof chain of custody.',
  },
  {
    title: 'Enterprise Compliance Ready',
    body: 'Pre-built integrations for CDP, TCFD, SBTi and all major voluntary and compliance carbon market frameworks.',
  },
]

export const ProductGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return
    const q = gsap.utils.selector(containerRef.current)

    // Master pinning timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%', // Pin for 200vh
        pin: true,
        scrub: 1, // Smooth scrubbing
      }
    })

    // Setup initial states
    const items = q('.feature-item')
    const img1 = q('.img-1')
    const img2 = q('.img-2')
    const progressLine = q('.progress-line')

    // Dim all items except first
    gsap.set(items.slice(1), { opacity: 0.2, x: 20 })
    gsap.set(items[0], { opacity: 1, x: 0 })

    // Images initial 3D states
    gsap.set(img1, { scale: 1, rotateY: 0, zIndex: 10 })
    gsap.set(img2, { scale: 0.8, opacity: 0, y: 100, rotateY: -15, zIndex: 5 })
    gsap.set(progressLine, { scaleY: 0 })

    // Build the scrub animation
    // Step 1: Highlight 2nd item, swap images
    tl.to(items[0], { opacity: 0.2, x: 20, duration: 1 }, 0)
      .to(items[1], { opacity: 1, x: 0, duration: 1 }, 0)
      .to(progressLine, { scaleY: 0.33, duration: 1, ease: 'none' }, 0)
      .to(img1, { scale: 0.8, opacity: 0, y: -100, rotateY: 15, duration: 1 }, 0)
      .to(img2, { scale: 1, opacity: 1, y: 0, rotateY: 0, duration: 1 }, 0)

    // Step 2: Highlight 3rd item, tweak image 2
    tl.to(items[1], { opacity: 0.2, x: 20, duration: 1 }, 1)
      .to(items[2], { opacity: 1, x: 0, duration: 1 }, 1)
      .to(progressLine, { scaleY: 0.66, duration: 1, ease: 'none' }, 1)
      .to(img2, { scale: 1.05, duration: 1 }, 1)

    // Step 3: Highlight 4th item, tweak image 2 further
    tl.to(items[2], { opacity: 0.2, x: 20, duration: 1 }, 2)
      .to(items[3], { opacity: 1, x: 0, duration: 1 }, 2)
      .to(progressLine, { scaleY: 1, duration: 1, ease: 'none' }, 2)
      .to(img2, { scale: 1.1, duration: 1 }, 2)

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative z-10 bg-[#0a0a0a] h-screen w-full flex items-center overflow-hidden shadow-[0_-20px_50px_rgba(10,10,10,1)] perspective-[1200px]">
      <div className="w-full max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col justify-center h-full">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">

          {/* ── LEFT COLUMN — FEATURE LIST ──────────────────────────── */}
          <div className="relative">
            <div className="mb-12">
              <span className="text-[10px] font-mono tracking-[0.28em] text-[#a3e635] uppercase">
                02 / Platform Capabilities
              </span>
            </div>

            {/* Progress line tracker */}
            <div className="absolute left-0 top-[100px] bottom-0 w-[1px] bg-white/10 hidden md:block">
              <div className="progress-line absolute top-0 left-0 w-full h-full bg-[#a3e635] origin-top" />
            </div>

            <div className="space-y-8 md:pl-8">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="feature-item cursor-pointer origin-left will-change-transform"
                >
                  <h3 className="text-[1.2rem] md:text-[1.5rem] font-bold tracking-[-0.01em] text-white mb-2">
                    {f.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-white/50 max-w-[420px]">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN — PINNED IMAGERY ───────────────────────── */}
          <div className="relative h-[400px] md:h-[600px] w-full perspective-[1000px]">

            {/* Image 1: Leaves photo */}
            <div className="img-1 absolute inset-0 overflow-hidden rounded-2xl will-change-transform transform-gpu shadow-2xl shadow-[#a3e635]/5 border border-white/5">
              <img
                src="/leaves.png"
                alt="Organic leaves close-up"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-transparent" />
            </div>

            {/* Image 2: Neon accent block */}
            <div className="img-2 absolute inset-0 bg-[#a3e635] rounded-2xl p-10 flex flex-col justify-end overflow-hidden will-change-transform transform-gpu shadow-2xl border border-white/10">
              {/* Decorative background vectors */}
              <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#0a0a0a]/5 blur-3xl" />
              <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-[#0a0a0a]/10" />

              <div className="relative z-10">
                <span className="text-[10px] font-mono tracking-[0.24em] text-[#0a0a0a]/50 uppercase mb-4 block">
                  Market Integrity
                </span>
                <h3 className="text-[2rem] md:text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#0a0a0a] mb-4">
                  Built on Truth,
                  <br />
                  Not Estimates.
                </h3>
                <p className="text-[14px] text-[#0a0a0a]/70 font-medium leading-relaxed max-w-[340px]">
                  Real-World Emissions Data structured instantly for Enterprise-Wide Climate Clarity and compliance validation.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
