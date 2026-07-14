import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const studies = [
  {
    category: 'BIOMASS / FORESTRY',
    title: 'Verifying 40,000 Hectares of Oregon Canopy',
    desc: 'Deploying high-frequency LiDAR and flux sensors to anchor carbon credits in real-time, reducing verification cycles from 18 months to 48 hours.',
    img: '/forest.png'
  },
  {
    category: 'AGRICULTURE / SOIL',
    title: 'Empowering Regenerative Iowa Farmlands',
    desc: 'Monitoring organic matter, soil respiration, and tillage practices across 120 farming hubs using smart API ledgers for automatic compliance rewards.',
    img: '/leaves.png'
  },
  {
    category: 'COASTAL / MANGROVES',
    title: 'Validating Florida Wetland Restorations',
    desc: 'Tracking blue carbon sequestration in tidal zones using meteorological sensors and satellite imagery overlays for public trust reporting.',
    img: '/ecosystem-banner.png'
  }
]

export const CaseStudies = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return
    const q = gsap.utils.selector(containerRef.current)

    // --- Initial States (All screens) ---
    const headerElements = headerRef.current?.children ? Array.from(headerRef.current.children) : []
    gsap.set(headerElements, { opacity: 0, y: 60, filter: 'blur(10px)' })
    gsap.set(q('.study-card'), { opacity: 0, y: 160, scale: 0.85, rotateX: 20 })

    // --- Entrance ScrollTrigger ---
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    })

    entranceTl.to(headerElements, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
    })

    // --- Pin Scroll Scrubbing Timeline ---
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: 1.2,
        pin: true,
      }
    })

    pinTl.to(q('.study-card'), {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      stagger: 0.25,
      duration: 2,
      ease: 'power3.out'
    })
  }, { scope: containerRef })

  return (
    <section id="resources" className="relative z-10 bg-[#f8f9fa] h-screen w-full flex items-center justify-center overflow-hidden border-t border-black/[0.05]" ref={containerRef}>
      
      {/* Background ambient glows */}
      <div className="absolute top-0 -right-32 w-[600px] h-[600px] bg-[#a3e635]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] bg-black/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col justify-center h-full relative z-10 py-6">
        
        {/* Header */}
        <div ref={headerRef} className="w-full mb-6 md:mb-12 text-center flex flex-col items-center">
          <div className="mb-2 md:mb-4">
            <span className="inline-block px-4 py-1.5 sm:px-5 sm:py-2 rounded-full border border-black/5 bg-black/5 backdrop-blur-sm text-[9px] sm:text-[10px] font-mono tracking-[0.28em] text-[#0a0a0a]/70 uppercase">
              Proven Results
            </span>
          </div>
          <h2 className="text-[clamp(1.4rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[#0a0a0a] max-w-[800px] mb-2">
            Case Studies in Ecosystem Accounting
          </h2>
          <p className="text-xs sm:text-[15px] leading-[1.6] text-[#0a0a0a]/50 max-w-[500px] font-medium">
            Discover how global enterprises and developers use our technology to verify and anchor ecological integrity.
          </p>
        </div>

        {/* Bento grid of cards */}
        <div ref={cardsRef} className="grid grid-cols-3 gap-3 sm:gap-6 w-full perspective-[1200px]">
          {studies.map((item, idx) => (
            <div
              key={idx}
              className="study-card relative rounded-[1.2rem] sm:rounded-[2rem] overflow-hidden h-[200px] sm:h-[460px] group cursor-pointer will-change-transform transform-gpu shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.18)] transition-all duration-500 border border-black/5 bg-white"
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover scale-105 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
              />
              {/* Fade Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-end">
                <span className="text-[7.5px] sm:text-[9px] font-mono text-[#a3e635] tracking-widest uppercase mb-1.5 sm:mb-3">
                  {item.category}
                </span>
                <h3 className="text-[10px] sm:text-lg lg:text-[1.6rem] font-bold leading-[1.25] sm:leading-[1.2] tracking-[-0.01em] text-white mb-1.5 sm:mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] leading-[1.6] text-white/50 group-hover:text-white/70 transition-colors duration-300 hidden sm:block">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
