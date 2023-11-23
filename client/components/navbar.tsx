import React from 'react'
import MobileSidebar from './mobile-sidebar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const NavBar = async () => {

    return (
    <div className='flex items-center p-4'>
      <MobileSidebar />
    </div>
  )
}

export default NavBar