import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
      className={`mb-16 ${center ? 'text-center' : ''}`}
    >
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-4 ${center ? 'justify-center' : ''}`}>
          <div className="h-px w-10 bg-gold-500/40" />
          <p className="text-gold-500 font-body text-[10px] tracking-[0.5em] uppercase">{eyebrow}</p>
          <div className="h-px w-10 bg-gold-500/40" />
        </div>
      )}
      <h2 className="section-title text-4xl md:text-5xl text-white mb-5">{title}</h2>
      {subtitle && (
        <p className="text-white/40 font-body max-w-lg mx-auto text-sm leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  )
}
