'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, Search, Bell, LogOut } from "lucide-react"
import ThemeToggle from "@/components/ui/theme-toggle"
import { usePathname } from "next/navigation"
import { useAuth } from '@/lib/auth-context'
import NotificationDropdown from './NotificationDropdown'
import SearchModal from './SearchModal'

const NavItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Projects', href: '/dashboard/projects' },
    { label: 'Content', href: '/dashboard/content' },
    { label: 'Calendar', href: '/dashboard/calendar' },
]

const NavigationBar = () => {
  const pathname = usePathname()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, profile, logout } = useAuth()

  if (pathname.startsWith('/auth')) return null

  return (
    <div className='sticky top-0 z-50 bg-background flex items-center justify-between w-full py-6 px-8 border-b border-border box-border'>
        <div className='font-bold text-lg'>
          <a href='/dashboard'>BENCHLINE</a>
        </div>
        <div>
            <nav className='flex items-center justify-center gap-12'>
                {NavItems.map((item) => (
                    <a href={item.href} key={item.label} className={pathname === item.href ? 'font-bold' : ''}>
                        <span className='relative inline-block group'>
                            {item.label}
                            <span className='absolute bottom-0 left-0 h-0.5 bg-foreground w-0 group-hover:w-full transition-all duration-300 ease-out'></span>
                        </span>
                    </a>
                ))}
            </nav>
        </div>
        <div className='flex items-center'>
            <div className='flex items-center gap-4 mr-4'>
                <button className='hover:bg-accent cursor-pointer' onClick={() => window.location.href = '/dashboard/settings'}>
                    <Settings size={14} />
                </button>
                <button className='hover:bg-accent cursor-pointer' onClick={() => setShowSearch(true)}>
                    <Search size={14} />
                </button>
                <div className='relative'>
                    <button className='hover:bg-accent cursor-pointer' onClick={() => setShowNotifications(p => !p)}>
                        <Bell size={14} />
                    </button>
                    {showNotifications && <NotificationDropdown onClose={() => setShowNotifications(false)} />}
                </div>
                <ThemeToggle />
            </div>
            <div className='h-6 w-px bg-gray-300 dark:bg-gray-600 mr-4'></div>
            <div className='relative'>
                <button className='cursor-pointer' onClick={() => setShowUserMenu(p => !p)}>
                    <Avatar>
                        <AvatarImage src={profile?.avatar_url || user?.user_metadata?.avatar_url || 'https://github.com/shadcn.png'} />
                        <AvatarFallback>{(profile?.username || user?.user_metadata?.user_name || '?').charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </button>
                {showUserMenu && (
                    <div className='absolute top-full right-0 mt-2 w-56 border border-border bg-card shadow-lg z-50'>
                        <div className='px-4 py-3 border-b border-border'>
                            <p className='text-sm font-medium'>{profile?.full_name || user?.user_metadata?.full_name || user?.email}</p>
                            <p className='text-xs text-muted-foreground'>@{profile?.username || user?.user_metadata?.user_name}</p>
                        </div>
                        <button
                            onClick={() => { setShowUserMenu(false); window.location.href = '/dashboard/settings' }}
                            className='w-full text-left px-4 py-2 text-sm hover:bg-accent flex items-center gap-2'
                        >
                            <Settings size={14} />
                            Settings
                        </button>
                        <button
                            onClick={() => { setShowUserMenu(false); logout() }}
                            className='w-full text-left px-4 py-2 text-sm hover:bg-accent flex items-center gap-2 border-t border-border text-red-500'
                        >
                            <LogOut size={14} />
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        </div>
        {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
    </div>
  )
}

export default NavigationBar
