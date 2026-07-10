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
    // Header reveal
    const headerElements = headerRef.current?.children ? Array.from(headerRef.current.children) : []
    gsap.fromTo(headerElements,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    )

    // Staggered cards entrance with slight scale and rotation
    const cards = cardsRef.current?.children ? Array.from(cardsRef.current.children) : []
    gsap.fromTo(cards,
      { opacity: 0, y: 100, scale: 0.95, rotateY: 10 },
      {
        opacity: 1, y: 0, scale: 1, rotateY: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
        }
      }
    )

    // Scroll scrubbed parallax for the entire cards container
    gsap.to(cardsRef.current, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    })

    // Inner image parallax (the images move slightly inside their containers)
    cards.forEach((card) => {
      const img = card.querySelector('img')
      if (img) {
        gsap.fromTo(img, 
          { y: -20 },
          {
            y: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        )
      }
    })

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative z-10 bg-[#f5f5f3] py-32 overflow-hidden perspective-[1200px]">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">

        {/* Header */}
        <div ref={headerRef}>
          <span className="inline-block mb-6 text-[10px] font-mono tracking-[0.28em] text-[#a3e635] uppercase">
            Case Studies
          </span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-[1.12] text-[#0a0a0a] max-w-[700px] mb-16">
            Explore how leading organizations are using alethia to measure emissions, 
            verify progress, and lead with integrity.
          </h2>
        </div>

        {/* Case study cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 will-change-transform">
          {studies.map((study) => (
            <div
              key={study.title}
              className="group rounded-3xl overflow-hidden bg-white border border-black/[0.06] hover:shadow-xl transition-shadow duration-500 cursor-pointer will-change-transform"
            >
              {/* Image with internal parallax */}
              <div className="h-[240px] overflow-hidden">
                <img
                  src={study.img}
                  alt={study.title}
                  className="w-full h-[120%] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Content */}
              <div className="p-7 relative bg-white z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[9px] font-mono tracking-[0.15em] text-[#0a0a0a]/30 uppercase">
                    Case Studies · Alethia
                  </span>
                </div>
                <h3 className="text-[16px] font-bold leading-[1.35] tracking-[-0.01em] text-[#0a0a0a] mb-4 group-hover:text-[#0a0a0a]/70 transition-colors duration-300">
                  {study.title}
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#a3e635] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#0a0a0a]" />
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
