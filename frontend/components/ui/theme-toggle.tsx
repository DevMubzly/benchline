'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useSyncExternalStore } from 'react'

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const hydrated = useHydrated()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='cursor-pointer hover:bg-accent transition-colors p-1'
      aria-label='Toggle theme'
    >
      {hydrated ? (theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />) : <div className='w-4 h-4' />}
    </button>
  )
}
