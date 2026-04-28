import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Plus, Minus, MessageCircle } from 'lucide-react'
import { submitEnquiry } from '../services/api'
import PageWrapper from '../components/PageWrapper'
import FloatingOrbs from '../components/FloatingOrbs'
import { CAFE_INFO, menuItems } from '../data/menuData'

const ENQUIRY_TYPES = [
  { value:'', label:'Select enquiry type *' },
  { value:'General', label:'💬 General Enquiry' },
  { value:'Franchise', label:'🏪 Franchise Opportunity' },
  { value:'Bulk Order', label:'📦 Bulk / Corporate Order' },
  { value:'Event', label:'🎉 Event & Party Booking' },
  { value:'Feedback', label:'⭐ Feedback / Suggestion' },
  { value:'Career', label:'💼 Career / Jobs' },
  { value:'Other', label:'📝 Other' },
]

const MENU_CATS = ['Bubble Tea','Mojitos','Coffee','Snacks']

const init = { name:'',email:'',phone:'',enquiryType:'',selectedItems:[],quantity:'',eventDate:'',numberOfPeople:'',budget:'',message:'' }

function validate(f) {
  const e = {}
  if (!f.name.trim()) e.name='Name is required'
  if (!f.email.trim()) e.email='Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email='Enter valid email'
  if (!f.phone.trim()) e.phone='Phone is required'
  if (!f.enquiryType) e.enquiryType='Please select enquiry type'
  return e
}

export default function Contact() {
  const [form, setForm] = useState(init)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [expandedCat, setExpandedCat] = useState(null)

  const onChange = e => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]:'' }))
  }

  const toggleItem = item => setForm(p => ({
    ...p,
    selectedItems: p.selectedItems.includes(item)
      ? p.selectedItems.filter(i => i !== item)
      : [...p.selectedItems, item]
  }))

  const buildMsg = f => {
    const parts = []
    if (f.selectedItems.length) parts.push(`Items Interested:\n${f.selectedItems.map(i=>`• ${i}`).join('\n')}`)
    if (f.quantity) parts.push(`Quantity: ${f.quantity}`)
    if (f.numberOfPeople) parts.push(`Number of People: ${f.numberOfPeople}`)
    if (f.eventDate) parts.push(`Event Date: ${f.eventDate}`)
    if (f.budget) parts.push(`Budget: ₹${f.budget}`)
    if (f.message) parts.push(`Additional Message:\n${f.message}`)
    return parts.join('\n\n') || 'No additional details.'
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); toast.error('Please fill required fields.'); return }
    setLoading(true)
    try {
      await submitEnquiry({
        name: form.name, email: form.email, phone: form.phone,
        subject: form.enquiryType, message: buildMsg(form),
      })
      setSuccess(true); setForm(init); setErrors({})
    } catch { toast.error('Something went wrong. Please try again or call us directly.') }
    finally { setLoading(false) }
  }

  const fc = field => `w-full bg-white/[0.03] border ${errors[field]?'border-red-500/50 focus:border-red-400':'border-white/10 focus:border-gold-500/50'} rounded-xl px-4 py-3.5 text-white font-body text-sm placeholder-white/20 focus:outline-none transition-all duration-300`
  const showEvent = ['Event','Bulk Order','Franchise'].includes(form.enquiryType)
  const showItems = ['Bulk Order','Event','General'].includes(form.enquiryType)

  return (
    <PageWrapper>
      <section className="relative pt-36 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/cafe-interior.jpg" alt="Contact Bubble Bliss Café Indore" className="w-full h-full object-cover" style={{opacity:0.07}} />
          <div className="absolute inset-0 bg-[#080808]/93" />
        </div>
        <FloatingOrbs />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.9}}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-gold-500/40" />
              <span className="text-gold-500 font-body text-[10px] tracking-[0.5em] uppercase">Get In Touch</span>
              <div className="h-px w-10 bg-gold-500/40" />
            </div>
            <h1 className="section-title text-4xl sm:text-6xl text-white mb-4">Contact <span className="gold-shimmer">Us</span></h1>
            <p className="text-white/40 font-body max-w-lg mx-auto text-sm leading-relaxed">
              Bubble Bliss Café, Vijay Nagar, Indore — For reservations, franchise, bulk orders, events or just say hello!
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Info */}
          <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="lg:col-span-2 flex flex-col gap-4">
            <div>
              <h2 className="section-title text-2xl sm:text-3xl text-white mb-2">Let's Connect</h2>
              <p className="text-white/30 font-body text-sm leading-relaxed">Franchise, bulk orders, events or just to share your love for bubble tea!</p>
            </div>
            {[
              [MapPin, 'Location', CAFE_INFO.fullAddress, CAFE_INFO.mapUrl],
              [Phone, 'Phone', CAFE_INFO.phone, `tel:${CAFE_INFO.phone.replace(/\s/g,'')}`],
              [MessageCircle, 'WhatsApp', CAFE_INFO.phone, `https://wa.me/${CAFE_INFO.whatsapp}`],
              [Mail, 'Email', CAFE_INFO.email, `mailto:${CAFE_INFO.email}`],
              [Clock, 'Hours', CAFE_INFO.hours, null],
            ].map(([Icon, label, text, href], i) => (
              <motion.div key={label} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.08}}
                whileHover={{x:4}} className="glass-card rounded-2xl p-4 flex items-start gap-3 hover:border-gold-500/25 transition-all duration-300 group">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                  style={{background:'rgba(212,175,55,0.08)',border:'1px solid rgba(212,175,55,0.15)'}}>
                  <Icon size={15} className="text-gold-500" />
                </div>
                <div className="min-w-0">
                  <p className="font-body text-[9px] tracking-widest uppercase mb-0.5 text-gold-500/50">{label}</p>
                  {href
                    ? <a href={href} target={href.startsWith('http')?'_blank':'_self'} rel="noopener noreferrer" className="text-white/60 hover:text-gold-400 font-body text-sm transition-colors break-all">{text}</a>
                    : <p className="text-white/60 font-body text-sm break-words">{text}</p>}
                </div>
              </motion.div>
            ))}
            <div className="glass-card rounded-2xl p-5 border border-gold-500/15">
              <p className="text-gold-500 font-body text-[9px] tracking-widest uppercase mb-1">Franchise</p>
              <p className="text-white font-serif text-base mb-1">Bring Bubble Bliss to Your City</p>
              <p className="text-white/30 font-body text-xs">Select "Franchise Opportunity" below for complete franchise kit.</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.9}} className="lg:col-span-3">
            <div className="glass-card rounded-3xl p-6 sm:p-10 relative overflow-hidden" style={{boxShadow:'0 40px 120px rgba(0,0,0,0.6)'}}>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div key="success" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="text-center py-10">
                    <motion.div animate={{scale:[1,1.15,1]}} transition={{duration:0.5}}
                      className="w-20 h-20 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle size={34} className="text-gold-500" />
                    </motion.div>
                    <h3 className="font-serif text-2xl text-white mb-3">Enquiry Sent! 🎉</h3>
                    <p className="text-white/40 font-body text-sm mb-2">We'll contact you within <strong className="text-gold-500">24 hours</strong>.</p>
                    <p className="text-white/25 font-body text-xs mb-2">A confirmation email has been sent to you.</p>
                    <p className="text-white/25 font-body text-xs mb-8">Or call us: <a href={`tel:${CAFE_INFO.phone.replace(/\s/g,'')}`} className="text-gold-500 hover:underline">{CAFE_INFO.phone}</a></p>
                    <button onClick={() => setSuccess(false)} className="btn-outline px-8 py-3 text-xs rounded-full">Send Another Enquiry</button>
                  </motion.div>
                ) : (
                  <motion.div key="form">
                    <h3 className="font-serif text-xl sm:text-2xl text-white mb-6">Send Enquiry</h3>
                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-body text-[10px] tracking-widest uppercase text-white/30 mb-2">Full Name *</label>
                          <input type="text" name="name" value={form.name} onChange={onChange} placeholder="Your name" className={fc('name')} />
                          {errors.name && <p className="text-red-400/80 text-xs mt-1 font-body">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="block font-body text-[10px] tracking-widest uppercase text-white/30 mb-2">Phone *</label>
                          <input type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="+91 93404 53142" className={fc('phone')} />
                          {errors.phone && <p className="text-red-400/80 text-xs mt-1 font-body">{errors.phone}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="block font-body text-[10px] tracking-widest uppercase text-white/30 mb-2">Email *</label>
                        <input type="email" name="email" value={form.email} onChange={onChange} placeholder="your@email.com" className={fc('email')} />
                        {errors.email && <p className="text-red-400/80 text-xs mt-1 font-body">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block font-body text-[10px] tracking-widest uppercase text-white/30 mb-2">Enquiry Type *</label>
                        <select name="enquiryType" value={form.enquiryType} onChange={onChange} className={`${fc('enquiryType')} cursor-pointer`} style={{background:'#0d0d0d'}}>
                          {ENQUIRY_TYPES.map(o => <option key={o.value} value={o.value} disabled={!o.value} style={{background:'#111'}}>{o.label}</option>)}
                        </select>
                        {errors.enquiryType && <p className="text-red-400/80 text-xs mt-1 font-body">{errors.enquiryType}</p>}
                      </div>

                      {/* Item Selector */}
                      <AnimatePresence>
                        {showItems && (
                          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} className="overflow-hidden">
                            <label className="block font-body text-[10px] tracking-widest uppercase text-white/30 mb-2">
                              Menu Items <span className="text-white/15 normal-case tracking-normal">(optional)</span>
                            </label>
                            <div className="bg-white/[0.02] rounded-2xl border border-white/5 max-h-56 overflow-y-auto p-3">
                              {MENU_CATS.map(cat => {
                                const catItems = menuItems.filter(m => m.category === cat)
                                return (
                                  <div key={cat}>
                                    <button type="button" onClick={() => setExpandedCat(expandedCat===cat?null:cat)}
                                      className="w-full flex items-center justify-between py-2.5 border-b border-white/5">
                                      <span className="font-body text-[10px] text-gold-500 tracking-widest uppercase">{cat} ({catItems.length})</span>
                                      {expandedCat===cat ? <Minus size={11} className="text-gold-500/50"/> : <Plus size={11} className="text-gold-500/50"/>}
                                    </button>
                                    <AnimatePresence>
                                      {expandedCat===cat && (
                                        <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} className="overflow-hidden">
                                          <div className="flex flex-wrap gap-1.5 py-2.5">
                                            {catItems.map(item => (
                                              <button key={item.id} type="button" onClick={() => toggleItem(item.name)}
                                                className={`font-body text-[9px] px-2.5 py-1.5 rounded-full border transition-all duration-200 ${
                                                  form.selectedItems.includes(item.name)
                                                    ? 'bg-gold-500 text-dark-900 border-gold-500 font-bold'
                                                    : 'border-white/10 text-white/40 hover:border-gold-500/40 hover:text-gold-400'
                                                }`}>
                                                {item.name} — ₹{item.price}
                                              </button>
                                            ))}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                )
                              })}
                              {form.selectedItems.length > 0 && (
                                <div className="pt-2 border-t border-white/5 mt-1">
                                  <p className="text-white/25 font-body text-[9px] mb-1.5">Selected ({form.selectedItems.length}):</p>
                                  <div className="flex flex-wrap gap-1">
                                    {form.selectedItems.map(item => (
                                      <span key={item} onClick={() => toggleItem(item)}
                                        className="font-body text-[9px] px-2 py-1 rounded-full bg-gold-500/12 text-gold-400 border border-gold-500/20 cursor-pointer hover:bg-red-500/10 hover:text-red-400 transition-all">
                                        {item} ✕
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-body text-[10px] tracking-widest uppercase text-white/30 mb-2">Quantity <span className="text-white/15 normal-case">(optional)</span></label>
                          <input type="text" name="quantity" value={form.quantity} onChange={onChange} placeholder="e.g. 50 cups" className={fc('quantity')} />
                        </div>
                        <AnimatePresence>
                          {showEvent && (
                            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                              <label className="block font-body text-[10px] tracking-widest uppercase text-white/30 mb-2">Event Date <span className="text-white/15 normal-case">(optional)</span></label>
                              <input type="date" name="eventDate" value={form.eventDate} onChange={onChange} className={fc('eventDate')} style={{colorScheme:'dark'}} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <AnimatePresence>
                        {showEvent && (
                          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} className="grid grid-cols-2 gap-4 overflow-hidden">
                            <div>
                              <label className="block font-body text-[10px] tracking-widest uppercase text-white/30 mb-2">No. of People <span className="text-white/15 normal-case">(opt)</span></label>
                              <input type="number" name="numberOfPeople" value={form.numberOfPeople} onChange={onChange} placeholder="e.g. 100" className={fc('numberOfPeople')} />
                            </div>
                            <div>
                              <label className="block font-body text-[10px] tracking-widest uppercase text-white/30 mb-2">Budget ₹ <span className="text-white/15 normal-case">(opt)</span></label>
                              <input type="text" name="budget" value={form.budget} onChange={onChange} placeholder="e.g. 10000" className={fc('budget')} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div>
                        <label className="block font-body text-[10px] tracking-widest uppercase text-white/30 mb-2">Message <span className="text-white/15 normal-case">(optional)</span></label>
                        <textarea name="message" value={form.message} onChange={onChange} rows={3} placeholder="Tell us anything else..." className={`${fc('message')} resize-none`} />
                      </div>

                      <motion.button type="submit" disabled={loading} whileHover={{scale:loading?1:1.01}} whileTap={{scale:0.98}}
                        className="btn-gold w-full py-4 rounded-xl text-xs flex items-center justify-center gap-2 disabled:opacity-50">
                        {loading
                          ? <><div className="w-4 h-4 border-2 border-dark-900/30 border-t-dark-900 rounded-full animate-spin"/>Sending...</>
                          : <><Send size={14}/>Send Enquiry to Bubble Bliss Café</>}
                      </motion.button>
                      <p className="text-white/15 font-body text-[10px] text-center">* Required fields only · All others optional · We respond within 24 hours</p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
