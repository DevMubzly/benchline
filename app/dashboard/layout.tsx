import NavigationBar from '@/components/dashboard/NavigationBar'
import React from 'react'

const DashLayout = ({children} : Readonly<{children: React.ReactNode}>) => {
  return (
    <div className='px-8'>
      <NavigationBar />
      {children}    
    </div>
  )
}

export default DashLayout
