import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const points = [
  {
    num: '01',
    text: 'Bring WMO-grade atmospheric monitoring to commercial use',
  },
  {
    num: '02',
    text: 'Integrate real-time sensors, GHG flux tracking, & satellite imaging into one platform',
  },
  {
    num: '03',
    text: 'Apply algorithmic processing at every stage of data collection',
  },
  {
    num: '04',
    text: 'Secure every metric with blockchain for complete traceability and auditability',
  },
]

export const RedefiningSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // --- Cinematic Scroll Scrubbing ---
    
    // 1. Separate timeline for animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%', // Start animating before pinning
        end: '+=200%', 
        scrub: 1.5,
      }
    })

    // 2. Separate trigger for pinning
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=200%',
      pin: true,
    })

    const gridItems = gridRef.current?.children ? Array.from(gridRef.current.children) : []

    // Initial States
    gsap.set(headerRef.current, { opacity: 0, y: 100, scale: 1.1, filter: 'blur(15px)' })
    gsap.set(gridItems, { opacity: 0, y: window.innerHeight * 0.8, z: -400, rotateX: 30, scale: 0.8 })

    // Phase 1: Header cinematic slam
    tl.to(headerRef.current, {
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: 'blur(0px)',
      duration: 1.5,
      ease: 'power4.out',
    })

    // Phase 2: Grid items swooping in 3D stagger
    tl.to(gridItems, {
      opacity: 1,
      y: 0,
      z: 0,
      rotateX: 0,
      scale: 1,
      duration: 2,
      stagger: 0.2, // Sequential stagger for each box
      ease: 'power3.out',
    }, '-=0.5') // overlap with header

    // Phase 3: Gentle parallax drift to end
    tl.to([headerRef.current, ...gridItems], {
      y: -40,
      duration: 1.5,
      ease: 'none',
    })

    // Force a refresh
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative z-10 bg-[#f5f5f3] h-screen w-full flex items-center justify-center overflow-hidden perspective-[1200px]">
      <div className="max-w-[1100px] w-full mx-auto px-8 md:px-16 flex flex-col items-center justify-center">

        {/* Headline */}
        <h2 
          ref={headerRef}
          className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.08] text-[#0a0a0a] text-center mb-20 will-change-transform"
        >
          We're Not Just Evolving the System.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#74a822] to-[#a3e635]">We're Redefining It.</span>
        </h2>

        {/* 2×2 Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 will-change-transform w-full">
          {points.map((p) => (
            <div
              key={p.num}
              className="flex items-start gap-5 p-8 rounded-2xl bg-white border border-black/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-shadow duration-500 will-change-transform"
            >
              <span className="shrink-0 w-12 h-12 rounded-full bg-[#a3e635] flex items-center justify-center text-[13px] font-bold text-[#0a0a0a] shadow-inner">
                {p.num}
              </span>
              <p className="text-[16px] leading-[1.7] text-[#0a0a0a]/70 font-medium pt-3">
                {p.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
