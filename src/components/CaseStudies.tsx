import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const studies = [
  {
    tag:   'Case Study',
    title: 'Restoring 12,000ha of Amazon Rainforest with Verified Carbon Credits',
    client: 'Alethia',
    team: 'SCIENCE · TEAM',
    img:   '/forest.png',
  },
  {
    tag:   'Whitepaper',
    title: 'Atmospheric-Based MRV: The Future of Corporate Climate Accountability',
    client: 'Alethia',
    team: 'RESEARCH · BLOCKCHAIN',
    img:   '/ecosystem-banner.png',
  },
  {
    tag:   'Insight',
    title: 'How Understory Data Changes Everything for Carbon Market Integrity',
    client: 'Alethia',
    team: 'DATA · INTEGRITY',
    img:   '/leaves.png',
  },
]

export const CaseStudies = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // --- Cinematic Scroll Scrubbing ---
    // 1. Entrance timeline (plays naturally to completion once section enters viewport)
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%', 
        toggleActions: 'play none none none',
      }
    })

    // 2. Pin scroll timeline (runs while pinned)
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: 1.5,
      }
    })

    // 3. Separate trigger for pinning
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=200%',
      pin: true,
    })

    const headerElements = headerRef.current?.children ? Array.from(headerRef.current.children) : []
    const cards = cardsRef.current?.children ? Array.from(cardsRef.current.children) : []

    // Initial States
    gsap.set(headerElements, { opacity: 0, y: 80, scale: 0.95, filter: 'blur(10px)' })
    gsap.set(cards, { opacity: 0, y: window.innerHeight * 0.8, z: -600, rotateX: 25, rotateY: 'random(-10, 10)', scale: 0.85 })

    // Phase 1: Header reveals
    entranceTl.to(headerElements, {
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: 'blur(0px)',
      duration: 1.2,
      stagger: 0.2,
      ease: 'power3.out',
    })

    // Phase 2: Cards swoop in 3D stagger
    entranceTl.to(cards, {
      opacity: 1,
      y: 0,
      z: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 2,
      stagger: 0.25,
      ease: 'power4.out',
    }, '-=0.5')

    // Inner image parallax (runs while pinned)
    cards.forEach((card) => {
      const img = card.querySelector('img')
      if (img) {
        pinTl.fromTo(img, 
          { y: -30, scale: 1.1 },
          {
            y: 30,
            scale: 1.05,
            duration: 4, 
            ease: 'none',
          }, 0
        )
      }
    })

    // Phase 3: Final gentle drift (runs while pinned)
    pinTl.to([...headerElements, ...cards], {
      y: -50,
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
      <div className="max-w-[1400px] w-full mx-auto px-8 md:px-16 flex flex-col items-center justify-center relative">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 w-full flex flex-col items-center">
          <span className="inline-block mb-6 text-[10px] font-mono tracking-[0.28em] text-[#a3e635] uppercase">
            Case Studies
          </span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-[1.12] text-[#0a0a0a] max-w-[800px]">
            Explore how leading organizations are using alethia to measure emissions, 
            verify progress, and lead with integrity.
          </h2>
        </div>

        {/* Case study cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 will-change-transform w-full perspective-[1000px]">
          {studies.map((study) => (
            <div
              key={study.title}
              className="group rounded-3xl overflow-hidden bg-white border border-black/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-shadow duration-700 cursor-pointer will-change-transform"
            >
              {/* Image with internal parallax */}
              <div className="h-[240px] overflow-hidden">
                <img
                  src={study.img}
                  alt={study.title}
                  className="w-full h-[130%] object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              {/* Content */}
              <div className="p-7 relative bg-white z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[9px] font-mono tracking-[0.15em] text-[#0a0a0a]/30 uppercase">
                    Case Studies · Alethia
                  </span>
                </div>
                <h3 className="text-[16px] font-bold leading-[1.35] tracking-[-0.01em] text-[#0a0a0a] mb-4 group-hover:text-[#a3e635] transition-colors duration-300">
                  {study.title}
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#0a0a0a] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#a3e635]" />
                  </div>
                  <div>
                    <span className="block text-[12px] font-bold text-[#0a0a0a]">{study.client}</span>
                    <span className="block text-[9px] font-mono text-[#0a0a0a]/30 tracking-wider">{study.team}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  )
}
