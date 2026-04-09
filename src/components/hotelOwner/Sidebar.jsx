import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Sidebar = () => {
  return (
    <div className='w-64 min-h-screen bg-white border-r border-gray-200'>
      <div className='flex flex-col pt-6 pl-6 gap-2'>
        
        <NavLink 
          to='/owner/dashboard' 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50'}`
          }
        >
          <img className='w-5 h-5' src={assets.dashboardIcon} alt="dashboard" />
          <p className='font-medium'>Dashboard</p>
        </NavLink>

        <NavLink 
          to='/owner/add-room' 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50'}`
          }
        >
          <img className='w-5 h-5' src={assets.addIcon} alt="add room" />
          <p className='font-medium'>Add Room</p>
        </NavLink>

        <NavLink 
          to='/owner/list-rooms' 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50'}`
          }
        >
          <img className='w-5 h-5' src={assets.listIcon} alt="list rooms" />
          <p className='font-medium'>List Rooms</p>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;
