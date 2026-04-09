import React from 'react'
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import Navbar from '../../components/hotelOwner/Navbar';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/hotelOwner/Sidebar';

const Layout = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <div className="">
        <Sidebar />
        <div>
            <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
