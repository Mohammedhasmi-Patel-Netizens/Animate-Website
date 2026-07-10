import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export const Hero = () => {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  return (
    <section ref={container} className="relative min-h-[120vh] flex flex-col justify-center pt-20 overflow-hidden bg-gradient-to-r from-[#1a3824] to-[#020f0a]">
      {/* Bottom Gradient Fade to transition into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020f0a] to-transparent z-10 pointer-events-none"></div>
      
      {/* Floating Rocks Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.img 
          src="/rocks.png" 
          alt="Mossy Rock" 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
          className="absolute top-[40%] left-[30%] w-[350px] -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl z-10"
        />
        <motion.img 
          src="/rock-left.png" 
          alt="Gray Rock" 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
          className="absolute top-[55%] left-[45%] w-[180px] drop-shadow-2xl"
        />
        <motion.img 
          src="/rock-right.png" 
          alt="Orange Rock Left" 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -400]) }}
          className="absolute bottom-[10%] left-[5%] w-[250px] drop-shadow-2xl"
        />
        <motion.img 
          src="/rocks.png" 
          alt="Small Mossy Rock Right" 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -300]) }}
          className="absolute top-[25%] right-[10%] w-[150px] drop-shadow-2xl scale-x-[-1]"
        />
        <motion.img 
          src="/rock-right.png" 
          alt="Orange Rock Right" 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -250]) }}
          className="absolute bottom-[25%] right-[5%] w-[150px] drop-shadow-2xl rotate-45"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-10 md:px-24 w-full pt-10">
        <motion.div 
          style={{ y, opacity, scale }}
        >
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-[7rem] tracking-tighter font-serif leading-[1.05] text-left max-w-4xl"
          >
            <span className="block">Where Ecosystem</span>
            <span className="block">Science and Enterprise</span>
            <span className="block">Strategy Meet</span>
          </motion.h1>
          
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 0.5 }}
             className="mt-12"
          >
            <a href="#" className="inline-flex items-center px-6 py-2 border border-white/30 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors">
              LET'S TALK <span className="ml-2">→</span>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 text-[15px] leading-relaxed text-white/70 max-w-sm"
          >
            Know your impact—precisely.<br />
            End-to-end environmental intelligence powered by science, blockchain, and transparent data you can trust.
          </motion.p>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 right-10 flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-[#a3e635]"></span>
        <span className="text-[11px] uppercase tracking-widest text-white/50">Scroll to discover</span>
      </motion.div>
    </section>
  )
}
