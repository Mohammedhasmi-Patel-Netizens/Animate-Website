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
    // --- Cinematic Scroll Scrubbing ---
    
    // 1. Separate timeline for animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%', // Start animating before pinning
        end: '+=250%', 
        scrub: 1.5,
      }
    })

    // 2. Separate trigger for pinning
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=250%',
      pin: true,
    })

    const topCards = cardsRef.current?.children ? Array.from(cardsRef.current.children) : []
    const bottomCards = lowerCardsRef.current?.children ? Array.from(lowerCardsRef.current.children) : []
    const textChildren = textRef.current?.children ? Array.from(textRef.current.children) : []

    // Initial States
    gsap.set(textChildren, { opacity: 0, y: 50, scale: 0.9, filter: 'blur(15px)' })
    gsap.set(topCards, { opacity: 0, y: -400, z: -800, rotateX: -60, rotateY: 'random(-20, 20)', scale: 0.5 })
    gsap.set(bottomCards, { opacity: 0, y: 400, z: -800, rotateX: 60, rotateY: 'random(-20, 20)', scale: 0.5 })

    // Phase 1: Text reveal
    tl.to(textChildren, {
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: 'blur(0px)',
      duration: 1.5,
      stagger: 0.2,
      ease: 'power3.out',
    })

    // Phase 2: Top and Bottom Cards swoop in
    tl.to(topCards, {
      opacity: 1,
      y: 0,
      z: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 2,
      stagger: { amount: 0.8, from: "edges" },
      ease: 'power4.out',
    }, '-=0.5')

    tl.to(bottomCards, {
      opacity: 1,
      y: 0,
      z: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 2,
      stagger: { amount: 0.5, from: "center" },
      ease: 'power4.out',
    }, '<')

    // Phase 3: Majestic slow drift
    tl.to([...topCards, ...bottomCards], {
      y: (i) => i % 2 === 0 ? -40 : 40,
      z: 50,
      rotation: 'random(-2, 2)',
      duration: 2,
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

        {/* Floating Bento Cards - Top row */}
        <div ref={cardsRef} className="relative flex flex-wrap items-center justify-center gap-4 mb-16 min-h-[280px] w-full">
          {/* Card 1: Equipment photo */}
          <div className="w-[180px] h-[220px] rounded-2xl overflow-hidden shadow-2xl border border-black/5 shrink-0 will-change-transform">
            <img src="/sensor.png" alt="Equipment" className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2">
              <span className="inline-block px-2 py-0.5 rounded-full bg-[#a3e635] text-[8px] font-mono font-bold text-[#0a0a0a] tracking-wider">
                tCO₂e
              </span>
            </div>
          </div>

          {/* Card 2: Metric card */}
          <div className="w-[160px] h-[200px] rounded-2xl bg-[#0a0a0a] p-5 shadow-2xl border border-white/10 flex flex-col justify-between shrink-0 will-change-transform">
            <div>
              <span className="text-[9px] font-mono text-white/40 tracking-wider uppercase">Support Sensor</span>
              <span className="block text-[9px] font-mono text-[#a3e635]/60 tracking-wider mt-0.5">E-INDEX</span>
            </div>
            <div>
              <span className="text-[2.5rem] font-bold text-white leading-none tracking-tight">3.255</span>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[65%] h-full bg-[#a3e635] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Aerial photo */}
          <div className="w-[200px] h-[240px] rounded-2xl overflow-hidden shadow-2xl border border-black/5 shrink-0 relative will-change-transform">
            <img src="/forest.png" alt="Aerial" className="w-full h-full object-cover" />
            <div className="absolute top-3 right-3">
              <span className="inline-block px-2 py-0.5 rounded-full bg-[#a3e635] text-[8px] font-mono font-bold text-[#0a0a0a] tracking-wider">
                LIVE
              </span>
            </div>
          </div>

          {/* Card 4: Chart card */}
          <div className="w-[150px] h-[190px] rounded-2xl bg-[#0a0a0a] p-4 shadow-2xl border border-white/10 flex flex-col justify-between shrink-0 will-change-transform">
            <span className="text-[8px] font-mono text-white/30 tracking-wider uppercase">Data Integrity</span>
            {/* Mini bar chart */}
            <div className="flex items-end gap-1 h-20">
              {[40, 65, 55, 80, 70, 90, 60, 75].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-[#a3e635]/70"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <span className="text-[22px] font-bold text-white tracking-tight">42.152</span>
          </div>

          {/* Card 5: Sensor icon */}
          <div className="w-[120px] h-[140px] rounded-2xl bg-white p-4 shadow-2xl border border-black/5 flex flex-col items-center justify-center gap-3 shrink-0 will-change-transform">
            {/* Sensor icon illustration */}
            <svg viewBox="0 0 60 60" className="w-14 h-14" fill="none" stroke="#0a0a0a" strokeWidth="1.5">
              <circle cx="30" cy="15" r="10" />
              <circle cx="30" cy="15" r="5" />
              <line x1="30" y1="25" x2="30" y2="55" />
              <line x1="20" y1="55" x2="40" y2="55" />
              <line x1="22" y1="35" x2="38" y2="35" />
            </svg>
            <span className="text-[8px] font-mono text-[#0a0a0a]/40 tracking-wider uppercase">Sensor</span>
          </div>
        </div>

        {/* Text content */}
        <div ref={textRef} className="text-center max-w-3xl mx-auto relative z-20">
          <span className="inline-block mb-4 text-[10px] font-mono tracking-[0.28em] text-[#a3e635] uppercase">
            Alethia Solves
          </span>

          <h2 className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.08] text-[#0a0a0a] mb-5 drop-shadow-sm">
            The Biggest Problem in Climate<br />Action: Trust
          </h2>

          <p className="text-[16px] font-medium leading-[1.8] text-[#0a0a0a]/50 max-w-[560px] mx-auto drop-shadow-sm">
            Quantify your impact, prove your progress, and earn the trust of regulators, 
            stakeholders, and the communities you serve.
          </p>
        </div>

        {/* Lower floating metric cards */}
        <div ref={lowerCardsRef} className="flex flex-wrap items-center justify-center gap-5 mt-16 w-full">
          <div className="w-[180px] h-[220px] rounded-2xl bg-[#0a0a0a] p-5 shadow-2xl border border-white/10 flex flex-col justify-between will-change-transform">
            <span className="text-[8px] font-mono text-white/30 tracking-wider uppercase">MRV Dashboard</span>
            <div className="flex items-end gap-0.5 h-16">
              {[30, 50, 40, 70, 60, 80, 75, 90, 65, 55].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm bg-[#a3e635]/60" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
              <span className="text-[9px] font-mono text-white/40">Live Data</span>
            </div>
          </div>

          <div className="w-[180px] h-[200px] rounded-2xl bg-[#a3e635] p-6 shadow-2xl flex flex-col justify-between will-change-transform">
            <span className="text-[9px] font-mono text-[#0a0a0a]/40 tracking-wider uppercase">Carbon Balance</span>
            <div>
              <span className="text-[2.8rem] font-bold text-[#0a0a0a] leading-none tracking-tight">-2.4</span>
              <span className="block text-[11px] font-mono text-[#0a0a0a]/50 mt-1">tCO₂e / ha / yr</span>
            </div>
          </div>

          <div className="w-[160px] h-[200px] rounded-2xl bg-[#0a0a0a] overflow-hidden shadow-2xl border border-white/10 relative will-change-transform">
            <img src="/leaves.png" alt="Nature" className="w-full h-full object-cover opacity-80" />
            <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-[#0a0a0a]/80 backdrop-blur-sm">
              <span className="text-[18px] font-bold text-white tracking-tight">42.152</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
