import React from 'react'
import Navbar from './components/Navbar.jsx'
import { assets } from './assets/assets.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Footer from './components/Footer.jsx';
import AllRooms from './pages/AllRooms.jsx';
import RoomDetails from './pages/RoomDetails.jsx';
import MyBookings from './pages/MyBookings.jsx';
import HotelRegistration from './components/HotelRegistration.jsx';
import Layout from './pages/hotelOwner/Layout.jsx';

const App = () => {

  const isOwnerPath = window.location.pathname === '/owner';
  return (
    <div className='min-h-screen flex flex-col'>
      {isOwnerPath ? null : <Navbar />}
       {false && <HotelRegistration />} {/* Render the hotel registration form */}
      <div className="grow">  
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/rooms" element={ <AllRooms /> } />
            <Route path="/rooms/:id" element={ <RoomDetails /> } />
            <Route path="/my-bookings" element={ <MyBookings /> } />
            <Route path="/owner" element={ <Layout /> } />
          </Routes>      
      </div>
      <Footer/> 
    </div>
  )
}

export default App
