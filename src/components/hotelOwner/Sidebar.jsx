import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-1/5 min-h-screen border-r border-gray-300 bg-white'>
      <div className='flex flex-col pt-6 pl-[20%] gap-2'>
        
        {/* Dashboard Link */}
        <NavLink 
          to='/dashboard' 
          className={({ isActive }) => 
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l transition-colors ${isActive ? 'bg-[#F2F3FF] border-primary border-r-4 border-r-primary' : ''}`
          }
        >
          <img className='w-5' src={assets.add_icon} alt="dashboard" />
          <p className='hidden md:block'>Dashboard</p>
        </NavLink>

        {/* Add Room Link */}
        <NavLink 
          to='/add-room' 
          className={({ isActive }) => 
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l transition-colors ${isActive ? 'bg-[#F2F3FF] border-primary border-r-4 border-r-primary' : ''}`
          }
        >
          <img className='w-5' src={assets.add_icon} alt="add room" />
          <p className='hidden md:block'>Add Room</p>
        </NavLink>

        {/* List Rooms Link */}
        <NavLink 
          to='/list-room' 
          className={({ isActive }) => 
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l transition-colors ${isActive ? 'bg-[#F2F3FF] border-primary border-r-4 border-r-primary' : ''}`
          }
        >
          <img className='w-5' src={assets.order_icon} alt="list room" />
          <p className='hidden md:block'>List Rooms</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar