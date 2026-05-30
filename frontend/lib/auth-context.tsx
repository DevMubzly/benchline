'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { GitHubUser } from '@/lib/types'

interface AuthContextValue {
  user: GitHubUser | null
  loading: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<GitHubUser | null>(() => {
    if (typeof window === 'undefined') return null
    try {
      const stored = localStorage.getItem('benchline_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const [loading] = useState(false)

  const login = useCallback(() => {
    window.location.href = '/api/auth/github'
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('benchline_user')
    localStorage.removeItem('github_access_token')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
