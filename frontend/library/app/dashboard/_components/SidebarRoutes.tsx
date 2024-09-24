"use client"

import {  BookIcon, CarrotIcon,  CreditCard,  IdCardIcon,  ShoppingCartIcon, UserCircle, UserIcon } from 'lucide-react'
import React from 'react'
import SidebarItem from './SidebarItem'

const routes = [
    {
        id: 1,
        icon: BookIcon,
        label: 'Books',
        href: '/dashboard/admin/books'
    },

    {
        id: 2,
        icon: IdCardIcon,
        label: 'BookLoan',
        href: '/dashboard/admin/loans'
    },
    {
        id: 3,
        icon: UserCircle,
        label: 'Members',
        href: '/dashboard/admin/users'
    },
   
]


const SidebarRoutes = () => {
    return (
        <div className='flex flex-col w-full '>
          {
            routes.map((route, index) => (
                <SidebarItem
                 key={route.id}
                 id={route.id}
                icon={route.icon}
                href = {route.href}
                label = {route.label}
    
                />
            ))
          }
        </div>
      )
}

export default SidebarRoutes
