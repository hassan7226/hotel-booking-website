import React from 'react'
import { assets } from '../../assets/assets'
import { UserButton, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { user } = useUser()
  const navigate = useNavigate()

  return (
    <div className='flex items-center justify-between px-6 py-4 md:px-20 border-b border-gray-200 bg-white sticky top-0 z-50'>
      {/* Logo - Clicking it takes you back to the main site */}
      <img 
        onClick={() => navigate('/')} 
        className='w-32 cursor-pointer' 
        src={assets.logo} 
        alt="Logo" 
      />

      <div className='flex items-center gap-4'>
        {/* Owner Profile Info */}
        <div className='hidden md:flex flex-col text-right'>
          <p className='text-sm font-semibold text-gray-800'>
            {user?.fullName}
          </p>
          <p className='text-xs text-primary font-medium'>
            Hotel Owner
          </p>
        </div>

        {/* Clerk User Button for Account Management */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}

export default Navbar