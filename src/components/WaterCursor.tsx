import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export const WaterCursor = () => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  // Spring config for a fluid, bouncy water droplet feel
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const [ripples, setRipples] = useState<Ripple[]>([])

  useEffect(() => {
    let lastTime = 0;
    
    const moveCursor = (e: MouseEvent) => {
      // Offset by half of cursor width (32px / 2 = 16)
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)

      const now = Date.now();
      // Only generate ripples when mouse is moving fast enough or periodically
      if (now - lastTime > 60) { 
        lastTime = now;
        setRipples(prev => [...prev, { x: e.clientX, y: e.clientY, id: now }].slice(-10))
      }
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [cursorX, cursorY])

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              initial={{ opacity: 0.4, scale: 0.2, borderWidth: "2px" }}
              animate={{ opacity: 0, scale: 3, borderWidth: "0px" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute rounded-full border-[#a3e635] shadow-[0_0_10px_rgba(163,230,53,0.3)] bg-[#a3e635]/5 mix-blend-screen"
              style={{
                left: ripple.x - 24,
                top: ripple.y - 24,
                width: 48,
                height: 48,
              }}
            />
          ))}
        </AnimatePresence>
      </div>
      
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 w-8 h-8 bg-white/10 rounded-full backdrop-blur-[2px] border border-white/30 shadow-[0_0_15px_rgba(163,230,53,0.2)] mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
    </>
  )
}
