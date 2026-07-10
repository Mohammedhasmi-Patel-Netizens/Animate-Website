import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    title: 'Scientific Credibility',
    body:  'U.S. EPA & NOAA-standard monitoring systems with peer-reviewed methodologies for rigorous environmental data collection.',
  },
  {
    title: 'World-Class Understories',
    body:  'Distributed IoT networks across biomes, capturing hyper-local soil, moisture, biodiversity, and flux tower readings.',
  },
  {
    title: 'Blockchain-Backed Traceability',
    body:  'Every data point cryptographically hashed and anchored on a public ledger, ensuring tamper-proof chain of custody.',
  },
  {
    title: 'Enterprise Compliance Ready',
    body:  'Pre-built integrations for CDP, TCFD, SBTi and all major voluntary and compliance carbon market frameworks.',
  },
]

export const ProductGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Tag fade in
    gsap.fromTo(tagRef.current, 
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 1, scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } }
    )

    // Staggered list items
    gsap.fromTo(listRef.current?.children ? Array.from(listRef.current.children) : [],
      { opacity: 0, y: 50, rotateX: -15 },
      { 
        opacity: 1, y: 0, rotateX: 0, 
        duration: 0.8, 
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 85%',
        }
      }
    )

    // Images parallax and reveal
    const images = imagesRef.current?.children ? Array.from(imagesRef.current.children) : []
    
    gsap.fromTo(images[0],
      { opacity: 0, scale: 0.8, y: 100 },
      { 
        opacity: 1, scale: 1, y: 0, 
        duration: 1.2, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imagesRef.current,
          start: 'top 80%',
        }
      }
    )

    gsap.fromTo(images[1],
      { opacity: 0, scale: 0.8, y: 150 },
      { 
        opacity: 1, scale: 1, y: 0, 
        duration: 1.2, 
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imagesRef.current,
          start: 'top 80%',
        }
      }
    )
    
    // Parallax on scroll for the images
    gsap.to(images[0], {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    })
    
    gsap.to(images[1], {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    })

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative z-10 bg-[#0a0a0a] py-32 overflow-hidden shadow-[0_-20px_50px_rgba(10,10,10,1)] perspective-[1000px]">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">

        {/* Section tag */}
        <div ref={tagRef} className="mb-20">
          <span className="text-[10px] font-mono tracking-[0.28em] text-white/30 uppercase">
            02 / Platform
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── LEFT COLUMN — FEATURE LIST ──────────────────────────── */}
          <div ref={listRef} className="space-y-0">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group py-8 border-b border-white/[0.07] cursor-pointer"
              >
                <div className="flex items-start gap-5">
                  <span className="text-[10px] font-mono text-white/20 mt-1 tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-[1.05rem] font-bold tracking-[-0.01em] text-white group-hover:text-[#a3e635] transition-colors duration-300 mb-3">
                      {f.title}
                    </h3>
                    <p className="text-[13.5px] leading-relaxed text-white/40 max-w-[420px]">
                      {f.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── RIGHT COLUMN — SPLIT IMAGERY ───────────────────────── */}
          <div ref={imagesRef} className="grid grid-rows-2 gap-4 h-[560px] lg:h-[640px]">

            {/* Top: Leaves photo */}
            <div className="relative overflow-hidden rounded-2xl will-change-transform">
              <img
                src="/leaves.png"
                alt="Organic leaves close-up"
                className="w-full h-full object-cover scale-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 to-transparent" />
            </div>

            {/* Bottom: Neon accent block */}
            <div className="relative bg-[#a3e635] rounded-2xl p-8 flex flex-col justify-between overflow-hidden will-change-transform">
              {/* Decorative circle */}
              <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-[#0a0a0a]/10" />

              <span className="text-[10px] font-mono tracking-[0.24em] text-[#0a0a0a]/50 uppercase">
                Carbon Markets
              </span>
              <div>
                <h3 className="text-[1.5rem] md:text-[1.8rem] font-bold leading-[1.15] tracking-[-0.025em] text-[#0a0a0a]">
                  Carbon Markets Built on
                  <br />
                  Truth, Not Estimates.
                </h3>
                <p className="mt-4 text-[12.5px] text-[#0a0a0a]/60 font-medium leading-relaxed">
                  Real-World Emissions Data. Enterprise-Wide Climate Clarity.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
