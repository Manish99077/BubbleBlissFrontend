import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Leaf } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import SectionHeading from '../components/SectionHeading'
import { menuItems, categories, CAFE_INFO } from '../data/menuData'

// ─── Category emoji map for visual identity ────────────────────────────────
const CATEGORY_EMOJI = {
  'Bubble Tea': '🧋',
  'Mojitos': '🍹',
  'Coffee': '☕',
  'Snacks': '🍟',
}

// ─── MenuCard: each card has its own pinned image, proper fallback ─────────
function MenuCard({ item }) {
  const [imgError, setImgError] = useState(false)

  // Fallback: category-coloured gradient with item initial — never a wrong image
  const FallbackImage = () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1208] to-[#0d0d0d]">
      <span className="text-4xl mb-2">{CATEGORY_EMOJI[item.category] || '🍽️'}</span>
      <span className="text-gold-500/60 font-body text-xs text-center px-3 leading-relaxed">{item.name}</span>
    </div>
  )

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.35 }}
      className="glass-card rounded-2xl overflow-hidden hover:border-gold-500/35 transition-all duration-500 group"
    >
      {/* ── Image section ── */}
      <div className="relative overflow-hidden aspect-[4/3] bg-[#111]">
        {imgError ? (
          <FallbackImage />
        ) : (
          <img
            src={item.image}
            alt={`${item.name} — Bubble Bliss Café Indore`}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={() => setImgError(true)}
          />
        )}

        {/* Gradient overlay — only when image loaded */}
        {!imgError && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 to-transparent pointer-events-none" />
        )}

        {/* Tag badge */}
        {item.tag && (
          <span className="absolute top-3 left-3 btn-gold text-[9px] px-2.5 py-1 rounded-full z-10">
            {item.tag}
          </span>
        )}

        {/* Veg indicator */}
        {item.veg && (
          <span className="absolute top-3 right-3 w-6 h-6 rounded bg-green-600/90 border border-green-400 flex items-center justify-center z-10">
            <Leaf size={10} className="text-white" />
          </span>
        )}
      </div>

      {/* ── Info section ── */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1.5">
          <h3 className="font-serif text-base text-white group-hover:text-gold-400 transition-colors duration-300 leading-tight pr-2">
            {item.name}
          </h3>
          <span className="text-gold-400 font-serif text-lg font-bold shrink-0">₹{item.price}</span>
        </div>

        <p className="text-white/40 font-body text-xs leading-relaxed mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Size + price pills */}
        {item.sizePrices && (
          <div className="flex gap-2 flex-wrap mb-2">
            {Object.entries(item.sizePrices).map(([size, price]) => (
              <span key={size} className="text-[9px] font-body text-white/30 border border-white/10 px-2 py-0.5 rounded-full">
                {size}: ₹{price}
              </span>
            ))}
          </div>
        )}

        <span className="inline-block text-gold-500/50 font-body text-[9px] tracking-widest uppercase border border-gold-500/15 px-2 py-0.5 rounded-full">
          {CATEGORY_EMOJI[item.category]} {item.category}
        </span>
      </div>
    </motion.div>
  )
}

// ─── Main Menu page ────────────────────────────────────────────────────────
export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => menuItems.filter(item => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  }), [activeCategory, search])

  const counts = useMemo(() => {
    const c = { All: menuItems.length }
    categories.slice(1).forEach(cat => { c[cat] = menuItems.filter(i => i.category === cat).length })
    return c
  }, [])

  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6">
        <div className="absolute inset-0">
          <img src="/cafe-interior.jpg" alt="Bubble Bliss Menu" className="w-full h-full object-cover" style={{ opacity: 0.07 }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/95 to-[#080808]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-10 bg-gold-500/40" />
              <span className="text-gold-500 font-body text-[10px] tracking-[0.5em] uppercase">Our Offerings</span>
              <div className="h-px w-10 bg-gold-500/40" />
            </div>
            <h1 className="section-title text-4xl sm:text-6xl md:text-7xl text-white mb-4">
              Our <span className="gold-shimmer">Menu</span>
            </h1>
            <p className="text-white/40 font-body max-w-lg mx-auto text-sm">
              45+ handcrafted drinks & gourmet bites — made fresh at Bubble Bliss Café, Vijay Nagar, Indore
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Sticky Filters ── */}
      <section className="py-5 px-4 sm:px-6 sticky top-16 z-40 bg-[#080808]/92 backdrop-blur-2xl border-b border-gold-500/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-body text-[10px] tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === cat
                    ? 'btn-gold shadow-lg'
                    : 'border border-white/10 text-white/40 hover:text-gold-400 hover:border-gold-500/30'
                }`}
              >
                {cat !== 'All' && CATEGORY_EMOJI[cat]} {cat}{' '}
                <span className="ml-1 opacity-60">({counts[cat]})</span>
              </button>
            ))}
          </div>

          <div className="relative">
            <Search size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/50" />
            <input
              type="text"
              placeholder="Search menu..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-white/[0.04] border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-white font-body text-sm focus:outline-none focus:border-gold-500/50 w-full sm:w-52 placeholder-white/20 transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* ── Menu Grid ── */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <Search size={40} className="text-gold-500/20 mx-auto mb-4" />
              <p className="text-white/30 font-body">No items found for "{search}"</p>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              <AnimatePresence>
                {filtered.map(item => <MenuCard key={item.id} item={item} />)}
              </AnimatePresence>
            </motion.div>
          )}
          <p className="text-center text-white/20 font-body text-xs mt-8">
            Showing {filtered.length} of {menuItems.length} items · All prices inclusive of taxes · 🌿 All items are vegetarian
          </p>
        </div>
      </section>
    </PageWrapper>
  )
}
