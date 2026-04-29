import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'

const galleryImages = [
  // DRINKS
  { id:1,  src:'https://plus.unsplash.com/premium_photo-1671379526961-1aebb82b317b?fm=jpg&q=60&w=800&auto=format&fit=crop',      alt:'Classic Milk Tea',        category:'Drinks'  },
  { id:2,  src:'https://www.shutterstock.com/image-photo/cup-sweet-brown-sugar-pearl-600nw-2655223425.jpg',                 alt:'Brown Sugar Milk Tea',    category:'Drinks'  },
  { id:3,  src:'https://images.unsplash.com/photo-1644203541701-0c534473e616?fm=jpg&q=60&w=800&auto=format&fit=crop',            alt:'Thai Milk Tea',           category:'Drinks'  },
  { id:4,  src:'https://media.istockphoto.com/id/497654828/photo/taro-bubble-tea.jpg?s=612x612&w=0&k=20&c=W3vU1FwU86UbX_G25w8PIC6apGewBJBcQLnOQi4fkxM=', alt:'Taro Bubble Tea', category:'Drinks' },
  { id:5,  src:'https://media.istockphoto.com/id/1358745285/photo/pouring-green-matcha-into-glass-with-milk-bubble-tea-at-black-wooden-table-closeup.jpg?s=612x612&w=0&k=20&c=Nr8woKM22v54DUTuEn3ZzSKGnK9UjjxtbZBjaXs6b2U=', alt:'Matcha Bubble Tea', category:'Drinks' },
  { id:6,  src:'https://t4.ftcdn.net/jpg/19/12/83/43/360_F_1912834397_EU9Di4rQJb0AKm3zsDN2gCRAxJh2ChNh.jpg',                   alt:'Mango Bubble Tea',        category:'Drinks'  },
  { id:7,  src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPzvz5IVbK6lRGHLTuOI32ecT6gVTO7Xlung&s',                 alt:'Strawberry Bubble Tea',   category:'Drinks'  },
  { id:8,  src:'https://myveganminimalist.com/wp-content/uploads/2022/05/Oreo-Bubble-Milk-Tea-Boba-12-1024x1536.jpg',            alt:'Oreo Bubble Tea',         category:'Drinks'  },
  // MOJITOS
  { id:9,  src:'https://kitchenswagger.com/wp-content/uploads/2020/07/mojito-recipe_0009_DSC_5509.jpg',                          alt:'Mint Mojito',             category:'Mojitos' },
  { id:10, src:'https://static.tossdown.com/images/7b0ff8a6-a2c0-484c-8307-d73082112b18.webp',                                  alt:'Blue Lagoon Mojito',      category:'Mojitos' },
  { id:11, src:'https://bellyfull.net/wp-content/uploads/2022/06/Frozen-Strawberry-Mojito-blog-2.jpg',                          alt:'Strawberry Mojito',       category:'Mojitos' },
  { id:12, src:'https://media.istockphoto.com/id/479079920/photo/watermelon-mojito.jpg?s=612x612&w=0&k=20&c=t4bKU9u87_0x3Rj7lGNGOTO4rET6BTHpQ2hFLkO95H8=', alt:'Watermelon Mojito', category:'Mojitos' },
  { id:13, src:'https://media.istockphoto.com/id/1454250040/photo/boozy-refreshing-pineapple-mojito-cocktail.jpg?s=612x612&w=0&k=20&c=ZzpepKAbu5dlV34njRKKFg9OQ_saMU4Zg0KvDdcDsHc=', alt:'Pineapple Mojito', category:'Mojitos' },
  { id:14, src:'https://img.clevup.in/336545/SKU-0285_0-1724525497177.jpg?width=600&format=webp',                                alt:'Bubble Gum Mojito',       category:'Mojitos' },
  // COFFEE
  { id:15, src:'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2Farchive%2F9eada0d203bfb580d801b478edd553465c7afb52', alt:'Cold Brew Coffee', category:'Coffee' },
  { id:16, src:'https://www.chilitochoc.com/wp-content/uploads/2022/12/homemade-caramel-latte-ft.jpg',                          alt:'Caramel Latte',           category:'Coffee'  },
  { id:17, src:'https://media.istockphoto.com/id/1324007808/photo/dalgona-coffee-with-coffee-beans-on-table.jpg?s=612x612&w=0&k=20&c=rMYdqfDabwczSHdceHnrCNwawEhTQy4N7hPqzJErl5c=', alt:'Dalgona Coffee', category:'Coffee' },
  { id:18, src:'https://media.istockphoto.com/id/1308045723/photo/cold-coffee-frappuccino.jpg?s=612x612&w=0&k=20&c=drB225PkXKnjRzym-06I3rQs2dawXXb2mxsdbkj9aK0=', alt:'Mocha Frappe', category:'Coffee' },
  // SNACKS
  { id:19, src:'https://theobroma.in/cdn/shop/files/WalnutBrownie02.jpg?v=1711183450',                                           alt:'Walnut Brownie',          category:'Snacks'  },
  { id:20, src:'https://img.freepik.com/free-photo/brownie-chocolate-ice-cream-mint-sugar-powder-side-view_141793-15452.jpg?semt=ais_hybrid&w=740&q=80', alt:'Sizzling Brownie', category:'Snacks' },
  { id:21, src:'https://thumbs.dreamstime.com/b/french-fries-sprinkled-salt-iron-bucket-painted-wooden-table-beautiful-light-sprinkle-53992264.jpg', alt:'Salted Fries', category:'Snacks' },
  { id:22, src:'https://t3.ftcdn.net/jpg/12/10/11/00/360_F_1210110090_x9fJWPscHj4pkythvbjf52oXzQgKLr4p.jpg',                   alt:'Cheese Loaded Fries',     category:'Snacks'  },
  { id:23, src:'https://rakskitchen.net/wp-content/uploads/2018/07/corn-cheese-sandwich-recipe-500x500.jpg',                    alt:'Cheese Corn Sandwich',    category:'Snacks'  },
  { id:24, src:'https://t3.ftcdn.net/jpg/01/01/68/40/360_F_101684055_3ljuQD0UWy58RJBUJMMiHpOVrAFZRomK.jpg',                   alt:'Club Sandwich',           category:'Snacks'  },
]

const filters = ['All', 'Drinks', 'Mojitos', 'Coffee', 'Snacks']

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const filtered = filter === 'All' ? galleryImages : galleryImages.filter(i => i.category === filter)

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative pt-36 pb-16 px-4 sm:px-6">
        <div className="absolute inset-0">
          <img
            src="https://plus.unsplash.com/premium_photo-1671379526961-1aebb82b317b?fm=jpg&q=60&w=1200&auto=format&fit=crop"
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

      {/* Gallery Grid — simple uniform cards, no span tricks */}
      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          >
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                  className="relative group cursor-pointer rounded-xl overflow-hidden bg-[#1a1a1a] aspect-square"
                  onClick={() => setLightbox(img)}
                >
                  {/* aspect-square + object-cover = no overflow, always fills box */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#080808]/0 group-hover:bg-[#080808]/50 transition-all duration-500" />

                  {/* Zoom icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full bg-gold-500/20 backdrop-blur-sm border border-gold-500/40 flex items-center justify-center">
                      <ZoomIn size={16} className="text-gold-400" />
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400 bg-gradient-to-t from-[#080808]/90 to-transparent">
                    <p className="text-gold-500 font-body text-[8px] tracking-widest uppercase">{img.category}</p>
                    <p className="text-white font-serif text-xs leading-tight line-clamp-1">{img.alt}</p>
                  </div>

                  {/* Border glow */}
                  <div className="absolute inset-0 rounded-xl border border-gold-500/0 group-hover:border-gold-500/30 transition-all duration-500" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/30 font-body text-sm">No images in this category.</p>
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
            className="fixed inset-0 z-[200] bg-[#080808]/97 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 22 }}
              className="relative max-w-3xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-[#080808] border border-gold-500/30 rounded-full flex items-center justify-center text-white hover:text-gold-500 transition-colors z-10"
              >
                <X size={16} />
              </button>
              <div className="mt-3 text-center">
                <p className="text-gold-500 font-body text-[9px] tracking-widest uppercase">{lightbox.category}</p>
                <p className="text-white font-serif text-base mt-1">{lightbox.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}