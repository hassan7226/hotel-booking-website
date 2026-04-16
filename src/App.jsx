import React from 'react'
import Navbar from './components/Navbar.jsx'
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Home from './pages/Home.jsx';
import Footer from './components/Footer.jsx';
import AllRooms from './pages/AllRooms.jsx';
import RoomDetails from './pages/RoomDetails.jsx';
import MyBookings from './pages/MyBookings.jsx';
import HotelRegistration from './components/HotelRegistration.jsx';
import Layout from './pages/hotelOwner/Layout.jsx';
import Dashboard from './pages/hotelOwner/Dashboard.jsx';
import AddRoom from './pages/hotelOwner/AddRoom.jsx';
import ListRooms from './pages/hotelOwner/ListRooms.jsx';

const App = () => {
  const [isHotelRegistrationOpen, setIsHotelRegistrationOpen] = useState(false);
  const [isHotelRegistered, setIsHotelRegistered] = useState(false);
  const { user } = useUser();

  const isOwnerPath = window.location.pathname.startsWith('/owner');

  useEffect(() => {
    if (!user?.id) {
      setIsHotelRegistered(false);
      return;
    }

    const storageKey = `hotelRegistered:${user.id}`;
    setIsHotelRegistered(window.localStorage.getItem(storageKey) === 'true');
  }, [user?.id]);

  const handleHotelRegistration = () => {
    if (!user?.id) {
      return;
    }

    const storageKey = `hotelRegistered:${user.id}`;
    window.localStorage.setItem(storageKey, 'true');
    setIsHotelRegistered(true);
    setIsHotelRegistrationOpen(false);
  };

  return (
    <div className='min-h-screen flex flex-col'>
      {isOwnerPath ? null : (
        <Navbar
          isHotelRegistered={isHotelRegistered}
          onListYourHotel={() => setIsHotelRegistrationOpen(true)}
        />
      )}
      <HotelRegistration
        isOpen={isHotelRegistrationOpen}
        onClose={() => setIsHotelRegistrationOpen(false)}
        onRegister={handleHotelRegistration}
      />
      <div className="grow">  
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/rooms" element={ <AllRooms /> } />
            <Route path="/rooms/:id" element={ <RoomDetails /> } />
            <Route path="/my-bookings" element={ <MyBookings /> } />
            
            {/* Owner Dashboard Routes */}
            <Route path="/owner" element={ <Layout /> }>
              <Route index element={ <Dashboard /> } />
              <Route path="dashboard" element={ <Dashboard /> } />
              <Route path="add-room" element={ <AddRoom /> } />
              <Route path="list-rooms" element={ <ListRooms /> } />
            </Route>
          </Routes>      
      </div>
      {!isOwnerPath && <Footer/>}
    </div>
  )
}

export default App
