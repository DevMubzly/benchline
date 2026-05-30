'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Github } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export default function LoginPage() {
  const { user, loading, login } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) router.push('/')
  }, [user, loading, router])

  if (loading) return null

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-sm border border-black p-8'>
        <div className='text-center mb-6'>
          <h1 className='text-2xl font-bold mb-1'>BENCHLINE</h1>
          <p className='text-gray-500 text-sm'>Sign in to your distribution OS</p>
        </div>
        <button
          onClick={login}
          className='w-full flex items-center justify-center gap-3 bg-black text-white py-3 text-sm hover:bg-gray-800 transition-colors'
        >
          <Github size={18} />
          Sign in with GitHub
        </button>
        <p className='text-xs text-gray-400 text-center mt-4'>
          Your code is never stored on our servers.
          <br />
          Only your public GitHub profile is accessed.
        </p>
      </div>
    </div>
  )
}
