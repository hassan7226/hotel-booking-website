import React from "react";
import assets, { cities } from "../assets/assets";

const HotelRegistration = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 flex items-center justify-center z-100">
      <form action="" className="flex bg-white rounded-xl overflow-hidden max-md:mx-2 max-w-4xl">
        <img
          src={assets.regImage}
          alt="Registration"
          className="w-1/2 rounded-xl hidden md:block"
        />
        <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
          <img
            src={assets.closeIcon}
            alt=""
            className="absolute top-4 right-4 w-6 h-6 cursor-pointer"
          />
          <p className="text-2xl font-bold mt-6">Register Your Hotel</p>

           {/* Registration Form */}
         <div className="w-full mt-6">
            <label htmlFor="name" className="font-medium text-gray-500">Hotel Name</label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

             <label htmlFor="phone" className="font-medium text-gray-500">Phone</label>
            <input
              type="text"
              id="phone"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />  

            {/* Address */}
            <label htmlFor="address" className="font-medium text-gray-500">Address</label>
            <input
              type="text"
              id="address"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"             
              required
            />
            {/* Select City Dropdown menuu */}
            <label htmlFor="city" className="font-medium text-gray-500">City</label>
            <select
              id="city" 
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"             
             required
           >               
              <option value="Select City">Select City</option>
              {
                cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))      
              }
            
            </select>

            <label htmlFor="email" className="font-medium text-gray-500">Email</label>
            <input
              type="email"             
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"             
            />  
            <label htmlFor="password" className="font-medium text-gray-500">Password</label>
            <input
              type="password"             
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"             
            />  
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4 w-full">Register</button>        
         </div>
        </div>

      </form>
    </div>
  );
};

export default HotelRegistration;
