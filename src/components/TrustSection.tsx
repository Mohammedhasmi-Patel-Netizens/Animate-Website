import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export const TrustSection = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  // Different parallax speeds for cards
  const y1 = useTransform(scrollYProgress, [0, 1], [150, -150])
  const y2 = useTransform(scrollYProgress, [0, 1], [300, -300])
  const y3 = useTransform(scrollYProgress, [0, 1], [-100, 200])
  const y4 = useTransform(scrollYProgress, [0, 1], [50, -250])

  return (
    <section ref={ref} className="relative min-h-[120vh] py-32 overflow-hidden bg-[#05110a]">
      <div className="max-w-7xl mx-auto px-6 relative z-20 flex flex-col items-center pt-32">
        <motion.h2 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="text-4xl md:text-6xl lg:text-7xl font-serif text-center mb-32 tracking-tight"
        >
          The Biggest Problem in<br/>Climate Action: <span className="italic text-gradient">Trust</span>
        </motion.h2>
      </div>

      <div className="absolute inset-0 pointer-events-none z-10 flex justify-center items-center">
        {/* Card 1 */}
        <motion.div style={{ y: y1 }} className="absolute top-[20%] left-[15%] glass-panel p-6 rounded-2xl w-72">
           <div className="text-sm text-white/60 mb-3 uppercase tracking-wider">GHG Emissions</div>
           <div className="text-4xl font-mono text-white">3,255</div>
           <div className="text-sm text-[#A5D965] mt-2 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-[#A5D965]"></span>
             +12% YoY Target
           </div>
        </motion.div>
        
        {/* Card 2 */}
        <motion.div style={{ y: y2 }} className="absolute top-[40%] right-[10%] glass-panel p-6 rounded-2xl w-80">
           <div className="text-sm text-white/60 mb-3 uppercase tracking-wider">Soil Moisture</div>
           <div className="text-4xl font-mono text-white">42.152<span className="text-lg text-white/40 ml-1">%</span></div>
           <div className="h-2 mt-6 w-full bg-white/10 rounded-full overflow-hidden relative">
             <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: '70%' }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, delay: 0.5 }}
               className="h-full bg-[#A5D965]"
             />
           </div>
        </motion.div>
        
        {/* Card 3 */}
        <motion.div style={{ y: y3 }} className="absolute bottom-[20%] left-[25%] glass-panel p-5 rounded-2xl w-64">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
             </div>
             <div>
               <div className="text-xs uppercase tracking-wider text-white/60">Carbon Offset</div>
               <div className="text-xl font-bold font-serif italic mt-1">Verified Node</div>
             </div>
           </div>
        </motion.div>

        {/* Card 4 - Additional Data */}
        <motion.div style={{ y: y4 }} className="absolute top-[60%] left-[60%] glass-panel p-6 rounded-2xl w-56">
           <div className="text-sm text-white/60 mb-2 uppercase tracking-wider">Data Integrity</div>
           <div className="text-2xl font-mono text-[#A5D965]">99.99%</div>
        </motion.div>
      </div>
    </section>
  )
}
