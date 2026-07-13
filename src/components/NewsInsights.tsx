import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const articles = [
  {
    tag: 'MEDIA & PRESS',
    date: 'APR 2025',
    title: "Alethia's Atmospheric-based Measurement, Reporting,...",
    body: 'Each sensor in our projects captures real-time data on greenhouse gas (GHG) emissions, allowing us to track emission reductions',
    img: '/forest.png',
  },
  {
    tag: 'RESEARCH',
    date: 'MAR 2025',
    title: 'How Blockchain Transforms Carbon Credit Verification',
    body: 'Our blockchain layer ensures every data point is cryptographically hashed, creating an immutable chain of custody for emissions data.',
    img: '/leaves.png',
  },
  {
    tag: 'INSIGHTS',
    date: 'FEB 2025',
    title: 'The Role of Flux Towers in Modern Environmental Monitoring',
    body: 'World Meteorological Organization-grade flux towers provide the gold standard in atmospheric measurement for corporate accountability.',
    img: '/ecosystem-banner.png',
  },
]

export const NewsInsights = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const articlesRef = useRef<HTMLDivElement>(null)

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
      end: '+=200%',
      pin: true,
    })

    const headerElements = headerRef.current?.children ? Array.from(headerRef.current.children) : []
    const articlesArray = articlesRef.current?.children ? Array.from(articlesRef.current.children) : []

    // Initial States
    gsap.set(headerElements, { opacity: 0, y: 80, scale: 0.95, filter: 'blur(10px)' })
    gsap.set(articlesArray, { opacity: 0, y: window.innerHeight * 0.8, z: -500, rotateX: 25, rotateY: 'random(-10, 10)', scale: 0.85 })

    // Phase 1: Header reveals
    tl.to(headerElements, {
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: 'blur(0px)',
      duration: 1.2,
      stagger: 0.2,
      ease: 'power3.out',
    })

    // Phase 2: Articles swoop in 3D stagger
    tl.to(articlesArray, {
      opacity: 1,
      y: 0,
      z: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 2,
      stagger: 0.25,
      ease: 'power4.out',
    }, '-=0.5')

    // Inner image parallax
    articlesArray.forEach((article) => {
      const img = article.querySelector('img')
      if (img) {
        tl.fromTo(img, 
          { y: -30, scale: 1.1 },
          {
            y: 30,
            scale: 1.05,
            duration: 4, // runs alongside timeline
            ease: 'none',
          }, 0
        )
      }
    })

    // Phase 3: Final gentle drift
    tl.to([...headerElements, ...articlesArray], {
      y: -50,
      duration: 1.5,
      ease: 'none',
    })

    // Force a refresh
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative z-10 bg-[#f5f5f3] h-screen w-full flex items-center justify-center overflow-hidden border-t border-black/[0.06] perspective-[1200px]">
      <div className="max-w-[1400px] w-full mx-auto px-8 md:px-16 flex flex-col items-center justify-center relative">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 w-full flex flex-col items-center">
          <span className="inline-block mb-6 text-[10px] font-mono tracking-[0.28em] text-[#a3e635] uppercase">
            Latest News & Insights
          </span>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.08] text-[#0a0a0a] max-w-[800px]">
            Insights that Move the Market.
          </h2>
        </div>

        {/* Articles grid */}
        <div ref={articlesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full perspective-[1000px]">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group cursor-pointer will-change-transform"
            >
              {/* Image */}
              <div className="rounded-2xl overflow-hidden mb-6 h-[220px] shadow-[0_10px_30px_rgba(0,0,0,0.04)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-shadow duration-700">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-[130%] object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="relative -mt-[220px] p-4 z-10">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#0a0a0a]/80 backdrop-blur-sm text-[8px] font-mono tracking-[0.2em] text-white uppercase shadow-sm">
                    {article.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <span className="text-[10px] font-mono text-[#0a0a0a]/30 tracking-wider uppercase mb-3 block">
                {article.date}
              </span>
              <h3 className="text-[1.15rem] font-bold leading-[1.3] tracking-[-0.01em] text-[#0a0a0a] mb-3 group-hover:text-[#a3e635] transition-colors duration-300">
                {article.title}
              </h3>
              <p className="text-[13px] leading-[1.7] text-[#0a0a0a]/40 mb-5">
                {article.body}
              </p>
              <span className="text-[10px] font-mono tracking-[0.18em] text-[#0a0a0a]/40 uppercase group-hover:text-[#0a0a0a] transition-colors duration-300">
                Full Story →
              </span>
            </article>
          ))}
        </div>
        
      </div>
    </section>
  )
}
