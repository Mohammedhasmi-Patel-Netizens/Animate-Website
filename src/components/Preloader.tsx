import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export const Preloader = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Lock scroll during the intro
    document.body.style.overflow = 'hidden'
    if (window.lenis) {
      // @ts-ignore
      window.lenis.stop()
    }
    
    const timer = setTimeout(() => {
      setLoading(false)
      document.body.style.overflow = ''
      if (window.lenis) {
        // @ts-ignore
        window.lenis.start()
      }
    }, 2200)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
      if (window.lenis) {
        // @ts-ignore
        window.lenis.start()
      }
    }
  }, [])

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: loading ? 0 : '-100vh' }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      className="fixed inset-0 z-[999] bg-[#0a0a0a] flex items-center justify-center pointer-events-none"
    >
      <div className="flex flex-col items-center overflow-hidden">
        {/* Logo Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loading ? 1 : 0, y: loading ? 0 : -20 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex items-center gap-3"
        >
          <div className="w-5 h-5 rounded-full bg-[#a3e635] flex items-center justify-center animate-pulse">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]" />
          </div>
          <span className="text-[15px] font-bold tracking-[0.25em] text-white uppercase">
            Alethia
          </span>
        </motion.div>
        
        {/* Loading Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: loading ? '100px' : 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="h-[1px] bg-[#a3e635] mt-6 opacity-80 shadow-[0_0_10px_rgba(163,230,53,0.5)]"
        />
        
        {/* System Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[9px] font-mono tracking-[0.3em] text-white/40 uppercase mt-5"
        >
          Initializing Connection...
        </motion.div>
      </div>
    </motion.div>
  )
}
