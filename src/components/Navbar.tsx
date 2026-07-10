import { motion } from 'framer-motion'

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center backdrop-blur-md bg-[#0b1f14]/50 border-b border-white/5"
    >
      <div className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white"></div>
        </div>
        ALETHIA
      </div>
      <div className="hidden md:flex space-x-12 text-[11px] font-sans tracking-[0.2em] text-white/80 uppercase">
        <a href="#solutions" className="hover:text-white transition-colors">Solutions ▾</a>
        <a href="#tech" className="hover:text-white transition-colors">Our Tech ▾</a>
        <a href="#company" className="hover:text-white transition-colors">Company ▾</a>
        <a href="#resources" className="hover:text-white transition-colors">Resources ▾</a>
      </div>
      <button className="px-6 py-2.5 bg-white text-black rounded-full text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-white/90 transition-colors">
        Let's Talk
      </button>
    </motion.nav>
  )
}
