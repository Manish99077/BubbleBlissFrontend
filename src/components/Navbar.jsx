import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { CAFE_INFO } from '../data/menuData'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'About', path: '/about' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setMobileOpen(false), [location])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#080808]/96 backdrop-blur-xl border-b border-gold-500/15 py-3 shadow-2xl' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-gold-500/50 group-hover:border-gold-500 transition-all duration-400 shrink-0"
            style={{ boxShadow: '0 0 20px rgba(212,175,55,0.2)' }}>
            <img src="/logo.jpg" alt="Bubble Bliss Logo" className="w-full h-full object-cover" />
          </div>
          <div className="hidden sm:block">
            <div className="font-serif text-lg font-bold gold-text leading-none">Bubble Bliss</div>
            <div className="text-[9px] tracking-[0.3em] uppercase font-body" style={{ color: 'rgba(212,175,55,0.5)' }}>Café · Vijay Nagar, Indore</div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}
              className={`font-body text-xs tracking-[0.18em] uppercase transition-all duration-300 relative group ${
                location.pathname === link.path ? 'text-gold-500' : 'text-white/60 hover:text-gold-400'
              }`}>
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-500 ${
                location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a href={`tel:${CAFE_INFO.phone.replace(/\s/g,'')}`}
            className="flex items-center gap-2 text-white/40 hover:text-gold-400 transition-colors font-body text-xs">
            <Phone size={12} className="text-gold-500" />{CAFE_INFO.phone}
          </a>
          <Link to="/contact" className="btn-gold relative z-10 px-6 py-2.5 text-[10px] rounded-full">Reserve Table</Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-gold-500 p-2 rounded-lg border border-gold-500/20 hover:border-gold-500/50 transition-all">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#080808]/98 backdrop-blur-2xl border-t border-gold-500/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div key={link.path} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  <Link to={link.path}
                    className={`font-body text-sm tracking-widest uppercase block py-3 border-b border-white/5 ${
                      location.pathname === link.path ? 'text-gold-500' : 'text-white/50'
                    }`}>{link.name}</Link>
                </motion.div>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a href={`tel:${CAFE_INFO.phone.replace(/\s/g,'')}`}
                  className="flex items-center gap-2 text-white/40 font-body text-sm">
                  <Phone size={14} className="text-gold-500" />{CAFE_INFO.phone}
                </a>
                <Link to="/contact" className="btn-gold px-6 py-3 text-xs rounded-full text-center">Reserve A Table</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
