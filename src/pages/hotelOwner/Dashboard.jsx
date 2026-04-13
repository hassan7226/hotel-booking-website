import React, { useState } from 'react';
import { assets,dashboardDummyData } from '../../assets/assets';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(dashboardDummyData);
  return (
    <div className='min-h-screen bg-gray-50 p-6 md:p-8'>
      
      {/* Header Section */}
      <div className='mb-8'>
        <h1 className='text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-3'>
          Dashboard
        </h1>
        <p className='text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed'>
          Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated
          with real-time insights to ensure smooth operations.
        </p>
      </div>

      {/* Stat Cards */}
      <div className='flex flex-wrap gap-4 mb-8'>
        
        {/* Total Bookings Card */}
        <div className='min-w-96 bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center'>
              <img src={assets.totalBookingIcon} alt="bookings" className='w-6 h-6' />
            </div>
            <div>
              <p className='text-blue-500 text-lg font-medium'>Total Bookings</p>
              <p className='text-2xl font-bold text-gray-500 mt-1'>{dashboardData.totalBookings}</p>
            </div>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className='min-w-96 bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center'>
              <img src={assets.totalRevenueIcon} alt="revenue" className='w-6 h-6' />
            </div>
            <div>
              <p className='text-blue-500 text-lg font-medium'>Total Revenue</p>
              <p className='text-2xl font-bold text-gray-500 mt-1'>${dashboardData.totalRevenue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings Section */}
      <div className='bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden'>
        
        {/* Table Header */}
        <div className='p-6 border-b border-gray-200'>
          <h2 className='text-xl font-playfair font-bold text-gray-900'>Recent Bookings</h2>
        </div>

        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>User Name</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Room Name</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Total Amount</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Payment Status</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              { dashboardData.bookings.map((item,index) => (
                <tr key={index} className='hover:bg-gray-50 transition-colors'>
                  <td className='px-6 py-4 text-sm text-gray-900 font-medium'>
                    {item.user.username}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    {item.room.roomType}
                  </td>
                  <td className='px-6 py-4 text-sm font-semibold text-gray-900'>
                    ${item.totalPrice}
                  </td>
                  <td className='px-6 py-4 text-sm'>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.isPaid 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {(!dashboardData.bookings || dashboardData.bookings.length === 0) && (
          <div className='text-center py-12'>
            <p className='text-gray-500'>No bookings yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
