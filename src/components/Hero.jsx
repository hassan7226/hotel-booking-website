import React from "react";
import assets, { cities } from "../assets/assets";

const Hero = () => {
  return (
    <div
      className='flex flex-col items-start justify-center  w-full min-h-screen px-6 sm:px-12 md:px-16 lg:px-24
    xl:px-32 bg-[url("/src/assets/heroImage.png")] text-white bg-cover bg-center bg-no-repeat'
    >
      <p className="bg-[#49B9FF80]/50 px-4 py-2 rounded-full mt-30 ">The Ultimate Hotel Experience</p>

      <h1 className=" font-playfair min-h-1/2 text-2xl md:text-5xl font-bold md:font-extrabold md:leading-14 max-w-155 mt-4">Discover Your Perfect Gateway Destination</h1>
      <p className="max-w-lg mt-4 ">
        Unparalleled luxury and comfort await at the world's most exclusive
        hotels and resorts. Start your journey today.
      </p>

      {/* Search Booking Form */}

       <form className='bg-white text-gray-500 rounded-lg px-6 py-4  flex flex-col md:flex-row max-md:items-start gap-4 mt-8 max-md:mx-auto'>

        <div>
            <div className="flex items-center gap-2">
                <img src={assets.calenderIcon} alt="Search Icon" className="w-5 h-5" />
                <label htmlFor="destinationInput">Destination</label>
            </div>
        <input list='destinations' id="destinationInput" type="text" className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none " placeholder="Type here" required />
         <datalist id="destinations">
            {cities.map((city, index) => (
                <option key={index} value={city} />
            ))}
         </datalist>
        </div>

         <div>
            <div className="flex items-center gap-2">
                <img src={assets.calenderIcon} alt="Search Icon" className="w-5 h-5" />
                <label htmlFor="checkinInput">Check-in Date</label>
            </div>
        <input list='chekin' id="checkinInput" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none "  required />

        </div>

        <div>
            <div className="flex items-center gap-2">
                <img src={assets.calenderIcon} alt="Search Icon" className="w-5 h-5" />
                <label htmlFor="checkoutInput">Check-out Date</label>
            </div>
        <input list='chekout' id="checkoutInput" type="date" className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none "  required />

        </div>

        <div className='flex flex-col'>
                <label htmlFor="guests">Guests</label>
                <input min={1} max={4} id="guests" type="number" className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none " placeholder="0" />
            </div>

        <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
            <img src={assets.searchIcon} alt="Search Icon" className="w-5 h-5" />
             <span>Search</span>
        </button>
               
        </form>
    </div>
  );
};

export default Hero;
