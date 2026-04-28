import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Share2, Globe, MessageCircle } from 'lucide-react'
import { CAFE_INFO } from '../data/menuData'

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] border-t border-gold-500/10 pt-14 pb-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.04) 0%, transparent 60%)' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gold-500/40 shrink-0"
                style={{ boxShadow: '0 0 25px rgba(212,175,55,0.15)' }}>
                <img src="/logo.jpg" alt="Bubble Bliss Café Indore" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-serif text-xl font-bold gold-text">Bubble Bliss</div>
                <div className="text-[9px] tracking-[0.35em] uppercase font-body" style={{ color: 'rgba(212,175,55,0.4)' }}>Café · Vijay Nagar, Indore</div>
              </div>
            </div>
            <p className="text-white/25 font-body text-sm leading-relaxed mb-6">
              Premium bubble tea, exotic mojitos, artisan coffee and gourmet snacks — crafted for those who appreciate the finer sips in life.
            </p>
            <div className="flex gap-3">
              {[
                [Globe, CAFE_INFO.instagram, 'Instagram'],
                [Share2, CAFE_INFO.facebook, 'Facebook'],
                [MessageCircle, `https://wa.me/${CAFE_INFO.whatsapp}`, 'WhatsApp'],
              ].map(([Icon, href, label]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-full border border-gold-500/20 flex items-center justify-center text-gold-500/50 hover:text-gold-500 hover:border-gold-500/60 hover:bg-gold-500/5 transition-all duration-300">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-[10px] tracking-[0.4em] uppercase text-gold-500/50 mb-5">Quick Links</h4>
            <div className="flex flex-col gap-2.5">
              {[['Home','/'],['Menu','/menu'],['About','/about'],['Gallery','/gallery'],['Contact','/contact'],['Admin','/admin/login']].map(([label, path]) => (
                <Link key={path} to={path}
                  className="text-white/30 hover:text-gold-400 font-body text-sm transition-colors duration-300 group flex items-center gap-2">
                  <span className="w-0 group-hover:w-3 h-px bg-gold-500 transition-all duration-300" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-body text-[10px] tracking-[0.4em] uppercase text-gold-500/50 mb-5">Our Menu</h4>
            <div className="flex flex-col gap-2.5">
              {['Bubble Tea (11 varieties)','Mojitos (12 varieties)','Artisan Coffee','Brownies','French Fries','Sandwiches & Wraps'].map(item => (
                <Link key={item} to="/menu"
                  className="text-white/30 hover:text-gold-400 font-body text-sm transition-colors duration-300 group flex items-center gap-2">
                  <span className="w-0 group-hover:w-3 h-px bg-gold-500 transition-all duration-300" />
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-[10px] tracking-[0.4em] uppercase text-gold-500/50 mb-5">Find Us</h4>
            <div className="flex flex-col gap-4">
              <a href={CAFE_INFO.mapUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 text-white/30 hover:text-white/60 transition-colors group">
                <MapPin size={13} className="text-gold-500 mt-0.5 shrink-0" />
                <span className="font-body text-sm leading-relaxed">{CAFE_INFO.address},<br />{CAFE_INFO.city}</span>
              </a>
              <a href={`tel:${CAFE_INFO.phone.replace(/\s/g,'')}`}
                className="flex items-center gap-3 text-white/30 hover:text-gold-400 transition-colors">
                <Phone size={13} className="text-gold-500 shrink-0" />
                <span className="font-body text-sm">{CAFE_INFO.phone}</span>
              </a>
              <a href={`mailto:${CAFE_INFO.email}`}
                className="flex items-center gap-3 text-white/30 hover:text-gold-400 transition-colors">
                <Mail size={13} className="text-gold-500 shrink-0" />
                <span className="font-body text-sm break-all">{CAFE_INFO.email}</span>
              </a>
              <div className="flex items-start gap-3 text-white/30">
                <Clock size={13} className="text-gold-500 mt-0.5 shrink-0" />
                <span className="font-body text-sm">{CAFE_INFO.hours}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/20 font-body text-xs text-center sm:text-left">
            © 2025 Bubble Bliss Café, Vijay Nagar, Indore. All rights reserved.
          </p>
          <p className="text-white/20 font-body text-xs">Crafted with ♥ in Indore, MP</p>
        </div>
      </div>
    </footer>
  )
}
