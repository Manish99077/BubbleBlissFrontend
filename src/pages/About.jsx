import { motion } from 'framer-motion'
import { Target, Eye, Heart, Award, MapPin, Clock, Phone } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import SectionHeading from '../components/SectionHeading'
import FloatingOrbs from '../components/FloatingOrbs'
import { CAFE_INFO } from '../data/menuData'

const values = [
  { icon: Heart, title: 'Passion First', desc: 'Every drink crafted with genuine love. We never compromise on quality or the joy of creation.' },
  { icon: Award, title: 'Premium Quality', desc: 'Only the finest ingredients from around the world find their way into your cup.' },
  { icon: Target, title: 'Innovation', desc: 'Constantly exploring new flavour combinations to keep your palate excited and inspired.' },
  { icon: Eye, title: 'Experience', desc: 'From ambience to the last sip — every detail designed to make you feel extraordinary.' },
]

export default function About() {
  return (
    <PageWrapper>
      <section className="relative pt-36 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/cafe-interior.jpg" alt="About Bubble Bliss Café Indore" className="w-full h-full object-cover" style={{ opacity: 0.1 }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/95 via-[#080808]/80 to-[#080808]" />
        </div>
        <FloatingOrbs />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-gold-500/40" />
              <span className="text-gold-500 font-body text-[10px] tracking-[0.5em] uppercase">Our Story</span>
              <div className="h-px w-10 bg-gold-500/40" />
            </div>
            <h1 className="section-title text-4xl sm:text-6xl md:text-7xl text-white mb-5">
              About <span className="gold-shimmer">Bubble Bliss</span>
            </h1>
            <p className="text-white/40 font-body text-base sm:text-lg leading-relaxed">
              Indore's most premium café experience — born at The Hub, Vijay Nagar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <motion.div whileHover={{ rotateY: -4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 100 }}
              className="rounded-3xl overflow-hidden gold-glow" style={{ transformStyle: 'preserve-3d' }}>
              <img src="/brand-mockup.jpg" alt="Bubble Bliss brand" className="w-full h-[420px] sm:h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 to-transparent" />
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-gold-500/40" />
              <span className="text-gold-500 font-body text-[10px] tracking-[0.5em] uppercase">Who We Are</span>
            </div>
            <h2 className="section-title text-3xl sm:text-4xl text-white mb-6 text-left">
              The Bliss <span className="gold-shimmer">Behind Every Cup</span>
            </h2>
            <p className="text-white/50 font-body text-sm leading-relaxed mb-4">
              Bubble Bliss Café was born in Vijay Nagar — Indore's most vibrant neighbourhood — with a bold vision: to redefine what a café experience can be. We are not just another beverage place. We are a <em className="text-gold-500/70 not-italic">destination</em>.
            </p>
            <p className="text-white/50 font-body text-sm leading-relaxed mb-4">
              Inspired by the luxury café culture of Taiwan, Tokyo and Milan, we crafted a menu that speaks to both the connoisseur and the curious. Every recipe took months of testing, tasting and perfecting.
            </p>
            <p className="text-white/50 font-body text-sm leading-relaxed mb-8">
              Today, Bubble Bliss stands as Indore's most premium café brand — where every element, from our stunning interior to the last sip of your bubble tea, is designed to make you feel extraordinary.
            </p>
            <div className="space-y-3">
              {[
                [MapPin, CAFE_INFO.fullAddress, CAFE_INFO.mapUrl],
                [Phone, CAFE_INFO.phone, `tel:${CAFE_INFO.phone.replace(/\s/g,'')}`],
                [Clock, CAFE_INFO.hours, null],
              ].map(([Icon, text, href], i) => (
                <div key={i} className="flex items-start gap-3">
                  <Icon size={14} className="text-gold-500 mt-0.5 shrink-0" />
                  {href ? <a href={href} className="text-white/50 hover:text-gold-400 font-body text-sm transition-colors">{text}</a>
                        : <span className="text-white/50 font-body text-sm">{text}</span>}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 bg-[#060606] relative">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.04) 0%, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative z-10">
          {[['40+','Signature Drinks'],['5★','Customer Rating'],['2+','Years of Bliss'],['10K+','Happy Customers']].map(([num, label], i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <p className="font-serif text-3xl sm:text-5xl font-bold gold-text mb-2">{num}</p>
              <p className="text-white/30 font-body text-[10px] sm:text-xs tracking-widest uppercase">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Our Purpose" title="Mission & Vision" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              { Icon: Target, title: 'Our Mission', text: 'To deliver consistently high-quality, innovative beverages that bring joy and luxury to everyday moments in Indore. We are committed to using the finest ingredients, training our team to the highest standards, and creating an environment where every guest feels truly valued and indulged.' },
              { Icon: Eye, title: 'Our Vision', text: 'To become India\'s most recognised and beloved premium café brand — synonymous with quality, creativity and warmth. We envision a Bubble Bliss in every major city, each an island of luxury and comfort for the discerning café lover who refuses to settle for ordinary.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-2xl p-8 sm:p-10 hover:border-gold-500/25 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/0 to-transparent group-hover:via-gold-500/40 transition-all duration-700" />
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)' }}>
                  <item.Icon size={24} className="text-gold-500" />
                </div>
                <h3 className="font-serif text-2xl text-white mb-4">{item.title}</h3>
                <p className="text-white/40 font-body text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 bg-[#060606]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="What Drives Us" title="Our Core Values" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl p-6 sm:p-7 text-center hover:border-gold-500/25 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                  style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)' }}>
                  <v.icon size={20} className="text-gold-500" />
                </div>
                <h3 className="font-serif text-lg text-white mb-3">{v.title}</h3>
                <p className="text-white/35 font-body text-xs leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
