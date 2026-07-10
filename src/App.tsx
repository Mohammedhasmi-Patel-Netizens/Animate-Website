import { useEffect } from 'react'
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
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => { lenis.destroy() }
  }, [])

  return (
    <div className="bg-[#0a0a0a] text-white selection:bg-[#a3e635] selection:text-[#0a0a0a]">
      <WaterCursor />
      <Navbar />
      
      {/* ── DARK SECTIONS ──────────────────────────────────────────── */}
      <Hero />
      <StorySection />
      <ForestBanner />
      <ProductGrid />
      <DiagramSection />
      
      {/* ── WHITE / LIGHT SECTIONS ─────────────────────────────────── */}
      <MarqueeDivider />
      <SolutionsSection />
      <TrustProblem />
      <RedefiningSection />
      <CaseStudies />
      <NewsInsights />
      
      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <Footer />
    </div>
  )
}

export default App
