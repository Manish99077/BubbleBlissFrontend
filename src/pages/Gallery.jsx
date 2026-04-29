import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'

const galleryImages = [
  // ROW 1 — Big cafe hero + 2 stacked drinks
  { id:1,  src:'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=85', alt:'Bubble Bliss Café Interior — Vijay Nagar Indore', category:'Café',    span:'col-span-2 row-span-2' },
  { id:2,  src:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=85', alt:'Classic Bubble Tea Close-Up',                      category:'Drinks',  span:'col-span-1 row-span-1' },
  { id:3,  src:'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=85', alt:'Brown Sugar Milk Tea',                           category:'Drinks',  span:'col-span-1 row-span-1' },

  // ROW 2 — Brand tall + 2 drinks
  { id:4,  src:'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&q=85', alt:'Bubble Bliss Brand Identity',                    category:'Brand',   span:'col-span-1 row-span-2' },
  { id:5,  src:'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=85', alt:'Blue Lagoon Mojito',                                 category:'Mojitos', span:'col-span-1 row-span-1' },
  { id:6,  src:'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=85', alt:'Mint Mojito Served Fresh',                          category:'Mojitos', span:'col-span-1 row-span-1' },

  // ROW 3 — Wide cups banner + 1 coffee
  { id:7,  src:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=85', alt:'Barista Pouring Latte Art',                      category:'Coffee',  span:'col-span-2 row-span-1' },
  { id:8,  src:'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=85', alt:'Cold Brew Coffee',                               category:'Coffee',  span:'col-span-1 row-span-1' },

  // ROW 4 — Drinks row
  { id:9,  src:'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&q=85', alt:'Thai Milk Tea',                                  category:'Drinks',  span:'col-span-1 row-span-1' },
  { id:10, src:'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&q=85', alt:'Matcha Latte',                                   category:'Drinks',  span:'col-span-1 row-span-1' },
  { id:11, src:'https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=600&q=85', alt:'Caramel Latte',                                  category:'Coffee',  span:'col-span-1 row-span-1' },

  // ROW 5 — Snacks
  { id:12, src:'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=85', alt:'Walnut Brownie',                                 category:'Snacks',  span:'col-span-1 row-span-1' },
  { id:13, src:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=85', alt:'Cheese Loaded Fries',                            category:'Snacks',  span:'col-span-2 row-span-1' },
]

const filters = ['All', 'Café', 'Drinks', 'Mojitos', 'Coffee', 'Snacks', 'Brand']

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const filtered = filter === 'All' ? galleryImages : galleryImages.filter(i => i.category === filter)

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative pt-36 pb-16 px-4 sm:px-6">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=60"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.07 }}
          />
          <div className="absolute inset-0 bg-[#080808]/93" />
        </div>
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gold-500/40" />
            <span className="text-gold-500 font-body text-[10px] tracking-[0.5em] uppercase">Visual Stories</span>
            <div className="h-px w-10 bg-gold-500/40" />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title text-4xl sm:text-6xl md:text-7xl text-white mb-4"
          >
            Our <span className="gold-shimmer">Gallery</span>
          </motion.h1>
          <p className="text-white/40 font-body max-w-md mx-auto text-sm">
            A visual journey through the craft, colour and comfort of Bubble Bliss Café, Indore.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-5 px-4 sm:px-6 sticky top-16 z-40 bg-[#080808]/92 backdrop-blur-2xl border-b border-gold-500/10">
        <div className="max-w-7xl mx-auto flex gap-2 flex-wrap justify-center">
          {filters.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-body text-[10px] tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-300 ${
                filter === cat
                  ? 'btn-gold'
                  : 'border border-white/10 text-white/40 hover:text-gold-400 hover:border-gold-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-3 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[200px]"
          >
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className={`${img.span} relative group cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden bg-[#1a1a1a]`}
                  onClick={() => setLightbox(img)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => { e.target.style.opacity = '0.3' }}
                  />
                  <div className="absolute inset-0 bg-[#080808]/0 group-hover:bg-[#080808]/45 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full bg-gold-500/20 backdrop-blur-sm border border-gold-500/40 flex items-center justify-center">
                      <ZoomIn size={16} className="text-gold-400" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-gold-500 font-body text-[8px] sm:text-[9px] tracking-widest uppercase">{img.category}</p>
                    <p className="text-white font-serif text-xs sm:text-sm leading-tight">{img.alt.split('—')[0].trim()}</p>
                  </div>
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-gold-500/0 group-hover:border-gold-500/25 transition-all duration-500" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/30 font-body text-sm">No images in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#080808]/97 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.75, opacity: 0 }}
              transition={{ type: 'spring', damping: 22 }}
              className="relative max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="w-full max-h-[82vh] object-contain rounded-xl sm:rounded-2xl shadow-2xl"
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-3 -right-3 w-10 h-10 bg-[#080808] border border-gold-500/30 rounded-full flex items-center justify-center text-white hover:text-gold-500 transition-colors"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-[#080808]/90 to-transparent rounded-b-xl sm:rounded-b-2xl">
                <p className="text-gold-500 font-body text-[9px] tracking-widest uppercase">{lightbox.category}</p>
                <p className="text-white font-serif text-lg">{lightbox.alt.split('—')[0].trim()}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}