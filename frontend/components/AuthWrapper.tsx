'use client'

import { usePathname } from 'next/navigation'
import { AuthProvider, useAuth } from '@/lib/auth-context'
import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'

function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    if (!user && pathname !== '/login') {
      router.push('/login')
    }
    if (user && pathname === '/login') {
      router.push('/')
    }
  }, [user, loading, pathname, router])

  if (loading) return null
  if (!user && pathname !== '/login') return null
  if (user && pathname === '/login') return null

  return <>{children}</>
}

export function AuthWrapper({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AuthGuard>{children}</AuthGuard>
    </AuthProvider>
  )
}
