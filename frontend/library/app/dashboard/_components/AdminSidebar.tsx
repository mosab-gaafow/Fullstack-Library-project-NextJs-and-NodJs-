import Image from 'next/image'
import React from 'react'
import SidebarRoutes from './SidebarRoutes'
// import SidebarRoutes from './SidebarRoutes'

const AdminSidebar = () => {
  return (
    <div className='h-full border-r flex flex-col overflow-y-auto shadow-sm'>
        <div className='p-6'>
            <Image
            width={140}
            height={140}
            alt='logo'
            src='/logo.svg'
            />
        </div>
            <div className='flex flex-col w-full'>
                <SidebarRoutes/>
            </div>

      
    </div>
  )
}

export default AdminSidebar
