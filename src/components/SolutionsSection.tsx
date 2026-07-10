import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export const SolutionsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Header text staggered reveal
    const headerElements = headerRef.current?.children ? Array.from(headerRef.current.children) : []
    gsap.fromTo(headerElements,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    )

    // Bento cards 3D entrance and parallax
    const cards = cardsRef.current?.children ? Array.from(cardsRef.current.children) : []
    
    gsap.fromTo(cards,
      { opacity: 0, y: 150, scale: 0.9, rotateX: 10 },
      {
        opacity: 1, y: 0, scale: 1, rotateX: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
        }
      }
    )

    // Parallax on the cards
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: i === 0 ? -40 : -80,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      })
    })

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative z-10 bg-white py-32 overflow-hidden perspective-[1000px]">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">

        {/* Header Content */}
        <div ref={headerRef}>
          <div className="mb-6">
            <span className="text-[10px] font-mono tracking-[0.28em] text-[#a3e635] uppercase">
              Our Solutions
            </span>
          </div>
          <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.08] text-[#0a0a0a] max-w-[700px] mb-6">
            Validating What the Ecosystem Does Naturally
          </h2>
          <p className="text-[15px] leading-[1.8] text-[#0a0a0a]/50 max-w-[520px] mb-20">
            We deploy science-grade monitoring infrastructure to measure, report, 
            and verify the carbon sequestration of natural ecosystems at unprecedented accuracy.
          </p>
        </div>

        {/* Bento grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left: Dark photo card */}
          <div className="relative rounded-3xl overflow-hidden h-[380px] group cursor-pointer will-change-transform">
            <img
              src="/leaves.png"
              alt="Carbon Markets"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-[1.5rem] md:text-[1.8rem] font-bold leading-[1.15] tracking-[-0.02em] text-white">
                Carbon Markets Built on<br />Truth, Not Estimates.
              </h3>
            </div>
          </div>

          {/* Right: Lime green card */}
          <div className="relative bg-[#a3e635] rounded-3xl p-10 h-[380px] flex flex-col justify-between overflow-hidden group cursor-pointer will-change-transform">
            {/* Decorative circle */}
            <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-white/15 group-hover:scale-110 transition-transform duration-700" />
            
            <span className="text-[10px] font-mono tracking-[0.24em] text-[#0a0a0a]/40 uppercase">
              Enterprise Platform
            </span>
            <div className="relative z-10">
              <h3 className="text-[1.5rem] md:text-[1.8rem] font-bold leading-[1.15] tracking-[-0.02em] text-[#0a0a0a] mb-4">
                Real-World Emissions Data.<br />
                Enterprise-Wide Climate Clarity.
              </h3>
              <p className="text-[13px] text-[#0a0a0a]/50 font-medium leading-relaxed max-w-[340px]">
                Verified carbon intelligence for compliance, reporting, and strategic decision-making.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
