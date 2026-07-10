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
    // Header sweep in
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    )

    // Grid items stagger and parallax
    const gridItems = gridRef.current?.children ? Array.from(gridRef.current.children) : []
    
    gsap.fromTo(gridItems,
      { opacity: 0, y: 80, rotateX: 10 },
      {
        opacity: 1, y: 0, rotateX: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        }
      }
    )

    // Scrub parallax on the grid itself
    gsap.to(gridRef.current, {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    })

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative z-10 bg-[#f5f5f3] py-32 overflow-hidden perspective-[1000px]">
      <div className="max-w-[1100px] mx-auto px-8 md:px-16">

        {/* Headline */}
        <h2 
          ref={headerRef}
          className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.08] text-[#0a0a0a] text-center mb-20 will-change-transform"
        >
          We're Not Just Evolving the System.<br />
          <span className="text-[#0a0a0a]">We're Redefining It.</span>
        </h2>

        {/* 2×2 Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 will-change-transform">
          {points.map((p) => (
            <div
              key={p.num}
              className="flex items-start gap-5 p-8 rounded-2xl bg-white border border-black/[0.06] hover:shadow-lg transition-shadow duration-500 will-change-transform"
            >
              <span className="shrink-0 w-10 h-10 rounded-full bg-[#a3e635] flex items-center justify-center text-[12px] font-bold text-[#0a0a0a]">
                {p.num}
              </span>
              <p className="text-[15px] leading-[1.7] text-[#0a0a0a]/70 font-medium pt-2">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
