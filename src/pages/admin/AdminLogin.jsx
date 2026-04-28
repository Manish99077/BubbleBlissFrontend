import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, User, Eye, EyeOff, LogIn } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const [form, setForm] = useState({ username:'', password:'' })
  const [showPass, setShowPass] = useState(false)
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.username || !form.password) { toast.error('Please fill all fields'); return }
    const result = await login(form.username, form.password)
    if (result.success) { toast.success('Welcome back! 👋'); navigate('/admin/dashboard') }
    else toast.error(result.message || 'Invalid credentials')
  }

  const inp = 'w-full bg-white/[0.03] border border-white/10 focus:border-gold-500/50 rounded-xl py-3.5 text-white font-body text-sm placeholder-white/20 focus:outline-none transition-all duration-300'

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="/cafe-interior.jpg" alt="" className="w-full h-full object-cover opacity-8" style={{opacity:0.08}} />
        <div className="absolute inset-0 bg-[#080808]/92" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{background:'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',filter:'blur(40px)'}} />

      <motion.div initial={{opacity:0,y:40,scale:0.95}} animate={{opacity:1,y:0,scale:1}} transition={{duration:0.8,ease:[0.23,1,0.32,1]}}
        className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold-500/40 mx-auto mb-4"
            style={{boxShadow:'0 0 40px rgba(212,175,55,0.2)'}}>
            <img src="/logo.jpg" alt="Bubble Bliss Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-white mb-1">Admin Panel</h1>
          <p className="text-gold-500/50 font-body text-xs tracking-[0.4em] uppercase">Bubble Bliss Café · Indore</p>
        </div>

        <div className="glass-card rounded-3xl p-8 border border-gold-500/15" style={{boxShadow:'0 40px 100px rgba(0,0,0,0.7)'}}>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent rounded-t-3xl" />
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-body text-[10px] tracking-widest uppercase text-white/30 mb-2">Username</label>
              <div className="relative">
                <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/50" />
                <input type="text" value={form.username} onChange={e=>setForm(p=>({...p,username:e.target.value}))}
                  placeholder="admin" className={`${inp} pl-11`} />
              </div>
            </div>
            <div>
              <label className="block font-body text-[10px] tracking-widest uppercase text-white/30 mb-2">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/50" />
                <input type={showPass?'text':'password'} value={form.password} onChange={e=>setForm(p=>({...p,password:e.target.value}))}
                  placeholder="••••••••" className={`${inp} pl-11 pr-12`} />
                <button type="button" onClick={()=>setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-gold-500 transition-colors">
                  {showPass ? <EyeOff size={14}/> : <Eye size={14}/>}
                </button>
              </div>
            </div>
            <motion.button type="submit" disabled={loading} whileHover={{scale:loading?1:1.02}} whileTap={{scale:0.98}}
              className="btn-gold w-full py-4 rounded-xl text-xs flex items-center justify-center gap-2 disabled:opacity-50 mt-2">
              {loading
                ? <><div className="w-4 h-4 border-2 border-dark-900/30 border-t-dark-900 rounded-full animate-spin"/>Signing in...</>
                : <><LogIn size={15}/>Sign In to Admin Panel</>}
            </motion.button>
          </form>
          <div className="mt-5 p-3 bg-white/[0.02] rounded-xl border border-white/5 text-center">
            <p className="text-white/20 font-body text-xs">Default: <span className="text-gold-500/40">admin</span> / <span className="text-gold-500/40">BubbleBliss@Admin2025</span></p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
