import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export const ForestBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  
  const bg1Ref = useRef<HTMLImageElement>(null)
  const bg2Ref = useRef<HTMLDivElement>(null)
  
  const labelRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const marker1Ref = useRef<HTMLDivElement>(null)
  const marker2Ref = useRef<HTMLDivElement>(null)
  const marker3Ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Master timeline scrubbed by scroll position
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%', // Defines the scroll duration (300vh)
        pin: true,     // Locks the section in place
        scrub: 1,      // Smooth scrubbing
      }
    })

    // --- Initial States ---
    gsap.set(bg1Ref.current, { scale: 1.05 })
    gsap.set(bg2Ref.current, { opacity: 0, scale: 1.1 })
    gsap.set([
      labelRef.current, 
      textRef.current, 
      marker1Ref.current, 
      marker2Ref.current, 
      marker3Ref.current
    ], { 
      opacity: 0, 
      y: 40 
    })

    // --- Animation Sequence ---
    
    // 1. Slow, continuous background parallax scaling throughout the scroll
    tl.to(bg1Ref.current, { scale: 1.15, duration: 4, ease: 'none' }, 0)
      .to(bg2Ref.current, { scale: 1.2, duration: 4, ease: 'none' }, 0)

    // 2. Sequential Text & Marker Reveal
    tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.3)
      .to(textRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.5)
      .to(marker1Ref.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.7)
      .to(marker2Ref.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.9)
      .to(marker3Ref.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 1.1)

    // 3. Background Crossfade (happens concurrently with the text/marker reveal)
    tl.to(bg2Ref.current, { opacity: 1, duration: 1.5, ease: 'none' }, 0.6)

    // 4. Release/Exit Phase (Scales down into a recessed card before unpinning)
    tl.to(wrapperRef.current, {
      scale: 0.85,
      opacity: 0.3,
      borderRadius: '48px',
      y: '10%',
      duration: 1.2,
      ease: 'power2.inOut'
    }, 2.8) // Starts near the very end of the 300% scroll distance

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#0a0a0a] z-0 overflow-hidden">
      {/* Wrapper that handles the final recessed exit animation */}
      <div ref={wrapperRef} className="relative w-full h-full origin-top overflow-hidden">
        
        {/* Background 1 (Base) */}
        <div className="absolute inset-[-10%] z-0">
          <img
            ref={bg1Ref}
            src="/forest.png"
            alt="Forest ecosystem base"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/55 pointer-events-none" />
        </div>

        {/* Background 2 (Crossfades in) */}
        <div ref={bg2Ref} className="absolute inset-[-10%] z-0">
          <img
            src="/ecosystem-banner.png"
            alt="Ecosystem shift"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/55 pointer-events-none" />
        </div>

        {/* Content - HUD Layout */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center max-w-[1400px] mx-auto px-8 md:px-16 origin-center">
          
          {/* Top Left Label */}
          <div ref={labelRef} className="absolute top-[15%] left-[8%] md:left-[10%] max-w-[200px] text-left">
            <p className="text-[9px] font-mono tracking-widest text-white/80 uppercase leading-relaxed font-bold">
              Real-Time<br />
              Blockchain-Backed<br />
              Carbon Intelligence
            </p>
          </div>

          {/* Main Centered Text */}
          <div ref={textRef} className="mx-auto max-w-[800px] text-center mt-[-5%]">
            <h2 className="text-[clamp(1.5rem,3.5vw,2.8rem)] font-medium leading-[1.25] tracking-tight text-white drop-shadow-md">
              Our Ecosystem-Level Accounting<br className="hidden md:block" />
              Solutions translate complex<br className="hidden md:block" />
              scientific data into verifiable,<br className="hidden md:block" />
              compliance-ready metrics—so<br className="hidden md:block" />
              you can drive measurable results,<br className="hidden md:block" />
              not just reports.
            </h2>
          </div>

          {/* HUD Markers Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Marker 1 (Bottom Left) */}
            <div ref={marker1Ref} className="absolute bottom-[25%] left-[15%] flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#a3e635]/80 backdrop-blur-md flex items-center justify-center relative shadow-[0_0_20px_rgba(163,230,53,0.5)]">
                <span className="w-3 h-3 border border-[#0a0a0a]/40 rounded-full flex items-center justify-center">
                  <span className="w-1 h-1 bg-[#0a0a0a] rounded-full" />
                </span>
              </div>
              <p className="text-[7px] font-mono tracking-widest text-white/90 uppercase leading-tight font-bold drop-shadow-sm text-left">
                All Emissions<br />
                Measured Using High<br />
                Grade Tech
              </p>
            </div>

            {/* Marker 2 (Center Bottom) */}
            <div ref={marker2Ref} className="absolute bottom-[35%] left-[55%] flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#a3e635]/80 backdrop-blur-md flex items-center justify-center relative shadow-[0_0_20px_rgba(163,230,53,0.5)]">
                <span className="w-3 h-3 border border-[#0a0a0a]/40 rounded-full flex items-center justify-center">
                  <span className="w-1 h-1 bg-[#0a0a0a] rounded-full" />
                </span>
              </div>
              <p className="text-[7px] font-mono tracking-widest text-white/90 uppercase leading-tight font-bold drop-shadow-sm text-left">
                All Measurement<br />
                Data is Validated<br />
                By Protocol
              </p>
            </div>

            {/* Marker 3 (Right Center) */}
            <div ref={marker3Ref} className="absolute bottom-[20%] right-[15%] flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#a3e635]/80 backdrop-blur-md flex items-center justify-center relative shadow-[0_0_20px_rgba(163,230,53,0.5)]">
                <span className="w-3 h-3 border border-[#0a0a0a]/40 rounded-full flex items-center justify-center">
                  <span className="w-1 h-1 bg-[#0a0a0a] rounded-full" />
                </span>
              </div>
              <p className="text-[7px] font-mono tracking-widest text-white/90 uppercase leading-tight font-bold drop-shadow-sm text-left">
                Fully Transparent<br />
                Blockchain Ledger<br />
                Integrated
              </p>
            </div>
          </div>
        </div>

        {/* Side fade vignettes */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-30 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-30 pointer-events-none" />
      </div>
    </section>
  )
}
