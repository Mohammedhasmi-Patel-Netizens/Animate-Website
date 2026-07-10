import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export const StorySection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const rockCenterRef = useRef<HTMLImageElement>(null)
  const rockLeftRef = useRef<HTMLImageElement>(null)
  const rockRightRef = useRef<HTMLImageElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // A master timeline scrubbed by the scroll position
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Smooth scrubbing
      },
    })

    // Setup initial states
    gsap.set(textRef.current, { scale: 0.3, opacity: 0, filter: 'blur(20px)' })
    gsap.set(rockCenterRef.current, { scale: 0.1, opacity: 0, y: 300, filter: 'blur(20px)', rotate: 0 })
    gsap.set(rockLeftRef.current, { scale: 0.3, opacity: 0, x: -200, y: 200, filter: 'blur(10px)' })
    gsap.set(rockRightRef.current, { scale: 0.3, opacity: 0, x: 200, y: 200, filter: 'blur(10px)' })
    gsap.set(glowRef.current, { scale: 0.5, opacity: 0 })

    // --- PHASE 1: Text zooms into focus ---
    tl.to(textRef.current, {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 2,
      ease: 'power2.out',
    })
      .to(glowRef.current, { opacity: 1, scale: 1, duration: 2 }, '<')

    // --- PHASE 2: Text zooms OUT past the camera, Rock enters ---
    tl.to(textRef.current, {
      scale: 2.5,
      opacity: 0,
      filter: 'blur(15px)',
      duration: 2,
      ease: 'power2.in',
    })
      .to(rockCenterRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        rotate: 180,
        duration: 2.5,
        ease: 'power2.out',
      }, '<+=0.5') // Start slightly after text starts zooming out

    // --- PHASE 3: Rock gets massive (3D push), side rocks fly in ---
    tl.to(rockCenterRef.current, {
      scale: 2.5,
      rotate: 360,
      duration: 3,
      ease: 'none',
    })
      .to(rockLeftRef.current, {
        scale: 1.8,
        opacity: 0.6,
        x: 0,
        y: -100,
        filter: 'blur(2px)',
        duration: 3,
        ease: 'none',
      }, '<')
      .to(rockRightRef.current, {
        scale: 2.2,
        opacity: 0.5,
        x: 0,
        y: -200,
        filter: 'blur(4px)',
        duration: 3,
        ease: 'none',
      }, '<')

    // --- PHASE 4: Everything shrinks back down to transition out ---
    tl.to([rockCenterRef.current, rockLeftRef.current, rockRightRef.current, glowRef.current], {
      scale: 0.5,
      opacity: 0,
      filter: 'blur(15px)',
      duration: 1.5,
      ease: 'power2.in',
    })

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#0a0a0a] border-t border-white/[0.06]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden perspective-[1000px]">

        {/* Ambient glow */}
        <div
          ref={glowRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#a3e635]/10 rounded-full blur-[160px] pointer-events-none"
        />

        {/* Text (behind rock) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center text-center px-6 pointer-events-none">
          <div ref={textRef} className="max-w-4xl origin-center">
            <span className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[#a3e635]/25 text-[#a3e635] text-[9.5px] font-mono tracking-[0.24em] uppercase">
              Our Story
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.06] tracking-[-0.03em] text-white mb-8">
              From Data Chaos to<br />
              <span className="text-[#a3e635]">Science-Backed,</span><br />
              Actionable Insights
            </h2>
            <p className="text-[15px] text-white/35 max-w-xl mx-auto leading-relaxed">
              A Breakthrough in Environmental Measurement, Built for Commercial Use.
            </p>
          </div>
        </div>

        {/* Rotating center rock */}
        <div className="absolute z-20 w-[500px] h-[500px] md:w-[700px] md:h-[700px] pointer-events-none flex items-center justify-center">
          <img
            ref={rockCenterRef}
            src="/rock-center.png"
            alt="Rotating ecosystem rock"
            className="w-full h-full object-contain mix-blend-normal drop-shadow-2xl"
          />
        </div>

        <img
          ref={rockLeftRef}
          src="/rock-left.png"
          className="absolute left-[4%] bottom-[10%] w-[260px] z-30"
        />
        <img
          ref={rockRightRef}
          src="/rock-right.png"
          className="absolute right-[4%] top-[15%] w-[200px] z-30"
        />
      </div>
    </section>
  )
}
