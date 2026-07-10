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
    // Header sweep
    const headerElements = headerRef.current?.children ? Array.from(headerRef.current.children) : []
    gsap.fromTo(headerElements,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    )

    // Staggered articles entrance
    const articlesArray = articlesRef.current?.children ? Array.from(articlesRef.current.children) : []
    gsap.fromTo(articlesArray,
      { opacity: 0, y: 120, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: articlesRef.current,
          start: 'top 85%',
        }
      }
    )

    // Inner image parallax
    articlesArray.forEach((article) => {
      const img = article.querySelector('img')
      if (img) {
        gsap.fromTo(img, 
          { y: -30 },
          {
            y: 30,
            ease: 'none',
            scrollTrigger: {
              trigger: article,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        )
      }
    })

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative z-10 bg-[#f5f5f3] py-32 overflow-hidden border-t border-black/[0.06]">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">

        {/* Header */}
        <div ref={headerRef}>
          <span className="inline-block mb-6 text-[10px] font-mono tracking-[0.28em] text-[#a3e635] uppercase">
            Latest News & Insights
          </span>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.08] text-[#0a0a0a] mb-16">
            Insights that Move the Market.
          </h2>
        </div>

        {/* Articles grid */}
        <div ref={articlesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group cursor-pointer will-change-transform"
            >
              {/* Image */}
              <div className="rounded-2xl overflow-hidden mb-6 h-[220px]">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-[130%] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="relative -mt-[220px] p-4 z-10">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#0a0a0a]/80 backdrop-blur-sm text-[8px] font-mono tracking-[0.2em] text-white uppercase">
                    {article.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <span className="text-[10px] font-mono text-[#0a0a0a]/30 tracking-wider uppercase mb-3 block">
                {article.date}
              </span>
              <h3 className="text-[1.15rem] font-bold leading-[1.3] tracking-[-0.01em] text-[#0a0a0a] mb-3 group-hover:text-[#0a0a0a]/60 transition-colors duration-300">
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
