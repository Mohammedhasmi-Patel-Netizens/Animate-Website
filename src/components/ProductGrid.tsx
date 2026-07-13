import { useRef, useEffect } from 'react'
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

    // --- Entry Animation ---
    gsap.from(q('.section-label'), {
      y: 20, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
    })
    
    gsap.from(q('.feature-item'), {
      y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 70%' }
    })

    gsap.from(q('.right-col-visual'), {
      scale: 0.9, opacity: 0, rotateY: 15, duration: 1.2, ease: 'power4.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 60%' }
    })

    // --- Master pinning timeline ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%', // Pin for 300vh to give more time for scrolling
        pin: true,
        scrub: 1, // Smooth scrubbing
      }
    })

    // Setup initial states
    const items = q('.feature-item')
    const img1 = q('.img-1')
    const img2 = q('.img-2')
    const img3 = q('.img-3') // Added a 3rd visual state for more dynamic scroll
    const img4 = q('.img-4') // Added a 4th visual state
    const progressLine = q('.progress-line')

    // Dim all items except first
    gsap.set(items, { opacity: 0.2, x: 20, scale: 0.95 })
    gsap.set(items[0], { opacity: 1, x: 0, scale: 1 })

    // Images initial 3D states
    gsap.set(img1, { scale: 1, rotateY: 0, rotateX: 0, zIndex: 40, opacity: 1, y: 0 })
    gsap.set(img2, { scale: 0.8, opacity: 0, y: 150, rotateY: -25, rotateX: 10, zIndex: 30 })
    gsap.set(img3, { scale: 0.6, opacity: 0, y: 200, rotateY: -35, rotateX: 15, zIndex: 20 })
    gsap.set(img4, { scale: 0.4, opacity: 0, y: 250, rotateY: -45, rotateX: 20, zIndex: 10 })
    gsap.set(progressLine, { scaleY: 0 })

    // Build the scrub animation
    // Step 1: Highlight 2nd item
    tl.to(items[0], { opacity: 0.2, x: 20, scale: 0.95, duration: 1 }, 0)
      .to(items[1], { opacity: 1, x: 0, scale: 1, duration: 1 }, 0)
      .to(progressLine, { scaleY: 0.33, duration: 1, ease: 'none' }, 0)
      .to(img1, { scale: 1.1, opacity: 0, y: -150, rotateY: 20, rotateX: -10, filter: 'blur(10px)', duration: 1 }, 0)
      .to(img2, { scale: 1, opacity: 1, y: 0, rotateY: 0, rotateX: 0, duration: 1 }, 0)

    // Step 2: Highlight 3rd item
    tl.to(items[1], { opacity: 0.2, x: 20, scale: 0.95, duration: 1 }, 1)
      .to(items[2], { opacity: 1, x: 0, scale: 1, duration: 1 }, 1)
      .to(progressLine, { scaleY: 0.66, duration: 1, ease: 'none' }, 1)
      .to(img2, { scale: 1.1, opacity: 0, y: -150, rotateY: 20, rotateX: -10, filter: 'blur(10px)', duration: 1 }, 1)
      .to(img3, { scale: 1, opacity: 1, y: 0, rotateY: 0, rotateX: 0, duration: 1 }, 1)

    // Step 3: Highlight 4th item
    tl.to(items[2], { opacity: 0.2, x: 20, scale: 0.95, duration: 1 }, 2)
      .to(items[3], { opacity: 1, x: 0, scale: 1, duration: 1 }, 2)
      .to(progressLine, { scaleY: 1, duration: 1, ease: 'none' }, 2)
      .to(img3, { scale: 1.1, opacity: 0, y: -150, rotateY: 20, rotateX: -10, filter: 'blur(10px)', duration: 1 }, 2)
      .to(img4, { scale: 1, opacity: 1, y: 0, rotateY: 0, rotateX: 0, duration: 1 }, 2)

    // --- Floating Elements Animation ---
    gsap.to(q('.floating-orb'), {
      y: 'random(-30, 30)',
      x: 'random(-30, 30)',
      rotation: 'random(-45, 45)',
      duration: 'random(3, 6)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.5
    })

    // --- Mouse Parallax ---
    const xTo = gsap.quickTo(q('.parallax-layer'), "x", {duration: 0.8, ease: "power3.out"})
    const yTo = gsap.quickTo(q('.parallax-layer'), "y", {duration: 0.8, ease: "power3.out"})
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 40
      const y = (clientY / window.innerHeight - 0.5) * 40
      xTo(x)
      yTo(y)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative z-10 bg-[#0a0a0a] h-screen w-full flex items-center overflow-hidden shadow-[0_-20px_50px_rgba(10,10,10,1)] perspective-[1200px]">
      
      {/* Background ambient glows */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#a3e635]/5 rounded-full blur-[120px] pointer-events-none floating-orb" />
      <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-[#a3e635]/5 rounded-full blur-[150px] pointer-events-none floating-orb" />
      
      <div className="w-full max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col justify-center h-full parallax-layer">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">

          {/* ── LEFT COLUMN — FEATURE LIST ──────────────────────────── */}
          <div className="relative">
            <div className="mb-12 section-label">
              <span className="text-[10px] font-mono tracking-[0.28em] text-[#a3e635] uppercase bg-[#a3e635]/10 px-4 py-2 rounded-full border border-[#a3e635]/20 backdrop-blur-md">
                02 / Platform Capabilities
              </span>
            </div>

            {/* Progress line tracker */}
            <div className="absolute left-0 top-[100px] bottom-0 w-[2px] bg-white/5 hidden md:block rounded-full overflow-hidden">
              <div className="progress-line absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#a3e635] to-[#74a822] origin-top shadow-[0_0_10px_rgba(163,230,53,0.5)]" />
            </div>

            <div className="space-y-8 md:pl-10">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className={`feature-item cursor-pointer origin-left will-change-transform flex flex-col group`}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="text-[12px] font-mono text-[#a3e635]/50 group-hover:text-[#a3e635] transition-colors duration-300">
                      0{i + 1}
                    </div>
                    <h3 className="text-[1.2rem] md:text-[1.6rem] font-bold tracking-[-0.01em] text-white/90 group-hover:text-white transition-colors duration-300">
                      {f.title}
                    </h3>
                  </div>
                  <p className="text-[15px] leading-[1.6] text-white/40 max-w-[440px] pl-8 group-hover:text-white/60 transition-colors duration-300">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN — PINNED IMAGERY ───────────────────────── */}
          <div className="relative h-[450px] md:h-[650px] w-full perspective-[1200px] right-col-visual">

            {/* Image 1: Leaves photo */}
            <div className="img-1 absolute inset-0 overflow-hidden rounded-[2rem] will-change-transform transform-gpu shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/5">
              <img
                src="/leaves.png"
                alt="Organic leaves close-up"
                className="w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-6 backdrop-blur-md bg-white/5">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h4 className="text-white text-2xl font-semibold mb-2">Scientific Rigor</h4>
                <p className="text-white/60 text-sm">Empirical environmental observation</p>
              </div>
            </div>

            {/* Image 2: IoT Networks */}
            <div className="img-2 absolute inset-0 overflow-hidden rounded-[2rem] will-change-transform transform-gpu shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/5 bg-[#0f1115]">
              {/* Grid background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[80%] h-48 border border-[#a3e635]/30 rounded-xl bg-[#a3e635]/5 backdrop-blur-sm p-6 flex flex-col justify-between">
                <div className="flex justify-between items-center border-b border-[#a3e635]/20 pb-4">
                  <span className="text-[#a3e635] font-mono text-sm">NODE_084_ACTIVE</span>
                  <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse"></span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-white/50 text-xs mb-1">CO2 FLUX</div>
                    <div className="text-white text-3xl font-light">14.2<span className="text-white/30 text-lg"> μmol</span></div>
                  </div>
                  {/* Mini chart visual */}
                  <div className="flex items-end gap-1 h-12">
                    {[4,7,5,8,6,9,7].map((h, i) => (
                      <div key={i} className="w-2 bg-[#a3e635]/50 rounded-t-sm" style={{ height: `${h * 10}%` }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Image 3: Blockchain */}
            <div className="img-3 absolute inset-0 overflow-hidden rounded-[2rem] will-change-transform transform-gpu shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-[#a3e635]/20 bg-[#050a05]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#a3e635]/10 via-transparent to-transparent"></div>
              
              <div className="h-full w-full flex flex-col p-10 font-mono">
                <div className="text-[#a3e635] text-sm mb-8 opacity-70">LATEST_BLOCK_HASH</div>
                <div className="space-y-4 text-xs text-white/40 break-all leading-relaxed">
                  <p>0x8f2a9c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b</p>
                  <p className="text-[#a3e635]/80">0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b <span className="text-white">{'<-'} VERIFIED</span></p>
                  <p>0x9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d</p>
                  <p>0x4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c</p>
                  <p>0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b</p>
                </div>
                <div className="mt-auto flex items-center gap-3">
                  <div className="w-8 h-8 rounded border border-[#a3e635]/30 flex items-center justify-center">
                    <div className="w-3 h-3 bg-[#a3e635]"></div>
                  </div>
                  <span className="text-white text-lg tracking-widest">IMMUTABLE</span>
                </div>
              </div>
            </div>

            {/* Image 4: Neon accent block */}
            <div className="img-4 absolute inset-0 bg-gradient-to-br from-[#a3e635] to-[#86c522] rounded-[2rem] p-10 flex flex-col justify-end overflow-hidden will-change-transform transform-gpu shadow-[0_30px_60px_-15px_rgba(163,230,53,0.3)] border border-white/20">
              {/* Decorative background vectors */}
              <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/10 blur-3xl mix-blend-overlay" />
              <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-black/10 mix-blend-overlay" />

              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-black/10 rounded-full text-[10px] font-mono tracking-[0.24em] text-black/70 uppercase mb-6 backdrop-blur-sm border border-black/5">
                  Market Integrity
                </span>
                <h3 className="text-[2.2rem] md:text-[2.8rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#0a0a0a] mb-5">
                  Built on Truth,
                  <br />
                  Not Estimates.
                </h3>
                <p className="text-[15px] text-[#0a0a0a]/80 font-medium leading-[1.6] max-w-[340px]">
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
