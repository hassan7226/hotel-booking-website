import React from "react";
import { useState, useEffect } from "react";
import Title from "../components/Title";
import { userBookingsDummyData } from "../assets/assets";
import assets from "../assets/assets";

const MyBookings = () => {
  const [bookings, setBookings] = useState(userBookingsDummyData);
  return (
    <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32 ">
      <Title
        title="My Bookings"
        subTitle="Easily manage your past, current, and upcoming hotel 
      reservations in one place. Plan your trips seamlessly with just a few clicks"
        align="left"
      />
      <div className="max-w-6xl mt-10 w-full text-gray-800">
        <div className="hidden md:grid grid-cols-[3fr_2fr_1fr] gap-4 font-bold border-b text-gray-800 border-gray-300 py-3">
          <div className="w-1/3">Hotels</div>
          <div className="w-1/3">Date & Time </div>
          <div className="w-1/3">Payment</div>
        </div>
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] gap-4
            border-b border-gray-300 py-6 first:border-t"
          >
            {/* Hotel Details */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <img
                className="min-md:w-44 rounded shadow object-cover"
                src={booking.room.images[0]}
                alt="hotel-img"
              />
              <div flex className="flex flex-col gap-2 max-md:mt-3 min-md:ml-4">
                <p className="font-playfair text-2xl">
                  {booking.hotel.name}
                  <span className="font-inter text-sm">
                    ({booking.room.roomType})
                  </span>
                </p>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <img
                    src={assets.locationIcon}
                    alt="location-icon"
                    className=""
                  />
                  <span className="">{booking.hotel.address}</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <img src={assets.guestsIcon} alt="guests-icon" className="" />
                  <span className="">Guests:{booking.guests}</span>
                </div>
                <p className="text-base">Total: ${booking.totalPrice}</p>
              </div>
            </div>

            {/* Date & Time */}
            <div className="flex flex-col items-center md:flex-row gap-8  ">
              <div className="">
                <p className="font-medium">
                  Check-in: </p>
                  <p className="font-normal">
                    {new Date(booking.checkInDate).toDateString()}
                  </p>
                
              </div>
              <div className="">
                <p className="font-medium">
                  Check-out: </p>
                  <p className="font-normal">
                    {new Date(booking.checkOutDate).toDateString()}
                  </p>
                
              </div>
            </div>

            {/* Payment Status */}
            <div className="flex flex-col items-center justify-center md:items-start gap-2 pt-3">
               <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${booking.isPaid ? "bg-green-500" : "bg-red-500"}`}></div>
                <p className="text-sm">{booking.isPaid ? "Paid" : "Unpaid"}</p>
               </div>
                {!booking.isPaid && 
                <button className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Pay Now</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
