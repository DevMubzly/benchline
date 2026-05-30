'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, Search, Bell } from "lucide-react"
import { usePathname } from "next/navigation"
import NotificationDropdown from './NotificationDropdown'
import SearchModal from './SearchModal'

const NavItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Content', href: '/content' },
    { label: 'Calendar', href: '/calendar' },
]

const NavigationBar = () => {
  const pathname = usePathname()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  return (
    <div className='sticky top-0 z-50 bg-background flex items-center justify-between w-full py-6 px-8 border-b border-b-black box-border'>
        <div className='font-bold text-lg'>BENCHLINE</div>
        <div>
            <nav className='flex items-center justify-center gap-12'>
                {NavItems.map((item) => (
                    <a href={item.href} key={item.label} className={pathname === item.href ? 'font-bold' : ''}>
                        <span className='relative inline-block group'>
                            {item.label}
                            <span className='absolute bottom-0 left-0 h-0.5 bg-black w-0 group-hover:w-full transition-all duration-300 ease-out'></span>
                        </span>
                    </a>
                ))}
            </nav>
        </div>
        <div className='flex items-center'>
            <div className='flex items-center gap-4 mr-4'>
                <button className='hover:bg-gray-100 cursor-pointer' onClick={() => window.location.href = '/settings'}>
                    <Settings size={14} />
                </button>
                <button className='hover:bg-gray-100 cursor-pointer' onClick={() => setShowSearch(true)}>
                    <Search size={14} />
                </button>
                <div className='relative'>
                    <button className='hover:bg-gray-100 cursor-pointer' onClick={() => setShowNotifications(p => !p)}>
                        <Bell size={14} />
                    </button>
                    {showNotifications && <NotificationDropdown onClose={() => setShowNotifications(false)} />}
                </div>
            </div>
            <div className='h-6 w-px bg-gray-300 mr-4'></div>
            <div className="cursor-pointer">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
        {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
    </div>
  )
}

export default NavigationBar
