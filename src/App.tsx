import { useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { TrustSection } from './components/TrustSection'
import { StorySection } from './components/StorySection'
import { SolutionsSection } from './components/SolutionsSection'
import { ScientificCredibility } from './components/ScientificCredibility'
import { WaterCursor } from './components/WaterCursor'
import Lenis from 'lenis'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
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

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="bg-[#020f0a] text-white selection:bg-[#a3e635] selection:text-[#020f0a]">
      <WaterCursor />
      <Navbar />
      <Hero />
      <StorySection />
      <TrustSection />
      <ScientificCredibility />
      <SolutionsSection />
    </div>
  )
}

export default App
