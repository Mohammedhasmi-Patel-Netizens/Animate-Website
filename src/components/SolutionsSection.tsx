import { motion } from 'framer-motion'

export const SolutionsSection = () => {
  return (
    <section className="relative min-h-screen py-32 bg-[#F5F5F2] text-[#0A1F16] bg-grid-pattern-light z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-serif tracking-tight max-w-2xl"
          >
            Comprehensive Ecosystem Solutions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-[#0A1F16]/60 max-w-md pb-4"
          >
            End-to-end tools for verifying, tokenizing, and trading high-quality nature-based carbon credits.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Sensing", desc: "Real-time biospheric data collection via distributed IoT networks and satellite triangulation." },
            { title: "Verification", desc: "Automated dMRV protocols ensuring strict adherence to global carbon standards." },
            { title: "Tokenization", desc: "Minting fully traceable, high-integrity carbon credits on public ledgers." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group p-8 rounded-3xl bg-white border border-[#0A1F16]/5 hover:border-[#0A1F16]/20 hover:shadow-2xl hover:shadow-[#0A1F16]/5 transition-all duration-500 cursor-pointer overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[#A5D965]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>
              <h3 className="text-2xl font-serif mb-4 mt-12">{item.title}</h3>
              <p className="text-[#0A1F16]/60 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
