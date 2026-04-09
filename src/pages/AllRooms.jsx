import React from "react";
import assets, { roomsDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import StarIconRating from "../components/StarIconRating";
import { facilityIcons } from "../assets/assets";
import { useState } from "react";

const CheckBox = ({ label, selected = false, onchange = () => {} }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onchange(e.target.checked, label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const RadioButton = ({ label, selected = false, onchange = () => {} }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onchange(label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false);

  const roomTypes = [
    "Single Room",
    "Double Room",    
    "Luxury Room",
    "Presidential Suite",
  ];

  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];  

  const sortOptions = [ 
    "Price: Low to High",
    "Price: High to Low",
    "Rating: High to Low",
    "Newest First",
  ];

  return (
    <div
      className="flex flex-col-reverse lg:flex-row items-start
    justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24
    xl:px-32"
    >
      <div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-playfair">Hotel Rooms</h1>
          <p className="text-gray-600 mt-2">
            Explore our luxurious room options to enhance your stay and create
            unforgettable memories.
          </p>
        </div>
        {roomsDummyData.map((room) => (
          <div
            key={room._id}
            className="flex flex-col md:flex-row items-start py-10 border-b border-gray-300 gap-6 mt-8
        last:border-none last:pb-30"
          >
            <img
              src={room.images[0]}
              onClick={() => {
                navigate(`/rooms/${room._id}`);
                window.scrollTo(0, 0);
              }}
              alt="hotel-image"
              title="view hotel-image"
              className="max-h-65 md:w-1/2 rounded-xl shadow-lg 
           object-cover cursor-pointer"
            />

            <div className="flex flex-col gap-2">
              <p className="text-gray-500">{room.hotel.city}</p>
              <p
                className="text-gray-800 font-playfair text-3xl"
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  window.scrollTo(0, 0);
                }}
              >
                {room.hotel.name}
              </p>

              <div className="flex items-center">
                <StarIconRating />
                <p className="ml-2">200+ reviews</p>
              </div>

              <div className="flex items-center gap-1 text-sm mt-2">
                <img src={assets.locationIcon} alt="" className="w-5 h-5" />
                <p className="text-gray-600">{room.hotel.address}</p>
              </div>

              {/* Room Amenities */}
              <div className="flex flex-wrap gap-4 mt-4">
                {room.amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg"
                  >
                    <img
                      src={facilityIcons[item]}
                      alt={item}
                      className="w-5 h-5"
                    />
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>

              {/* Room Price */}
              <p className="text-xl font-medium text-gray-700 mt-2">
                {room.pricePerNight}/Night
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 m-lg:mt-16">
       
        <div className={`flex items-center justify-between p-4 border-gray-300 ${openFilters && "border-b"}`}>
          <p className="text-xl font-medium text-gray-800">Filters</p>
          <div className="text-xs cursor-pointer">
            <span
              onClick={() => setOpenFilters(!openFilters)}
              className="lg:hidden"
            >
              {openFilters ? "HIDE" : "SHOW"}
            </span>
            <span className="hidden lg:block">CLEAR</span>
          </div>
        </div>

        <div className={` ${openFilters ? "h-auto" : "h-0"} lg:h-auto 
        overflow-hidden transition-all duration-700`}>
       <div className="px-5 pt-5">
        <p className="font-medium text-gray-800 pb-2">Popular Filters</p>
        {roomTypes.map((room, index) => 
            (
                <CheckBox key={index} label={room} />
            ))}
       </div>

         <div className="px-5 pt-5">
        <p className="font-medium text-gray-800 pb-2">Price Range</p>
        {priceRanges.map((range, index) => 
            (
                <CheckBox key={index} label={`$ ${range}`} />
            ))}
       </div> 

         <div className="px-5 pt-5 pb-7">
        <p className="font-medium text-gray-800 pb-2">Sort By</p>
        {sortOptions.map((option, index) => 
            (
                <RadioButton key={index} label={option} />))}
       </div> 
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
