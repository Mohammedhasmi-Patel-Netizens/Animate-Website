import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export const SolutionsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // --- Ambient floating orbs (shared) ---
    gsap.to('.floating-orb-light', {
      y: 'random(-60, 60)',
      x: 'random(-60, 60)',
      rotation: 'random(-30, 30)',
      duration: 'random(5, 8)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.6
    })

    // --- Mouse Parallax (only acts on mouse movement) ---
    const xTo = gsap.quickTo('.parallax-layer', "x", {duration: 0.8, ease: "power3.out"})
    const yTo = gsap.quickTo('.parallax-layer', "y", {duration: 0.8, ease: "power3.out"})
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 30
      const y = (clientY / window.innerHeight - 0.5) * 30
      xTo(x)
      yTo(y)
    }

    window.addEventListener('mousemove', handleMouseMove)

    // --- Cinematic Scroll Scrubbing (Runs on all screens) ---
    // 1. Entrance timeline
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%', 
        toggleActions: 'play none none none',
      }
    })

    // 2. Pin scroll timeline
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: 1.5,
      }
    })

    // 3. Pin trigger
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=200%',
      pin: true,
    })

    const headerElements = headerRef.current?.children ? Array.from(headerRef.current.children) : []

    // Initial States
    gsap.set(headerElements, { opacity: 0, y: 80, scale: 0.9, filter: 'blur(10px)' })
    gsap.set(card1Ref.current, { opacity: 0, y: window.innerHeight * 0.7, z: -400, rotateX: 35, rotateY: -10, scale: 0.85 })
    gsap.set(card2Ref.current, { opacity: 0, y: window.innerHeight * 0.7, z: -400, rotateX: 35, rotateY: 10, scale: 0.85 })

    // Animate Header In
    entranceTl.to(headerElements, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    })

    // Animate Card 1 In
    entranceTl.to(card1Ref.current, {
      opacity: 1,
      y: 0,
      z: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 1.5,
      ease: 'power4.out',
    }, '-=0.5')

    // Animate Card 2 In
    entranceTl.to(card2Ref.current, {
      opacity: 1,
      y: 0,
      z: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 1.5,
      ease: 'power4.out',
    }, '-=1.0')

    // Final subtle parallax push
    pinTl.to([card1Ref.current, card2Ref.current], {
      y: -40,
      duration: 1,
      ease: 'none'
    })

    // Force a refresh
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, { scope: containerRef })

  return (
    <section id="our-solutions" ref={containerRef} className="relative z-10 bg-[#f8f9fa] h-screen w-full flex items-center justify-center overflow-hidden perspective-[1200px]">
      
      {/* Light background ambient glows */}
      <div className="absolute top-0 -left-32 w-[600px] h-[600px] bg-[#a3e635]/15 rounded-full blur-[150px] pointer-events-none floating-orb-light" />
      <div className="absolute bottom-0 -right-32 w-[500px] h-[500px] bg-black/5 rounded-full blur-[120px] pointer-events-none floating-orb-light" />

      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-16 parallax-layer relative z-10 flex flex-col items-center justify-center py-6">

        {/* Header Content */}
        <div ref={headerRef} className="relative z-10 w-full mb-6 sm:mb-10 text-center flex flex-col items-center">
          <div className="mb-2 md:mb-4">
            <span className="inline-block px-4 py-1.5 sm:px-5 sm:py-2 rounded-full border border-black/5 bg-black/5 backdrop-blur-sm text-[9px] sm:text-[10px] font-mono tracking-[0.28em] text-[#0a0a0a]/70 uppercase shadow-sm">
              Our Solutions
            </span>
          </div>
          <h2 className="text-[clamp(1.4rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[#0a0a0a] max-w-[800px] mb-2 sm:mb-4">
            Validating What the Ecosystem Does <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#74a822] to-[#a3e635]">Naturally.</span>
          </h2>
          <p className="text-xs sm:text-[15px] leading-[1.6] sm:leading-[1.7] text-[#0a0a0a]/60 max-w-[540px] font-medium mx-auto">
            We deploy science-grade monitoring infrastructure to measure, report, 
            and verify the carbon sequestration of natural ecosystems at unprecedented accuracy.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 perspective-[1200px] w-full">
          {/* Left: Dark photo card */}
          <div ref={card1Ref} className="relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden h-[180px] sm:h-[280px] lg:h-[380px] group cursor-pointer will-change-transform transform-gpu shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.2)] transition-shadow duration-700">
            <img
              src="/leaves.png"
              alt="Carbon Markets"
              className="w-full h-full object-cover scale-105 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="absolute inset-0 p-5 sm:p-10 flex flex-col justify-end">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center mb-3 sm:mb-6 backdrop-blur-md bg-white/10 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-base sm:text-2xl md:text-[2.2rem] font-bold leading-[1.2] lg:leading-[1.1] tracking-[-0.02em] text-white">
                Carbon Markets Built on<br />Truth, Not Estimates.
              </h3>
            </div>
          </div>

          {/* Right: Lime green card */}
          <div ref={card2Ref} className="relative bg-gradient-to-br from-[#a3e635] to-[#86c522] rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-10 h-[180px] sm:h-[280px] lg:h-[380px] flex flex-col justify-between overflow-hidden group cursor-pointer will-change-transform transform-gpu shadow-[0_20px_50px_rgba(163,230,53,0.3)] hover:shadow-[0_30px_60px_rgba(163,230,53,0.4)] transition-shadow duration-700 border border-white/40">
            {/* Decorative circles */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/20 blur-2xl group-hover:scale-125 transition-transform duration-700 ease-out" />
            <div className="absolute -left-10 -top-10 w-48 h-48 rounded-full bg-black/5 blur-xl group-hover:scale-110 transition-transform duration-700 ease-out" />
            
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-black/10 bg-black/5 backdrop-blur-sm text-[8px] sm:text-[10px] font-mono tracking-[0.24em] text-[#0a0a0a]/70 uppercase">
                Enterprise Platform
              </span>
            </div>
            
            <div className="relative z-10 mt-auto">
              <h3 className="text-base sm:text-2xl md:text-[2.2rem] font-bold leading-[1.2] lg:leading-[1.1] tracking-[-0.02em] text-[#0a0a0a] mb-1 sm:mb-5">
                Real-World Emissions Data.<br />
                Enterprise-Wide Climate Clarity.
              </h3>
              <p className="text-[10px] sm:text-[15px] text-[#0a0a0a]/75 font-medium leading-[1.5] sm:leading-[1.6] max-w-[360px]">
                Verified carbon intelligence for compliance, reporting, and strategic decision-making.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
