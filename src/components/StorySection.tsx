import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export const StorySection = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  })

  // The center element rotates 360 degrees and rises based on scroll
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const yRock = useTransform(scrollYProgress, [0, 0.3], [400, 0])
  
  return (
    <section ref={targetRef} className="relative min-h-[150vh] bg-[#020f0a] flex items-center justify-center">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#a3e635] blur-[120px] opacity-10 rounded-full z-0 pointer-events-none" />

        {/* Story Texts (Z-10: Behind the rock) */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center w-full px-6 text-center drop-shadow-md">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1 }}
            className="max-w-5xl mx-auto flex flex-col items-center"
          >
            <div className="flex justify-center mb-6">
              <span className="px-4 py-1.5 bg-[#a3e635]/10 border border-[#a3e635]/30 rounded text-[11px] font-bold tracking-[0.2em] text-[#a3e635] uppercase backdrop-blur-sm">
                OUR STORY
              </span>
            </div>
            <h3 className="text-4xl md:text-6xl lg:text-[5.5rem] font-serif mb-8 leading-[1.05] tracking-tight">
              From Data Chaos to <br/>
              <span className="italic">Science-Backed, </span><br/>
              <span className="italic">Actionable Insights</span>
            </h3>
            <p className="text-lg md:text-[21px] text-white/80 max-w-2xl mx-auto leading-relaxed mt-10">
              A Breakthrough in Environmental Measurement, <br/>Built for Commercial Use.
            </p>
          </motion.div>
        </div>

        {/* Central Rotating Rock (Z-20: In front of the text) */}
        <motion.div 
          style={{ rotate, scale, y: yRock }}
          className="absolute z-20 flex items-center justify-center w-[600px] h-[600px] md:w-[800px] md:h-[800px]"
        >
          <img 
            src="/rock-center.png" 
            alt="Rotating 3D Rock" 
            className="w-full h-full object-contain mix-blend-normal drop-shadow-2xl opacity-90"
          />
        </motion.div>

        {/* Additional Floating Rocks in background */}
        <motion.img 
          src="/rock-left.png"
          style={{ y: useTransform(scrollYProgress, [0, 1], [200, -400]) }}
          className="absolute left-[5%] bottom-[10%] w-[300px] opacity-70 z-30 blur-[2px]"
        />
        <motion.img 
          src="/rock-right.png"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-200, 400]) }}
          className="absolute right-[5%] top-[20%] w-[250px] opacity-60 z-0 blur-[3px]"
        />

      </div>
    </section>
  )
}
