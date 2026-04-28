import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, Mail, RefreshCw, Trash2, CheckCircle, UtensilsCrossed, Plus, Edit2, X, Save, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { getEnquiries, updateEnquiryStatus, deleteEnquiry, getDashboardStats, getAllMenuAdmin, createMenuItem, updateMenuItem, toggleMenuItem, deleteMenuItem } from '../../services/api'
import toast from 'react-hot-toast'
import { menuItems as LOCAL_MENU } from '../../data/menuData'

const STATUS_COLORS = {
  NEW:'text-blue-400 bg-blue-400/10 border-blue-400/30',
  READ:'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  REPLIED:'text-green-400 bg-green-400/10 border-green-400/30',
  CLOSED:'text-white/30 bg-white/5 border-white/10',
}
const STATUSES = ['NEW','READ','REPLIED','CLOSED']
const CATEGORIES = ['Bubble Tea','Mojitos','Coffee','Snacks']

function StatCard({ icon:Icon, label, value, color='text-gold-500' }) {
  return (
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} whileHover={{y:-3}}
      className="glass-card rounded-2xl p-5 border border-gold-500/10 hover:border-gold-500/20 transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-body text-[10px] tracking-widest uppercase text-white/30 mb-2">{label}</p>
          <p className={`font-serif text-3xl font-bold ${color}`}>{value}</p>
        </div>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{background:'rgba(212,175,55,0.08)',border:'1px solid rgba(212,175,55,0.15)'}}>
          <Icon size={18} className="text-gold-500"/>
        </div>
      </div>
    </motion.div>
  )
}

function MenuModal({ item, onClose, onSave, loading }) {
  const [form, setForm] = useState(item || {name:'',category:'Bubble Tea',price:'',description:'',image:'',tag:'',available:true})
  const onChange = e => {
    const {name,value,type,checked} = e.target
    setForm(p => ({...p,[name]:type==='checkbox'?checked:value}))
  }
  const handleSave = () => {
    if (!form.name||!form.price) { toast.error('Name and price are required'); return }
    onSave({...form, price:Number(form.price)})
  }
  const inp = 'w-full bg-white/[0.03] border border-white/10 focus:border-gold-500/50 rounded-xl px-4 py-3 text-white font-body text-sm placeholder-white/20 focus:outline-none transition-all'
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 z-[100] bg-[#080808]/95 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}>
      <motion.div initial={{scale:0.9,y:20}} animate={{scale:1,y:0}} exit={{scale:0.9}}
        className="glass-card rounded-2xl p-6 sm:p-7 w-full max-w-lg border border-gold-500/20 relative max-h-[90vh] overflow-y-auto"
        onClick={e=>e.stopPropagation()}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent rounded-t-2xl" />
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-serif text-xl text-white">{item?.id?'Edit Item':'Add New Item'}</h3>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors p-1"><X size={18}/></button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-body text-[10px] tracking-widest uppercase text-white/30 mb-2">Name *</label>
              <input name="name" value={form.name} onChange={onChange} placeholder="Item name" className={inp}/>
            </div>
            <div>
              <label className="block font-body text-[10px] tracking-widest uppercase text-white/30 mb-2">Price (₹) *</label>
              <input name="price" type="number" value={form.price} onChange={onChange} placeholder="99" className={inp}/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-body text-[10px] tracking-widest uppercase text-white/30 mb-2">Category</label>
              <select name="category" value={form.category} onChange={onChange} className={`${inp} cursor-pointer`} style={{background:'#111'}}>
                {CATEGORIES.map(c=><option key={c} value={c} style={{background:'#111'}}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-body text-[10px] tracking-widest uppercase text-white/30 mb-2">Tag</label>
              <input name="tag" value={form.tag||''} onChange={onChange} placeholder="Bestseller, New..." className={inp}/>
            </div>
          </div>
          <div>
            <label className="block font-body text-[10px] tracking-widest uppercase text-white/30 mb-2">Description</label>
            <textarea name="description" value={form.description||''} onChange={onChange} rows={2} placeholder="Short description..." className={`${inp} resize-none`}/>
          </div>
          <div>
            <label className="block font-body text-[10px] tracking-widest uppercase text-white/30 mb-2">Image URL</label>
            <input name="image" value={form.image||''} onChange={onChange} placeholder="https://images.unsplash.com/..." className={inp}/>
            {form.image && <img src={form.image} alt="preview" className="mt-2 h-20 w-full object-cover rounded-lg" onError={e=>e.target.style.display='none'}/>}
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <div className={`w-10 h-5 rounded-full transition-all relative ${form.available?'bg-gold-500':'bg-white/10'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${form.available?'left-5':'left-0.5'}`}/>
            </div>
            <input type="checkbox" name="available" checked={form.available} onChange={onChange} className="hidden"/>
            <span className="text-white/50 font-body text-xs">{form.available?'Available':'Unavailable'}</span>
          </label>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 btn-outline py-3 text-xs rounded-xl">Cancel</button>
          <button onClick={handleSave} disabled={loading}
            className="flex-1 btn-gold py-3 text-xs rounded-xl flex items-center justify-center gap-2 disabled:opacity-50">
            {loading?<div className="w-4 h-4 border-2 border-dark-900/30 border-t-dark-900 rounded-full animate-spin"/>:<><Save size={14}/>Save</>}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function EnquiryRow({ enquiry, onStatus, onDelete }) {
  const [upd, setUpd] = useState(false)
  const handleStatus = async s => { setUpd(true); try { await onStatus(enquiry.id,s); toast.success(`Marked ${s}`) } catch { toast.error('Failed') } finally { setUpd(false) } }
  const handleDel = async () => { if (!confirm('Delete enquiry?')) return; try { await onDelete(enquiry.id); toast.success('Deleted') } catch { toast.error('Failed') } }
  return (
    <motion.div layout initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,x:-20}}
      className="glass-card rounded-2xl p-4 sm:p-5 hover:border-gold-500/20 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`font-body text-[9px] tracking-widest uppercase px-2 py-1 rounded-full border ${STATUS_COLORS[enquiry.status]}`}>{enquiry.status}</span>
            <span className="font-body text-[9px] tracking-widest uppercase px-2 py-1 rounded-full bg-gold-500/8 text-gold-500/60 border border-gold-500/15">{enquiry.subject}</span>
            <span className="text-white/20 font-body text-xs">#{enquiry.id}</span>
          </div>
          <h3 className="text-white font-serif text-lg mb-1">{enquiry.name}</h3>
          <div className="flex items-center gap-3 flex-wrap mb-3">
            <a href={`mailto:${enquiry.email}`} className="text-gold-500/60 hover:text-gold-400 font-body text-xs transition-colors">{enquiry.email}</a>
            <a href={`tel:${enquiry.phone}`} className="text-white/30 hover:text-white/60 font-body text-xs transition-colors">{enquiry.phone}</a>
            <span className="text-white/20 font-body text-xs">{new Date(enquiry.createdAt).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}</span>
          </div>
          <p className="text-white/40 font-body text-sm leading-relaxed bg-white/[0.02] rounded-xl p-3 border border-white/5 whitespace-pre-line text-xs sm:text-sm">{enquiry.message}</p>
        </div>
        <div className="flex sm:flex-col gap-2 shrink-0">
          <select value={enquiry.status} onChange={e=>handleStatus(e.target.value)} disabled={upd}
            className="bg-dark-700 border border-gold-500/20 text-white font-body text-xs rounded-lg px-2 sm:px-3 py-2 focus:outline-none cursor-pointer disabled:opacity-50 text-xs" style={{background:'#111'}}>
            {STATUSES.map(s=><option key={s} value={s} style={{background:'#111'}}>{s}</option>)}
          </select>
          <button onClick={handleDel}
            className="flex items-center justify-center gap-1 px-2 sm:px-3 py-2 rounded-lg border border-red-500/20 text-red-400/50 hover:text-red-400 hover:border-red-400/40 font-body text-xs transition-all">
            <Trash2 size={11}/> <span className="hidden sm:inline">Del</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function AdminDashboard() {
  const { admin, logout } = useAuth()
  const [tab, setTab] = useState('enquiries')
  const [enquiries, setEnquiries] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [menuList, setMenuList] = useState([])
  const [menuFilter, setMenuFilter] = useState('All')
  const [editItem, setEditItem] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)
  const [backendAvailable, setBackendAvailable] = useState(true)

  const fetchEnquiries = useCallback(async () => {
    setLoading(true)
    try {
      const [enqRes, statsRes] = await Promise.all([getEnquiries(page,10), getDashboardStats()])
      setEnquiries(enqRes.data.data.content||[])
      setTotalPages(enqRes.data.data.totalPages||0)
      setStats(statsRes.data.data)
      setBackendAvailable(true)
    } catch {
      setBackendAvailable(false)
      toast.error('Backend not connected. Running in offline mode.')
    } finally { setLoading(false) }
  }, [page])

  const fetchMenu = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getAllMenuAdmin()
      setMenuList(res.data.data||[])
      setBackendAvailable(true)
    } catch {
      // Fallback to local menu data
      setMenuList(LOCAL_MENU.map((m,i) => ({...m, available:true})))
      setBackendAvailable(false)
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { if (tab==='enquiries') fetchEnquiries() }, [fetchEnquiries, tab])
  useEffect(() => { if (tab==='menu') fetchMenu() }, [fetchMenu, tab])

  const handleStatusChange = async (id, status) => {
    await updateEnquiryStatus(id, status)
    setEnquiries(prev => prev.map(e => e.id===id ? {...e, status} : e))
  }
  const handleDeleteEnquiry = async (id) => {
    await deleteEnquiry(id)
    setEnquiries(prev => prev.filter(e => e.id!==id))
  }

  const handleSaveMenu = async (data) => {
    setModalLoading(true)
    try {
      if (editItem?.id) {
        const res = await updateMenuItem(editItem.id, data)
        setMenuList(prev => prev.map(i => i.id===editItem.id ? res.data.data : i))
        toast.success('Item updated!')
      } else {
        const res = await createMenuItem(data)
        setMenuList(prev => [...prev, res.data.data])
        toast.success('Item added!')
      }
      setShowModal(false); setEditItem(null)
    } catch { toast.error('Failed to save. Check backend connection.') }
    finally { setModalLoading(false) }
  }

  const handleToggle = async (id) => {
    try {
      const res = await toggleMenuItem(id)
      setMenuList(prev => prev.map(i => i.id===id ? res.data.data : i))
      toast.success('Availability updated!')
    } catch { toast.error('Failed to update.') }
  }

  const handleDeleteMenu = async (id) => {
    if (!confirm('Delete this menu item?')) return
    try {
      await deleteMenuItem(id)
      setMenuList(prev => prev.filter(i => i.id!==id))
      toast.success('Item deleted!')
    } catch { toast.error('Failed to delete.') }
  }

  const filteredMenu = menuFilter==='All' ? menuList : menuList.filter(i=>i.category===menuFilter)

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Navbar */}
      <div className="glass-dark border-b border-gold-500/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-gold-500/40 shrink-0">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover"/>
            </div>
            <div>
              <p className="font-serif text-base font-bold gold-text leading-none">Bubble Bliss</p>
              <p className="text-white/25 font-body text-[9px] tracking-widest uppercase">Admin · Vijay Nagar, Indore</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!backendAvailable && (
              <span className="hidden sm:block text-yellow-400/70 font-body text-[10px] border border-yellow-400/20 px-2 py-1 rounded-full">⚠ Offline Mode</span>
            )}
            <span className="text-white/25 font-body text-xs hidden md:block">
              <span className="text-gold-500">{admin?.username}</span>
            </span>
            <button onClick={() => { logout(); window.location.href='/admin/login' }}
              className="flex items-center gap-1.5 btn-outline px-3 sm:px-4 py-2 text-[10px] rounded-full">
              <LogOut size={12}/> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <StatCard icon={Mail} label="Total" value={stats.total||0}/>
            <StatCard icon={LayoutDashboard} label="New" value={stats.newCount||0} color="text-blue-400"/>
            <StatCard icon={CheckCircle} label="Replied" value={stats.repliedCount||0} color="text-green-400"/>
            <StatCard icon={UtensilsCrossed} label="Menu Items" value={menuList.length||LOCAL_MENU.length}/>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gold-500/10 pb-4 flex-wrap">
          {[{id:'enquiries',icon:Mail,label:'Enquiries'},{id:'menu',icon:UtensilsCrossed,label:'Menu Management'}].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full font-body text-xs tracking-widest uppercase transition-all duration-300 ${
                tab===t.id?'btn-gold':'border border-white/10 text-white/40 hover:text-gold-400 hover:border-gold-500/30'
              }`}>
              <t.icon size={13}/> {t.label}
            </button>
          ))}
        </div>

        {/* ENQUIRIES */}
        {tab==='enquiries' && (
          <div>
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <h2 className="font-serif text-xl sm:text-2xl text-white">All Enquiries</h2>
              <button onClick={fetchEnquiries} disabled={loading}
                className="flex items-center gap-2 btn-outline px-4 py-2 text-[10px] rounded-full disabled:opacity-40">
                <RefreshCw size={12} className={loading?'animate-spin':''}/> Refresh
              </button>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin"/>
              </div>
            ) : !backendAvailable ? (
              <div className="text-center py-20 glass-card rounded-2xl p-10">
                <Mail size={40} className="text-gold-500/20 mx-auto mb-4"/>
                <p className="text-white/40 font-serif text-xl mb-2">Backend Not Connected</p>
                <p className="text-white/25 font-body text-sm mb-6">Start your Spring Boot backend to view enquiries.</p>
                <code className="text-gold-500/50 font-body text-xs bg-dark-700 px-4 py-2 rounded-lg">mvn spring-boot:run</code>
              </div>
            ) : enquiries.length===0 ? (
              <div className="text-center py-20">
                <Mail size={40} className="text-gold-500/20 mx-auto mb-4"/>
                <p className="text-white/30 font-body">No enquiries yet. Share your website!</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <AnimatePresence>
                  {enquiries.map(e => (
                    <EnquiryRow key={e.id} enquiry={e} onStatus={handleStatusChange} onDelete={handleDeleteEnquiry}/>
                  ))}
                </AnimatePresence>
              </div>
            )}
            {totalPages>1 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                <button onClick={()=>setPage(p=>Math.max(0,p-1))} disabled={page===0} className="btn-outline px-4 sm:px-5 py-2 text-xs rounded-full disabled:opacity-30">Previous</button>
                <span className="text-white/30 font-body text-sm">Page {page+1} of {totalPages}</span>
                <button onClick={()=>setPage(p=>Math.min(totalPages-1,p+1))} disabled={page>=totalPages-1} className="btn-outline px-4 sm:px-5 py-2 text-xs rounded-full disabled:opacity-30">Next</button>
              </div>
            )}
          </div>
        )}

        {/* MENU MANAGEMENT */}
        {tab==='menu' && (
          <div>
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <h2 className="font-serif text-xl sm:text-2xl text-white">Menu Management</h2>
              <button onClick={() => { setEditItem(null); setShowModal(true) }}
                className="btn-gold flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs rounded-full">
                <Plus size={14}/> Add New Item
              </button>
            </div>
            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap mb-5">
              {['All',...CATEGORIES].map(cat => (
                <button key={cat} onClick={() => setMenuFilter(cat)}
                  className={`font-body text-[10px] tracking-widest uppercase px-3 sm:px-4 py-2 rounded-full transition-all duration-300 ${
                    menuFilter===cat?'btn-gold':'border border-white/10 text-white/40 hover:text-gold-400 hover:border-gold-500/30'
                  }`}>
                  {cat} {cat!=='All'&&`(${menuList.filter(i=>i.category===cat).length})`}
                </button>
              ))}
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin"/>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                <AnimatePresence>
                  {filteredMenu.map(item => (
                    <motion.div key={item.id} layout initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.9}}
                      className={`glass-card rounded-2xl overflow-hidden border transition-all ${item.available?'border-gold-500/10 hover:border-gold-500/25':'border-red-500/10 opacity-60'}`}>
                      <div className="relative aspect-video overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover"
                          onError={e=>e.target.src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80'}/>
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent"/>
                        {item.tag && <span className="absolute top-2 left-2 btn-gold text-[8px] px-2 py-1 rounded-full">{item.tag}</span>}
                        {!item.available && <span className="absolute top-2 right-2 text-[8px] px-2 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/25">Unavailable</span>}
                      </div>
                      <div className="p-3 sm:p-4">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-serif text-sm sm:text-base text-white leading-tight pr-1">{item.name}</h3>
                          <span className="text-gold-400 font-serif text-base font-bold shrink-0">₹{item.price}</span>
                        </div>
                        <p className="text-white/30 font-body text-xs mb-2 line-clamp-2 leading-relaxed">{item.description}</p>
                        <span className="text-gold-500/40 font-body text-[9px] tracking-widest uppercase border border-gold-500/15 px-2 py-0.5 rounded-full">{item.category}</span>
                        <div className="flex gap-1.5 mt-3">
                          <button onClick={() => { setEditItem(item); setShowModal(true) }}
                            className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border border-gold-500/20 text-gold-500/50 hover:text-gold-500 hover:border-gold-500/50 font-body text-[10px] transition-all">
                            <Edit2 size={11}/> Edit
                          </button>
                          <button onClick={() => handleToggle(item.id)}
                            className={`flex-1 py-2 rounded-lg border font-body text-[10px] transition-all ${item.available?'border-yellow-500/20 text-yellow-500/50 hover:text-yellow-500 hover:border-yellow-500/50':'border-green-500/20 text-green-500/50 hover:text-green-500 hover:border-green-500/50'}`}>
                            {item.available?'Disable':'Enable'}
                          </button>
                          <button onClick={() => handleDeleteMenu(item.id)}
                            className="px-2.5 py-2 rounded-lg border border-red-500/20 text-red-400/40 hover:text-red-400 hover:border-red-400/40 transition-all">
                            <Trash2 size={11}/>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
            {filteredMenu.length===0 && !loading && (
              <div className="text-center py-16">
                <UtensilsCrossed size={36} className="text-gold-500/20 mx-auto mb-3"/>
                <p className="text-white/30 font-body text-sm">No items in this category.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <MenuModal item={editItem} onClose={() => { setShowModal(false); setEditItem(null) }}
            onSave={handleSaveMenu} loading={modalLoading}/>
        )}
      </AnimatePresence>
    </div>
  )
}
