import React from 'react';
import { assets } from '../../assets/assets';
import { UserButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <nav className='flex items-center justify-between px-4 sm:px-8 md:px-16 py-4 border-b border-gray-300 top-0 z-50 transition-all duration-300 shadow-md' style={{ backgroundColor: '#ffffff', color: '#000000' }}>
      
      {/* Left - Logo */}
      <img 
        onClick={() => navigate('/')} 
        className='h-12 w-auto cursor-pointer hover:opacity-75 transition-opacity duration-200' 
        src={assets.logo} 
        alt="Hotel Logo"
        style={{ filter: "brightness(0)" }}
      />

      {/* Right - User Account */}
      <div className='flex items-center gap-6' style={{ color: '#000000' }}>
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
