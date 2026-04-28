import axios from 'axios'
import toast from 'react-hot-toast'

// ─────────────────────────────────────────────────────────────────────────────
// BASE URL: reads from .env.local → VITE_API_URL
// For local dev:    VITE_API_URL=http://localhost:8080
// For production:   VITE_API_URL=https://your-app.railway.app
// ─────────────────────────────────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

// ── Request interceptor: attach JWT if present ────────────────────────────
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('bb_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// ── Response interceptor: handle 401 globally ────────────────────────────
API.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status

    if (status === 401) {
      // Auto-logout on expired/invalid token
      localStorage.removeItem('bb_token')
      localStorage.removeItem('bb_admin')
      if (
        window.location.pathname.startsWith('/admin') &&
        window.location.pathname !== '/admin/login'
      ) {
        toast.error('Session expired. Please login again.')
        window.location.href = '/admin/login'
      }
    } else if (status === 403) {
      toast.error('Access denied.')
    } else if (status === 500) {
      toast.error('Server error. Please try again later.')
    } else if (!err.response) {
      // Network error / backend down
      toast.error('Cannot connect to server. Check your connection.')
    }

    return Promise.reject(err)
  }
)

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC ENDPOINTS
// ─────────────────────────────────────────────────────────────────────────────

/** Submit a customer enquiry */
export const submitEnquiry = (data) => API.post('/api/enquiry', data)

/** Get all available menu items (public) */
export const getPublicMenu = () => API.get('/api/menu')

// ─────────────────────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────────────────────

/** Admin login */
export const loginAdmin = (data) => API.post('/api/auth/login', data)

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN — ENQUIRIES
// ─────────────────────────────────────────────────────────────────────────────

export const getEnquiries = (page = 0, size = 10) =>
  API.get(`/api/enquiry?page=${page}&size=${size}`)

export const getEnquiriesByStatus = (status, page = 0) =>
  API.get(`/api/enquiry/status/${status}?page=${page}`)

export const updateEnquiryStatus = (id, status) =>
  API.patch(`/api/enquiry/${id}/status`, { status })

export const deleteEnquiry = (id) =>
  API.delete(`/api/enquiry/${id}`)

export const getDashboardStats = () =>
  API.get('/api/enquiry/stats')

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN — MENU MANAGEMENT
// ─────────────────────────────────────────────────────────────────────────────

export const getAllMenuAdmin = () =>
  API.get('/api/menu/all')

export const createMenuItem = (data) =>
  API.post('/api/menu', data)

export const updateMenuItem = (id, data) =>
  API.put(`/api/menu/${id}`, data)

export const toggleMenuItem = (id) =>
  API.patch(`/api/menu/${id}/toggle`)

export const deleteMenuItem = (id) =>
  API.delete(`/api/menu/${id}`)

export default API
