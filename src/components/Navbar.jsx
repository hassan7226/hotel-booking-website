import React from "react";
import assets from "../assets/assets";
import { useState, useEffect } from "react";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const BookIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
    />
  </svg>
);

const Navbar = ({ isHotelRegistered, onListYourHotel }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if current page has white background by default
  const isHotelPage = location.pathname.includes("/rooms") || location.pathname.includes("/rooms/");
  const shouldAlwaysBeWhite = isHotelPage;
  const ctaClasses = `inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold transition ${
    shouldAlwaysBeWhite || isScrolled
      ? "bg-black text-white hover:bg-gray-800"
      : "bg-white text-black hover:bg-gray-100"
  }`;

  return (
    <div
      className={`navbar flex items-center justify-between pt-7  px-4 sm:px-12 lg:px-24
     py-4 fixed top-0  w-full z-20  font-medium transition-all duration-300 ${
        shouldAlwaysBeWhite || isScrolled ? "bg-white text-black shadow-lg" : "bg-transparent text-white"
      }`}
    >
      <img 
        src={assets.logo} 
        alt="Logo" 
        className="w-32 sm:w-48 transition-all"
        style={shouldAlwaysBeWhite || isScrolled ? { filter: "brightness(0)" } : {}}
      />

      {/* Menu Item */}
      <div
        className={`menu flex flex-col sm:flex-row items-center gap-7 text-sm
      sm:text-lg ${shouldAlwaysBeWhite || isScrolled ? "text-black" : "text-white"} ${!sidebarOpen ? "max-sm:w-0 overflow-hidden" : "max-sm:w-60 "}
      max-sm:fixed top-0 bottom-0 left-0 max-sm:min-h-screen
      max-sm:h-full max-sm:flex-col max-sm:bg-white max-sm:text-black
      max-sm:pt-20 transition-all`}
      >
        <img
          src={assets.closeMenu}
          alt=""
          onClick={() => setSidebarOpen(false)}
          className="w-5 absolute right-4 top-4 sm:hidden "
        />

        <a
          href="/"
          className="sm:hover:border-b"
          onClick={() => setSidebarOpen(false)}
        >
          Home
        </a>
        <a
          href="/rooms"
          className="sm:hover:border-b"
          onClick={() => setSidebarOpen(false)}
        >
          Hotels
        </a>
        <a
          href="#experience"
          className="sm:hover:border-b"
          onClick={() => setSidebarOpen(false)}
        >
          Experience
        </a>
        <a
          href="#about"
          className="sm:hover:border-b"
          onClick={() => setSidebarOpen(false)}
        >
          About
        </a>
        <a
          href="#contact"
          className="sm:hover:border-b"
          onClick={() => setSidebarOpen(false)}
        >
          Contact
        </a>

        {user && (
          <button
            type="button"
            onClick={() => {
              setSidebarOpen(false);
              if (isHotelRegistered) {
                navigate("/owner/dashboard");
                return;
              }
              onListYourHotel?.();
            }}
            className="sm:hidden mt-4 inline-flex items-center rounded-full bg-black-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {isHotelRegistered ? "Dashboard" : "List Your Hotel"}
          </button>
        )}

        
      </div>

      {/* Login menu */}
      <div className={`login flex items-center gap-4 ${shouldAlwaysBeWhite || isScrolled ? "text-white" : "text-white"}`}>
        {user && (
          <button
            type="button"
            onClick={() => {
              if (isHotelRegistered) {
                navigate("/owner/dashboard");
                return;
              }
              onListYourHotel?.();
            }}
            className={`hidden sm:inline-flex ${ctaClasses}`}
          >
            {isHotelRegistered ? "Dashboard" : "List Your Hotel"}
          </button>
        )}

        <img
          src={assets.menuIcon}
          alt=""
          onClick={() => setSidebarOpen(true)}
          className="w-6 sm:hidden transition-all"
          style={shouldAlwaysBeWhite || isScrolled ? { filter: "brightness(0)" } : {}}
        />

        <img src={assets.searchIcon} alt="" className="w-8 h-8 max-sm:hidden transition-all" style={shouldAlwaysBeWhite || isScrolled ? { filter: "brightness(0)" } : {}} />
        <img src={assets.userIcon} alt="" className="w-8 h-8 max-sm:hidden transition-all" style={shouldAlwaysBeWhite || isScrolled ? { filter: "brightness(0)" } : {}} />
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              {isHotelRegistered && (
                <UserButton.Action
                  label="Dashboard"
                  onClick={() => navigate("/owner/dashboard")}
                />
              )}
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="bg-black px-8 py-3 rounded-full hover:scale-105 max-sm:hidden"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
