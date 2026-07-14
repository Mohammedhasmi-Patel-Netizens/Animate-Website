import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export const TrustProblem = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const lowerCardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    // --- Cinematic Scroll Scrubbing (All screen sizes) ---
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
        end: '+=220%',
        scrub: 1.2,
      }
    })

    // 3. Pin trigger
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=220%',
      pin: true,
    })

    const topCards = cardsRef.current?.children ? Array.from(cardsRef.current.children) : []
    const bottomCards = lowerCardsRef.current?.children ? Array.from(lowerCardsRef.current.children) : []
    const textChildren = textRef.current?.children ? Array.from(textRef.current.children) : []

    // Initial States
    gsap.set(textChildren, { opacity: 0, y: 35, scale: 0.95, filter: 'blur(10px)' })
    gsap.set(topCards, { opacity: 0, y: -250, z: -500, rotateX: -45, scale: 0.7 })
    gsap.set(bottomCards, { opacity: 0, y: 250, z: -500, rotateX: 45, scale: 0.7 })

    // Phase 1: Text reveal
    entranceTl.to(textChildren, {
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: 'blur(0px)',
      duration: 1.2,
      stagger: 0.15,
      ease: 'power3.out',
    })

    // Phase 2: Cards swoop in
    entranceTl.to(topCards, {
      opacity: 1,
      y: 0,
      z: 0,
      rotateX: 0,
      scale: 1,
      duration: 1.8,
      stagger: { amount: 0.6, from: "edges" },
      ease: 'power4.out',
    }, '-=0.4')

    entranceTl.to(bottomCards, {
      opacity: 1,
      y: 0,
      z: 0,
      rotateX: 0,
      scale: 1,
      duration: 1.8,
      stagger: { amount: 0.4, from: "center" },
      ease: 'power4.out',
    }, '<')

    // Phase 3: Drift
    pinTl.to([...topCards, ...bottomCards], {
      y: (i) => i % 2 === 0 ? -30 : 30,
      z: 30,
      rotation: 'random(-1.5, 1.5)',
      duration: 2,
      ease: 'none',
    })

    // Force a refresh
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
  }, { scope: containerRef })

  // --- Individual Cards Render Helpers ---
  const renderCard1 = () => (
    <div className="w-[180px] h-[220px] rounded-2xl overflow-hidden shadow-2xl border border-black/5 shrink-0 will-change-transform bg-white relative hidden md:block">
      <img src="/sensor.png" alt="Equipment" className="w-full h-full object-cover" />
      <div className="absolute bottom-2 left-2">
        <span className="inline-block px-2 py-0.5 rounded-full bg-[#a3e635] text-[8px] font-mono font-bold text-[#0a0a0a] tracking-wider">
          tCO₂e
        </span>
      </div>
    </div>
  )

  const renderCard2 = () => (
    <div className="w-[110px] h-[140px] md:w-[160px] md:h-[200px] rounded-2xl bg-[#0a0a0a] p-3 md:p-5 shadow-2xl border border-white/10 flex flex-col justify-between shrink-0 will-change-transform">
      <div>
        <span className="text-[7.5px] md:text-[9px] font-mono text-white/40 tracking-wider uppercase">Support Sensor</span>
        <span className="block text-[7.5px] md:text-[9px] font-mono text-[#a3e635]/60 tracking-wider mt-0.5">E-INDEX</span>
      </div>
      <div>
        <span className="text-xl md:text-[2.5rem] font-bold text-white leading-none tracking-tight">3.255</span>
        <div className="flex items-center gap-2 mt-1 md:mt-2">
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-[65%] h-full bg-[#a3e635] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )

  const renderCard3 = () => (
    <div className="w-[130px] h-[160px] md:w-[200px] md:h-[240px] rounded-2xl overflow-hidden shadow-2xl border border-black/5 shrink-0 relative will-change-transform bg-white">
      <img src="/forest.png" alt="Aerial" className="w-full h-full object-cover" />
      <div className="absolute top-2 right-2 md:top-3 md:right-3">
        <span className="inline-block px-1.5 py-0.5 rounded bg-[#a3e635] text-[7.5px] md:text-[8px] font-mono font-bold text-[#0a0a0a] tracking-wider">
          LIVE
        </span>
      </div>
    </div>
  )

  const renderCard4 = () => (
    <div className="w-[110px] h-[140px] md:w-[150px] md:h-[190px] rounded-2xl bg-[#0a0a0a] p-3 md:p-4 shadow-2xl border border-white/10 flex flex-col justify-between shrink-0 will-change-transform">
      <span className="text-[7.5px] md:text-[8px] font-mono text-white/30 tracking-wider uppercase">Data Integrity</span>
      <div className="flex items-end gap-0.5 sm:gap-1 h-12 md:h-20">
        {[40, 65, 55, 80, 70, 90, 60, 75].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-[#a3e635]/70"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <span className="text-[14px] md:text-[22px] font-bold text-white tracking-tight">42.152</span>
    </div>
  )

  const renderCard5 = () => (
    <div className="w-[120px] h-[140px] rounded-2xl bg-white p-4 shadow-2xl border border-black/5 flex flex-col items-center justify-center gap-3 shrink-0 will-change-transform hidden md:flex">
      <svg viewBox="0 0 60 60" className="w-14 h-14" fill="none" stroke="#0a0a0a" strokeWidth="1.5">
        <circle cx="30" cy="15" r="10" />
        <circle cx="30" cy="15" r="5" />
        <line x1="30" y1="25" x2="30" y2="55" />
        <line x1="20" y1="55" x2="40" y2="55" />
        <line x1="22" y1="35" x2="38" y2="35" />
      </svg>
      <span className="text-[8px] font-mono text-[#0a0a0a]/40 tracking-wider uppercase">Sensor</span>
    </div>
  )

  const renderCard6 = () => (
    <div className="w-[120px] h-[150px] md:w-[180px] md:h-[220px] rounded-2xl bg-[#0a0a0a] p-3 md:p-5 shadow-2xl border border-white/10 flex flex-col justify-between shrink-0 will-change-transform">
      <span className="text-[7.5px] md:text-[8px] font-mono text-white/30 tracking-wider uppercase">MRV Dashboard</span>
      <div className="flex items-end gap-0.5 h-10 md:h-16">
        {[30, 50, 40, 70, 60, 80, 75, 90, 65, 55].map((h, i) => (
          <div key={i} className="flex-1 rounded-sm bg-[#a3e635]/60" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#a3e635]" />
        <span className="text-[7.5px] md:text-[9px] font-mono text-white/40">Live Data</span>
      </div>
    </div>
  )

  const renderCard7 = () => (
    <div className="w-[120px] h-[140px] md:w-[180px] md:h-[200px] rounded-2xl bg-[#a3e635] p-4 md:p-6 shadow-2xl flex flex-col justify-between shrink-0 will-change-transform">
      <span className="text-[8px] md:text-[9px] font-mono text-[#0a0a0a]/40 tracking-wider uppercase">Carbon Balance</span>
      <div>
        <span className="text-xl md:text-[2.8rem] font-bold text-[#0a0a0a] leading-none tracking-tight">-2.4</span>
        <span className="block text-[8px] md:text-[11px] font-mono text-[#0a0a0a]/50 mt-1">tCO₂e / ha / yr</span>
      </div>
    </div>
  )

  const renderCard8 = () => (
    <div className="w-[160px] h-[200px] rounded-2xl bg-[#0a0a0a] overflow-hidden shadow-2xl border border-white/10 relative shrink-0 will-change-transform hidden md:block">
      <img src="/leaves.png" alt="Nature" className="w-full h-full object-cover opacity-80" />
      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-[#0a0a0a]/80 backdrop-blur-sm">
        <span className="text-[18px] font-bold text-white tracking-tight">42.152</span>
      </div>
    </div>
  )

  return (
    <section ref={containerRef} className="relative z-10 bg-[#f5f5f3] h-screen w-full flex items-center justify-center overflow-hidden perspective-[1200px]">
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-16 flex flex-col items-center justify-center relative py-6">

        {/* Floating Bento Cards - Top row */}
        <div ref={cardsRef} className="relative flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-16 min-h-[160px] md:min-h-[280px] w-full">
          {renderCard1()}
          {renderCard2()}
          {renderCard3()}
          {renderCard4()}
          {renderCard5()}
        </div>

        {/* Text content */}
        <div ref={textRef} className="text-center max-w-3xl mx-auto relative z-20 px-4">
          <span className="inline-block mb-2 md:mb-4 text-[9px] md:text-[10px] font-mono tracking-[0.28em] text-[#a3e635] uppercase">
            Alethia Solves
          </span>

          <h2 className="text-[clamp(1.4rem,4.5vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.15] lg:leading-[1.08] text-[#0a0a0a] mb-3 md:mb-5 drop-shadow-sm">
            The Biggest Problem in Climate Action: Trust
          </h2>

          <p className="text-xs sm:text-sm md:text-[16px] font-medium leading-[1.6] md:leading-[1.8] text-[#0a0a0a]/50 max-w-[560px] mx-auto drop-shadow-sm">
            Quantify your impact, prove your progress, and earn the trust of regulators, 
            stakeholders, and the communities you serve.
          </p>
        </div>

        {/* Lower floating metric cards */}
        <div ref={lowerCardsRef} className="flex items-center justify-center gap-3 md:gap-5 mt-6 md:mt-16 w-full">
          {renderCard6()}
          {renderCard7()}
          {renderCard8()}
        </div>

      </div>
    </section>
  )
}
