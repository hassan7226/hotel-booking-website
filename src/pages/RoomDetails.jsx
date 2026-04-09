import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import assets, { roomsDummyData } from "../assets/assets";
import StarIconRating from "../components/StarIconRating";
import { facilityIcons } from "../assets/assets";
import { roomCommonData } from "../assets/assets";

const RoomDetails = () => {
  const { id } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const room = roomsDummyData.find((room) => room._id === id);
    if (room) {
      setRoomData(room);
      setMainImage(room.images[0]);
    }
  }, []);

  return (
    roomData && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        {/* Room Details */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-3xl md:text-5xl font-playfair font-medium">
            {roomData.hotel.name}{" "}
            <span className="font-inter text-sm">({roomData.roomType})</span>
          </h1>
          <p className="py-1.5 px-3 bg-orange-500 text-white rounded-full text-xs">
            20% OFF
          </p>
        </div>

        {/* Room Rating */}
        <div className="flex items-center gap-1 mt-2">
          <StarIconRating />
          <p className="ml-2">200+ Reviews</p>
        </div>

        {/* Room Address */}
        <div className="flex items-center gap-1 mt-2">
          <img src={assets.locationIcon} alt="" className="w-5 h-5" />
          <p className="text-gray-600">{roomData.hotel.address}</p>
        </div>

        {/* Room Images */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <img
            src={mainImage}
            alt="main-image"
            className="w-full md:w-1/2 rounded-lg object-cover"
          />
          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {roomData.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`room-image-${index}`}
                className={`w-full rounded-lg object-cover cursor-pointer shadow-lg ${image === mainImage ? "outline-3  border-orange-500" : ""}`}
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Room Facilities */}
        <div className="flex flex-col md:flex-row md:justify-between mt-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl font-playfair">
              Experience the Luxury of Our Rooms
            </h1>
            <div className="flex flex-wrap gap-4 mt-3 mb-6">
              {roomData.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg"
                >
                  <img
                    src={facilityIcons[amenity]}
                    alt={amenity}
                    className="w-5 h-5"
                  />
                  <p className="text-xs">{amenity}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Price */}
          <p className="text-3xl font-medium">{roomData.pricePerNight}/night</p>
        </div>

        {/* Checkin and Checkout form */}
        <form
          action=""
          className="flex flex-col md:flex-row items-start md:items-center bg-white
         p-6 rounded-lg shadow-lg mt-10 gap-6 w-full"
        >
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="">
              <label htmlFor="checkin" className="font-medium text-gray-700">
                Check-in Date
              </label>
              <input
                type="date"
                id="checkin"
                name="checkin"
                className="mt-1.5 px-3 py-2 w-full rounded-md border-gray-300 shadow-sm
             focus:border-indigo-500 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            <div className="">
              <label htmlFor="checkout" className="font-medium text-gray-700">
                Check-out Date
              </label>
              <input
                type="date"
                id="checkout"
                name="checkout"
                className="mt-1.5 px-3 py-2 w-full rounded-md border-gray-300 shadow-sm
             focus:border-indigo-500 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            <div className="flex flex-col ">
              <label htmlFor="guests" className="font-medium text-gray-700">
                Guests
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                min="1"
                max="10"
                className="mt-1.5 px-3 py-2 max-w-20  rounded-md border-gray-300 shadow-sm
             focus:border-indigo-500 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="items-start bg-blue-500 hover:bg-blue-800 hover:scale-95
           px-6 md:px-25 py-3 md:py-4 w-full md:w-md
           transition-all duration-200 text-white rounded-md shadow-sm hover:shadow-md"
          >
            Check Availability
          </button>
        </form>

        {/* Room Description */}
        <div className="mt-25 space-y-4">
          {roomCommonData.map((spec, index) => (
            <div key={index} className="flex items-start gap-2">
              <img src={spec.icon} alt={spec.title} className="w-8 h-8" />
              <div className="">
                <p className="text-base ">{spec.title}</p>
                <p className="text-gray-500">{spec.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Description */}
        <div className="max-w-4xl border-y border-gray-300 my-15 py-10 text-gray-500">
          <p>
            Guests will be allocated on the ground floor according to
            availability. You get a comfortable Two bedroom apartment has a true
            city feeling. The price quoted is for two guest, at the guest slot
            please mark the number of guests to get the exact price for groups.
            The Guests will be allocated ground floor according to availability.
            You get the comfortable two bedroom apartment that has a true city
            feeling.
          </p>
        </div>

        {/* hosted by */}
        <div className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-4">
          <img src={roomData.hotel.owner.image} alt={roomData.hotel.name} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <p className="text-lg md:text-xl">Hosted by {roomData.hotel.owner.name}</p>
            <div className="flex items-center mt-1">
              <StarIconRating />  
              <p className="ml-2">200+ Reviews</p>
            </div>
          </div>
        </div>
          <button className="px-6 py-2.5 mt-4 rounded text-white bg-indigo-600 
          transition-all cursor-pointer">Contact Us</button>
        </div>
      </div>
    )
  );
};

export default RoomDetails;
