'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, Search, Bell } from "lucide-react"
import { usePathname } from "next/navigation"

const NavItems = [
    {
        label: 'Dashboard', 
        href: '/dashboard',
    }, 
    {
        label: 'Reports',
        href: '/dashboard/reports',
    }, 
    {
        label: 'Integrations',
        href: '/dashboard/integrations',
    },
    {
        label: 'Projects',
        href: '/dashboard/projects',
    },
    {
        label: 'Team',
        href: '/dashboard/team',
    },
    {
        label: 'Vault',
        href: '/dashboard/vault',
    }
]

const NavigationBar = () => {
  const pathname = usePathname()

  return (
    <div className='flex items-center justify-between w-full py-6 px-4 border-b border-b-black box-border mb-2'>
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
                <button className='hover:bg-gray-100 rounded-lg cursor-pointer'>
                    <Settings size={14} />
                </button>
                <button className='hover:bg-gray-100 rounded-lg cursor-pointer'>
                    <Search size={14} />
                </button>
                <button className='hover:bg-gray-100 rounded-lg cursor-pointer'>
                    <Bell size={14} />
                </button>
            </div>
            <div className='h-6 w-px bg-gray-300 mr-4'></div>
            <div className="cursor-pointer">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    </div>
  )
}

export default NavigationBar
