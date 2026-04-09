import React from "react";
import Title from "./Title";
import assets from "../assets/assets";
import { exclusiveOffers } from "../assets/assets";
const ExclusiveOffers = () => {
  return (
    <div className="flex flex-col px-6 md:px-12 lg:px-24 xl:px-32 pt-20 pb-30">
      <div className="flex flex-col md:flex-row items-center justify-between  ">
        <Title
          align="left"
          title="Exclusive Offers"
          subTitle="Discover our handpicked selection of 
        exceptional properties around the world, offering unparalleled luxury and unforgettable 
        experiences."
        />

        <button
          className="flex flex-start items-center gap-3 px-4 py-2 border border-gray-300 
        text-sm font-medium bg-white rounded hover:bg-gray-50 max-md:mt-12"
        >
          View All Offers
          <img src={assets.arrowIcon} alt="arrow icon" className="" />
        </button>
      </div>

      <div className="grid cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            className=" relative flex flex-col items-start justify-between 
            gap-2 px-4 py-2 pt-12 md:pt-18 rounded-xl text-white border border-gray-300 text-sm font-medium bg-cover bg-center bg-no-repeat "
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <p className="px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-500 font-medium rounded-full">
              {item.priceOff} % OFF
            </p>
            <div className="">
              <p className="text-2xl font-medium font-playfair">{item.title}</p>
              <p className="text-sm">{item.description}</p>
              <p className="text-sm text-white/70 mt-3">
                Expires {item.expiryDate}
              </p>
            </div>
            <button
              className="flex items-center text-md gap-2 font-medium cursor-pointer
       mt-4 mb-5"
            >
              View Offers
              <img
                src={assets.arrowIcon}
                alt=""
                className="invert group-hover:translate-x-1"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveOffers;
