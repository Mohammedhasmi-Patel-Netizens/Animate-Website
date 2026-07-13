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
    // --- Mouse Parallax ---
    const xTo = gsap.quickTo('.parallax-layer', "x", {duration: 0.8, ease: "power3.out"})
    const yTo = gsap.quickTo('.parallax-layer', "y", {duration: 0.8, ease: "power3.out"})
    
    const cardXTo = gsap.quickTo('.bento-card', "rotateY", {duration: 0.5, ease: "power2.out"})
    const cardYTo = gsap.quickTo('.bento-card', "rotateX", {duration: 0.5, ease: "power2.out"})

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 30
      const y = (clientY / window.innerHeight - 0.5) * 30
      
      xTo(x)
      yTo(y)
      
      cardXTo((clientX / window.innerWidth - 0.5) * 15)
      cardYTo(-(clientY / window.innerHeight - 0.5) * 15)
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Header text staggered reveal
    const headerElements = headerRef.current?.children ? Array.from(headerRef.current.children) : []
    gsap.fromTo(headerElements,
      { opacity: 0, y: 40, filter: 'blur(8px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)',
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
      { opacity: 0, y: 150, z: -200, scale: 0.9, rotateX: 15 },
      {
        opacity: 1, y: 0, z: 0, scale: 1, rotateX: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
        }
      }
    )

    // Deep Scroll Parallax on the cards
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: i === 0 ? -60 : -100, // enhanced offset
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      })
    })

    // Ambient floating orbs (subtle for light background)
    gsap.to('.floating-orb-light', {
      y: 'random(-40, 40)',
      x: 'random(-40, 40)',
      rotation: 'random(-30, 30)',
      duration: 'random(5, 8)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.6
    })

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative z-10 bg-[#f8f9fa] py-32 overflow-hidden perspective-[1200px]">
      
      {/* Light background ambient glows */}
      <div className="absolute top-0 -left-32 w-[600px] h-[600px] bg-[#a3e635]/10 rounded-full blur-[150px] pointer-events-none floating-orb-light" />
      <div className="absolute bottom-0 -right-32 w-[500px] h-[500px] bg-black/5 rounded-full blur-[120px] pointer-events-none floating-orb-light" />

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 parallax-layer">

        {/* Header Content */}
        <div ref={headerRef} className="relative z-10">
          <div className="mb-8">
            <span className="inline-block px-5 py-2 rounded-full border border-black/5 bg-black/5 backdrop-blur-sm text-[11px] font-mono tracking-[0.28em] text-[#0a0a0a]/70 uppercase shadow-sm">
              Our Solutions
            </span>
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-0.03em] leading-[1.05] text-[#0a0a0a] max-w-[800px] mb-8">
            Validating What the Ecosystem Does <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#74a822] to-[#a3e635]">Naturally.</span>
          </h2>
          <p className="text-[16px] leading-[1.8] text-[#0a0a0a]/60 max-w-[540px] mb-24 font-medium">
            We deploy science-grade monitoring infrastructure to measure, report, 
            and verify the carbon sequestration of natural ecosystems at unprecedented accuracy.
          </p>
        </div>

        {/* Bento grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-[1200px]">
          {/* Left: Dark photo card */}
          <div className="bento-card relative rounded-[2rem] overflow-hidden h-[450px] group cursor-pointer will-change-transform transform-gpu shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.2)] transition-shadow duration-700">
            <img
              src="/leaves.png"
              alt="Carbon Markets"
              className="w-full h-full object-cover scale-105 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-6 backdrop-blur-md bg-white/10 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-[1.8rem] md:text-[2.2rem] font-bold leading-[1.1] tracking-[-0.02em] text-white">
                Carbon Markets Built on<br />Truth, Not Estimates.
              </h3>
            </div>
          </div>

          {/* Right: Lime green card */}
          <div className="bento-card relative bg-gradient-to-br from-[#a3e635] to-[#86c522] rounded-[2rem] p-10 h-[450px] flex flex-col justify-between overflow-hidden group cursor-pointer will-change-transform transform-gpu shadow-[0_20px_50px_rgba(163,230,53,0.3)] hover:shadow-[0_30px_60px_rgba(163,230,53,0.4)] transition-shadow duration-700 border border-white/40">
            {/* Decorative circles */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/20 blur-2xl group-hover:scale-125 transition-transform duration-700 ease-out" />
            <div className="absolute -left-10 -top-10 w-48 h-48 rounded-full bg-black/5 blur-xl group-hover:scale-110 transition-transform duration-700 ease-out" />
            
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full border border-black/10 bg-black/5 backdrop-blur-sm text-[10px] font-mono tracking-[0.24em] text-[#0a0a0a]/70 uppercase">
                Enterprise Platform
              </span>
            </div>
            
            <div className="relative z-10 mt-auto">
              <h3 className="text-[1.8rem] md:text-[2.2rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#0a0a0a] mb-5">
                Real-World Emissions Data.<br />
                Enterprise-Wide Climate Clarity.
              </h3>
              <p className="text-[15px] text-[#0a0a0a]/70 font-medium leading-[1.6] max-w-[360px]">
                Verified carbon intelligence for compliance, reporting, and strategic decision-making.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
