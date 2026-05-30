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
      className='flex items-center justify-center w-7 h-7 cursor-pointer hover:bg-accent transition-colors'
      aria-label='Toggle theme'
    >
      {hydrated ? (theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />) : <div className='w-3.5 h-3.5' />}
    </button>
  )
}
