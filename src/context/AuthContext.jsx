import { createContext, useContext, useState, useEffect } from 'react'
import { loginAdmin } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('bb_admin')
    return saved ? JSON.parse(saved) : null
  })
  const [loading, setLoading] = useState(false)

  const login = async (username, password) => {
    setLoading(true)
    try {
      const res = await loginAdmin({ username, password })
      const { token, username: uname, email } = res.data.data
      localStorage.setItem('bb_token', token)
      const adminData = { username: uname, email }
      localStorage.setItem('bb_admin', JSON.stringify(adminData))
      setAdmin(adminData)
      return { success: true }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('bb_token')
    localStorage.removeItem('bb_admin')
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
