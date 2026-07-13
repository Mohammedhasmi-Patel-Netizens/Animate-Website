import { useEffect } from 'react'
import { Preloader }         from './components/Preloader'
import { Navbar }            from './components/Navbar'
import { Hero }              from './components/Hero'
import { StorySection }      from './components/StorySection'
import { ForestBanner }      from './components/ForestBanner'
import { ProductGrid }       from './components/ProductGrid'
import { MarqueeDivider }    from './components/MarqueeDivider'
import { DiagramSection }    from './components/DiagramSection'
import { SolutionsSection }  from './components/SolutionsSection'
import { TrustProblem }      from './components/TrustProblem'
import { RedefiningSection } from './components/RedefiningSection'
import { CaseStudies }       from './components/CaseStudies'
import { NewsInsights }      from './components/NewsInsights'
import { Footer }            from './components/Footer'
import { WaterCursor }       from './components/WaterCursor'
import Lenis from 'lenis'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05, // Much smoother, heavier feeling (replaces duration/easing for a physics-based glide)
      wheelMultiplier: 0.7, // Slows down the mouse wheel speed
      smoothWheel: true,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      touchMultiplier: 1.5,
    })

    // @ts-ignore
    window.lenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => { lenis.destroy() }
  }, [])

  return (
    <div className="bg-[#0a0a0a] text-white selection:bg-[#a3e635] selection:text-[#0a0a0a]">
      <Preloader />
      <WaterCursor />
      <Navbar />
      
      {/* ── DARK SECTIONS ──────────────────────────────────────────── */}
      <Hero />
      <StorySection />
      <ForestBanner />
      <div id="platform-capabilities"><ProductGrid /></div>
      <div id="technology"><DiagramSection /></div>
      
      {/* ── WHITE / LIGHT SECTIONS ─────────────────────────────────── */}
      <MarqueeDivider />
      <div id="our-solutions"><SolutionsSection /></div>
      <div id="company">
        <TrustProblem />
        <RedefiningSection />
      </div>
      <div id="resources">
        <CaseStudies />
        <NewsInsights />
      </div>
      
      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <div id="footer"><Footer /></div>
    </div>
  )
}

export default App
