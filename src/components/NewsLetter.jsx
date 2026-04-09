import React from "react";
import assets from "../assets/assets";

const NewsLetter = () => {
  return (
      <div className="w-full bg-slate-900  text-center text-white py-14 flex flex-col items-center justify-center
       px-6 md:px-12 lg:px-24 xl:px-32 mb-30 mt-20 max-w-6xl mx-auto  rounded-xl">
        <p className="text-indigo-500 font-medium">Get updated</p>
        <h1 className="max-w-lg font-semibold text-4xl/[44px] mt-2">
          Subscribe to our newsletter & get the latest news
        </h1>
        <div className="flex items-center justify-center mt-10 border border-slate-600 focus-within:outline focus-within:outline-indigo-600 text-sm rounded-full h-14 max-w-md w-full">
          <input
            type="text"
            className="bg-transparent outline-none rounded-full px-4 h-full flex-1"
            placeholder="Enter your email address"
          />
          <button className="bg-indigo-600 text-white rounded-full h-11 mr-1 px-8 flex items-center justify-center">
            Subscribe now
          </button>
        </div>
      </div>
  );
};

export default NewsLetter;
