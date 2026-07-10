import { motion } from 'framer-motion'

export const ScientificCredibility = () => {
  return (
    <section className="relative py-32 bg-[#020f0a] text-white z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Column */}
          <div className="lg:w-1/2 sticky top-32">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight tracking-tight mb-8"
            >
              Scientific Credibility<br />to Corporate Climate Action
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/60 max-w-md"
            >
              The first to bring Atmospheric-Based Digital MRV to corporate climate action—turning emissions data into verified insight.
            </motion.p>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/2 space-y-4 w-full">
            {[
              "U.S. EPA & NOAA STANDARD MONITORING SYSTEMS",
              "WORLD-CLASS SENSOR & SATELLITE INTEGRATION",
              "ALGORITHMIC QUALITY ASSURANCE",
              "BLOCKCHAIN INTEGRITY & TRACEABILITY"
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative px-8 py-6 border border-white/20 rounded-full hover:bg-white/5 transition-all duration-300 cursor-pointer overflow-hidden flex items-center justify-between"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#a3e635] scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300"></div>
                <span className="text-[12px] md:text-[13px] font-sans tracking-[0.15em] font-bold uppercase">{item}</span>
                <span className="text-[#a3e635] opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">→</span>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  )
}
