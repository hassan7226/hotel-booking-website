import React, { useState } from 'react';
import { roomsDummyData, assets } from '../../assets/assets';

const ListRooms = () => {
  const [rooms] = useState(roomsDummyData);
  
  // Calculate unique hotels
  const uniqueHotels = new Set(rooms.map(room => room.hotel._id)).size;

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-8'>
      
      {/* Header Section */}
      <div className='mb-8'>
        <h1 className='text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-3'>
          Room Listings
        </h1>
        <p className='text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed'>
          View and manage all your hotel rooms. Update pricing, check availability, and control room settings from one place.
        </p>
      </div>

      {/* Total Hotels Section */}
      <div className='mb-8'>
        <div className='inline-block bg-blue-50 border border-blue-200 rounded-lg px-6 py-3'>
          <p className='text-sm md:text-base font-medium text-blue-900'>
            Total Hotels: <span className='font-bold text-lg ml-2'>{uniqueHotels}</span>
          </p>
        </div>
      </div>

      {/* Room Listings Table */}
      <div className='bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>
                  Name
                </th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>
                  Facility
                </th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>
                  Price / night
                </th>
                <th className='px-6 py-4 text-center text-sm font-semibold text-gray-900'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {rooms.map((room) => (
                <tr key={room._id} className='hover:bg-gray-50 transition'>
                  {/* Room Name */}
                  <td className='px-6 py-4 text-sm font-medium text-gray-900'>
                    {room.roomType}
                  </td>
                  
                  {/* Facility Type */}
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    <div className='flex flex-wrap gap-2'>
                      {room.amenities.slice(0, 2).map((amenity, idx) => (
                        <span key={idx} className='px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium'>
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 2 && (
                        <span className='px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium'>
                          +{room.amenities.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  
                  {/* Price Per Night */}
                  <td className='px-6 py-4 text-sm font-semibold text-gray-900'>
                    ${room.pricePerNight}
                  </td>
                  
                  {/* Actions */}
                  <td className='px-6 py-4 text-center'>
                    <div className='flex justify-center gap-2'>
                      {/* Edit Button */}
                      <button className='group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:shadow-md transition duration-200 border border-transparent hover:border-blue-200'>
                        <img 
                          src={assets.arrowIcon} 
                          alt='edit' 
                          className='w-4 h-4 opacity-70 group-hover:opacity-100 transition'
                        />
                        <span className='group-hover:translate-x-0.5 transition'>Edit</span>
                      </button>
                      
                      {/* Delete Button */}
                      <button className='group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 hover:shadow-md transition duration-200 border border-transparent hover:border-red-200'>
                        <img 
                          src={assets.closeIcon} 
                          alt='delete' 
                          className='w-4 h-4 opacity-70 group-hover:opacity-100 transition'
                        />
                        <span className='group-hover:translate-x-0.5 transition'>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListRooms;
