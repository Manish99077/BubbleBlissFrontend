import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Star, MapPin, Phone, Clock } from 'lucide-react'
import ParticleField from '../components/ParticleField'
import FloatingOrbs from '../components/FloatingOrbs'
import SectionHeading from '../components/SectionHeading'
import PageWrapper from '../components/PageWrapper'
import { CAFE_INFO, menuItems } from '../data/menuData'

const testimonials = [
  { name: 'Priya Sharma', role: 'Food Blogger, Indore', text: 'The Brown Sugar Milk Tea is absolutely divine! Bubble Bliss has completely redefined café culture in Vijay Nagar. Must visit!', rating: 5 },
  { name: 'Arjun Mehta', role: 'Software Engineer', text: 'Best bubble tea in Indore — no debate. The ambience, the service, the drinks — everything is top class. My weekend ritual now!', rating: 5 },
  { name: 'Sneha Verma', role: 'Interior Designer', text: 'The Blue Lagoon Mojito is the most beautiful drink I have seen. Tastes even better than it looks. Bubble Bliss is pure luxury!', rating: 5 },
]

// Pick 3 featured items with unique images — one from each category
const featured = [
  menuItems.find(m => m.id === 2), // Brown Sugar Milk Tea
  menuItems.find(m => m.id === 25), // Cold Brew
  menuItems.find(m => m.id === 15), // Blue Lagoon Mojito
]

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroYSpring = useSpring(heroY, { stiffness: 100, damping: 30 })

  return (
    <PageWrapper>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroYSpring }} className="absolute inset-0 z-0">
          <img src="/cafe-interior.jpg" alt="Bubble Bliss Café Vijay Nagar Indore" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/75 via-[#080808]/50 to-[#080808]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-[#080808]/50" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)' }} />
        </motion.div>

        <ParticleField />
        <FloatingOrbs />

        {/* Decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="w-[500px] h-[500px] rounded-full border border-gold-500/5 animate-rotateRing" style={{ animationDuration: '25s' }} />
          <div className="absolute w-[350px] h-[350px] rounded-full border border-gold-500/8" style={{ animation: 'rotateRing 18s linear infinite reverse' }} />
        </div>

        {/* Floating Logo */}
        <motion.div className="absolute top-28 right-8 md:right-16 z-20 hidden md:block"
          animate={{ y: [0, -12, 0], rotateY: [0, 6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold-500/50 shadow-2xl"
            style={{ boxShadow: '0 0 50px rgba(212,175,55,0.25), 0 0 100px rgba(212,175,55,0.1)' }}>
            <img src="/logo.jpg" alt="Bubble Bliss Logo" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }}
          className="relative z-20 text-center px-4 sm:px-6 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500/60" />
            <span className="font-body text-[10px] tracking-[0.5em] uppercase text-gold-500/80">Premium Café · Vijay Nagar, Indore</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500/60" />
          </motion.div>

          <div style={{ perspective: '800px' }}>
            <motion.h1 initial={{ opacity: 0, rotateX: -30, y: 50 }} animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ delay: 0.5, duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
              className="section-title text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] text-white leading-none mb-1">
              Sip The
            </motion.h1>
            <motion.h1 initial={{ opacity: 0, rotateX: -30, y: 50 }} animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ delay: 0.7, duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
              className="section-title text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] gold-shimmer leading-none mb-8">
              Bliss
            </motion.h1>
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}
            className="text-white/50 font-body text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed px-4">
            Premium bubble teas, exotic mojitos, artisan coffee & gourmet snacks — crafted with passion at The Hub, Vijay Nagar, Indore.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/menu" className="btn-gold px-8 sm:px-10 py-4 text-xs rounded-full flex items-center gap-2 w-full sm:w-auto justify-center">
              Explore Full Menu <ArrowRight size={14} />
            </Link>
            <Link to="/contact" className="btn-outline px-8 sm:px-10 py-4 text-xs rounded-full w-full sm:w-auto justify-center flex items-center">
              Reserve A Table
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <span className="text-white/25 font-body text-[9px] tracking-[0.4em] uppercase">Scroll</span>
          <motion.div className="w-5 h-8 border border-white/15 rounded-full flex justify-center pt-1.5">
            <motion.div animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-1.5 bg-gold-500 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="bg-dark-800/30 border-y border-gold-500/10 py-4 overflow-hidden">
        <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12 whitespace-nowrap">
          {[...Array(2)].map((_, r) =>
            ['🫧 Premium Bubble Tea', '☕ Artisan Coffee', '🍹 Exotic Mojitos', '🍟 Gourmet Snacks', '📍 Vijay Nagar, Indore', '⭐ 5 Star Rated', '🎉 Events & Bulk Orders'].map((t, i) => (
              <span key={`${r}-${i}`} className="text-white/25 font-body text-xs tracking-[0.25em] uppercase">{t} <span className="text-gold-500/30 mx-4">◆</span></span>
            ))
          )}
        </motion.div>
      </div>

      {/* ═══ CAFE PHOTO + STORY ═══ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="relative">
            <motion.div whileHover={{ rotateY: -4, rotateX: 2, scale: 1.01 }} transition={{ type: 'spring', stiffness: 100 }}
              className="rounded-3xl overflow-hidden gold-glow" style={{ transformStyle: 'preserve-3d', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>
              <img src="/cafe-interior.jpg" alt="Bubble Bliss Café interior Vijay Nagar Indore" className="w-full h-[420px] sm:h-[520px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="glass-dark rounded-xl px-4 py-3 border border-gold-500/20 inline-block">
                  <p className="text-gold-500 font-body text-[10px] tracking-widest uppercase">Vijay Nagar · Indore</p>
                </div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-5 -right-5 glass-dark rounded-2xl px-5 py-4 border border-gold-500/20 shadow-xl hidden sm:block">
              <p className="font-serif text-2xl font-bold gold-text">40+</p>
              <p className="text-white/30 font-body text-[10px] tracking-widest uppercase">Signature Drinks</p>
            </motion.div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 1.5 }}
              className="absolute -top-5 -left-5 glass-dark rounded-2xl px-5 py-4 border border-gold-500/20 shadow-xl hidden sm:block">
              <p className="font-serif text-2xl font-bold gold-text">5 ★</p>
              <p className="text-white/30 font-body text-[10px] tracking-widest uppercase">Guest Rating</p>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-gold-500/40" />
              <span className="text-gold-500 font-body text-[10px] tracking-[0.5em] uppercase">Our Story</span>
            </div>
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight text-left">
              Indore's Most<br /><span className="gold-shimmer">Premium Café</span>
            </h2>
            <p className="text-white/50 font-body text-sm leading-relaxed mb-4">
              Bubble Bliss Café was born at The Hub, Vijay Nagar — Indore's most vibrant neighbourhood — with one mission: to bring the world's finest beverage culture to India's food capital.
            </p>
            <p className="text-white/50 font-body text-sm leading-relaxed mb-8">
              From authentic Taiwanese bubble teas to Cuban-inspired mojitos and Italian espresso — every drink is a global journey crafted by passionate baristas who never settle for ordinary.
            </p>
            <div className="flex gap-8 sm:gap-12 mb-8">
              {[['40+','Drinks'],['5★','Rating'],['10K+','Customers']].map(([num, label]) => (
                <div key={label}>
                  <p className="font-serif text-2xl sm:text-3xl font-bold gold-text">{num}</p>
                  <p className="text-white/30 font-body text-[10px] tracking-widest uppercase">{label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              {[
                [MapPin, `${CAFE_INFO.address}, ${CAFE_INFO.city}`, CAFE_INFO.mapUrl],
                [Phone, CAFE_INFO.phone, `tel:${CAFE_INFO.phone.replace(/\s/g,'')}`],
                [Clock, CAFE_INFO.hours, null],
              ].map(([Icon, text, href], i) => (
                <div key={i} className="flex items-start gap-2 text-white/40 font-body text-xs">
                  <Icon size={12} className="text-gold-500 mt-0.5 shrink-0" />
                  {href ? <a href={href} className="hover:text-gold-400 transition-colors">{text}</a> : <span>{text}</span>}
                </div>
              ))}
            </div>
            <Link to="/about" className="btn-gold px-8 py-3.5 text-xs rounded-full inline-flex items-center gap-2">
              Our Full Story <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ FEATURED DRINKS ═══ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[#060606] relative overflow-hidden">
        <FloatingOrbs />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading eyebrow="Our Signatures" title="Crafted to Perfection" subtitle="Handpicked favourites — made fresh with the finest ingredients every single time." />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {featured.map((item, i) => (
              <motion.div key={item.id}
                initial={{ opacity: 0, y: 60, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.9 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{ transformStyle: 'preserve-3d', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                <div className="aspect-[3/4] overflow-hidden">
                  <motion.img src={item.image} alt={`${item.name} - Bubble Bliss Café Indore`}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.12 }} transition={{ duration: 0.7 }} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/95 via-[#080808]/20 to-transparent" />
                {item.tag && <span className="absolute top-4 left-4 btn-gold text-[9px] px-3 py-1.5 rounded-full">{item.tag}</span>}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <p className="text-gold-500/60 font-body text-[9px] tracking-widest uppercase mb-1">{item.category}</p>
                  <h3 className="font-serif text-lg sm:text-xl text-white mb-1 group-hover:text-gold-400 transition-colors duration-300">{item.name}</h3>
                  <p className="text-white/40 font-body text-xs mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="gold-text font-serif text-xl font-bold">₹{item.price}</span>
                    <span className="text-gold-500/50 font-body text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      View <ArrowRight size={10} />
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl border border-gold-500/0 group-hover:border-gold-500/25 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/menu" className="btn-outline px-10 py-4 text-xs rounded-full inline-flex items-center gap-2">
              View All 45+ Items <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="What People Say" title="Loved By Every Sip" subtitle="Real experiences from our guests in Indore." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-2xl p-6 sm:p-8 hover:border-gold-500/25 transition-all duration-500 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/0 to-transparent group-hover:via-gold-500/40 transition-all duration-700" />
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={12} className="text-gold-500 fill-gold-500" />)}
                </div>
                <p className="text-white/60 font-body text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-600 to-gold-400 flex items-center justify-center shadow-lg shrink-0">
                    <span className="text-dark-900 font-serif text-sm font-bold">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-white font-body text-sm font-semibold">{t.name}</p>
                    <p className="text-white/30 font-body text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="glass-dark rounded-3xl p-10 sm:p-16 border border-gold-500/20 text-center relative overflow-hidden"
            style={{ boxShadow: '0 40px 120px rgba(0,0,0,0.7)' }}>
            <div className="absolute inset-0 rounded-3xl" style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 70%)' }} />
            <p className="text-gold-500 font-body text-[10px] tracking-[0.5em] uppercase mb-4 relative z-10">Franchise Opportunity</p>
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl text-white mb-5 relative z-10">
              Bring <span className="gold-shimmer">Bubble Bliss</span><br />To Your City
            </h2>
            <p className="text-white/40 font-body text-sm mb-10 relative z-10 max-w-md mx-auto leading-relaxed">
              Join India's fastest-growing premium café brand. Complete support — from setup to marketing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link to="/contact" className="btn-gold px-10 py-4 text-xs rounded-full inline-flex items-center justify-center gap-2">
                Get Franchise Details <ArrowRight size={14} />
              </Link>
              <a href={`tel:${CAFE_INFO.phone.replace(/\s/g,'')}`}
                className="btn-outline px-10 py-4 text-xs rounded-full inline-flex items-center justify-center gap-2">
                <Phone size={13} /> Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
