import { create } from 'zustand'
import type { AuthUser } from '@/domain/models/auth'
import type { Role } from '@/domain/enums/roles'

interface AuthState {
  token: string | null
  user: AuthUser | null
  isAuthenticated: boolean
  setAuth: (token: string, user: AuthUser) => void
  setUser: (user: AuthUser) => void
  logout: () => void
  hasRole: (roles: Role[]) => boolean
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: localStorage.getItem('access_token'),
  user: null,
  isAuthenticated: !!localStorage.getItem('access_token'),

  setAuth: (token, user) => {
    localStorage.setItem('access_token', token)
    set({ token, user, isAuthenticated: true })
  },

  setUser: (user) => {
    set({ user })
  },

  logout: () => {
    localStorage.removeItem('access_token')
    set({ token: null, user: null, isAuthenticated: false })
  },

  hasRole: (roles) => {
    const { user } = get()
    if (!user) return false
    return roles.includes(user.role)
  },
}))
