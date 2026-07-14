import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const list = [
  {
    tag: 'INTEGRITY',
    title: 'High-Fidelity Baselines',
    body: 'Continuous ecological observation and atmospheric sensing to establish verified, peer-reviewed baselines for project validation.'
  },
  {
    tag: 'AUTOMATION',
    title: 'Smart Contract Delivery',
    body: 'Automate verification milestones, emissions payouts, and credit issuance securely via auditable decentralized ledgers.'
  },
  {
    tag: 'RESOLUTION',
    title: 'Hyper-Local Sensors',
    body: 'Dense ground networks combining acoustic, thermal, and meteorological arrays to monitor localized biodiversity.'
  },
  {
    tag: 'LIQUIDITY',
    title: 'Direct Market API',
    body: 'Seamless connection to public ecological pools, registries, and secondary markets to clear compliance trades instantly.'
  }
]

export const RedefiningSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return
    const q = gsap.utils.selector(containerRef.current)

    // --- Initial States (All screens) ---
    gsap.set(q('.sect-elem'), { opacity: 0, y: 40, filter: 'blur(10px)' })
    gsap.set(q('.grid-card'), { opacity: 0, y: 120, rotateX: 25, scale: 0.85 })

    // --- Entrance ScrollTrigger ---
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    })

    entranceTl.to(q('.sect-elem'), {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out'
    })

    // --- Pin Scroll Scrubbing Timeline ---
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%',
        scrub: 1.2,
        pin: true,
      }
    })

    pinTl.to(q('.grid-card'), {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      stagger: 0.15,
      duration: 1.5,
      ease: 'power3.out'
    })
  }, { scope: containerRef })

  return (
    <section className="relative z-10 bg-[#0a0a0a] h-screen w-full flex items-center justify-center overflow-hidden border-t border-white/[0.05]" ref={containerRef}>
      
      {/* Background Orbs */}
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-[#a3e635]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col justify-center h-full relative z-10 py-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 flex flex-col text-center lg:text-left items-center lg:items-start">
            <span className="sect-elem inline-block mb-4 lg:mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[9px] sm:text-[10px] font-mono tracking-[0.24em] text-white/50 uppercase">
              REDEFINING STANDARDS
            </span>
            <h2 className="sect-elem text-[clamp(1.4rem,4vw,3.2rem)] font-bold leading-[1.15] lg:leading-[1.1] tracking-[-0.03em] text-white mb-4 lg:mb-6">
              Complete Trust in<br />
              Ecosystem Data.
            </h2>
            <p className="sect-elem text-xs sm:text-[15px] leading-[1.6] sm:leading-[1.8] text-white/45 max-w-[420px] font-medium">
              We leverage multi-tiered physical arrays, advanced gas analyzers, and automated compliance pipelines to deliver auditable environmental tracking that reduces risk and maximizes ecological value.
            </p>
          </div>

          {/* Right Column: Grid cards */}
          <div ref={gridRef} className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-6 perspective-[1200px]">
            {list.map((item, idx) => (
              <div
                key={idx}
                className="grid-card glass rounded-[1rem] sm:rounded-[1.8rem] p-4 sm:p-8 min-h-[140px] sm:min-h-[260px] flex flex-col justify-between border border-white/5 bg-[#111111]/70 backdrop-blur-xl hover:border-[#a3e635]/30 hover:bg-[#151515] transition-all duration-500 group will-change-transform transform-gpu shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              >
                <div>
                  <span className="text-[7.5px] sm:text-[9px] font-mono text-[#a3e635]/50 group-hover:text-[#a3e635] tracking-widest uppercase transition-colors duration-300">
                    {item.tag}
                  </span>
                  <h3 className="text-xs sm:text-[1.4rem] font-bold text-white tracking-tight mt-1.5 sm:mt-3 mb-1 sm:mb-2 group-hover:text-[#a3e635] transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[9px] sm:text-[13px] leading-[1.5] sm:leading-[1.65] text-white/45 group-hover:text-white/60 transition-colors duration-300 mt-2">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
