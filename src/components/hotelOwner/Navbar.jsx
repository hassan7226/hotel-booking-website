import React from 'react';
import { assets } from '../../assets/assets';
import { UserButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <nav className='flex items-center justify-between px-4 sm:px-8 md:px-16  py-4 bg-white border-b border-gray-300  top-0 z-50 shadow-sm'>
      
      {/* Left - Logo */}
      <img 
        onClick={() => navigate('/')} 
        className='h-12 w-auto cursor-pointer hover:opacity-75 transition-opacity duration-200 bg-black' 
        src={assets.logo} 
        alt="Hotel Logo" 
      />

      {/* Right - User Account */}
      <div className='flex items-center gap-6'>
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
