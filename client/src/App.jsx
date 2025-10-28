// type rafce to create the component structure
import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';

const App = () => {

  const isOwnerPath = useLocation().pathname.includes("owner"); /*true*/


  return (
    <div>
      {/* not owner dashboard to show Navbar, else not showing up Navbar */}
      {!isOwnerPath && <Navbar />}
      <div className='min-h-[70vh'>
        <Routes>
          <Route path='/' element = {<Home/>}></Route>
          <Route path='/rooms' element = {<AllRooms/>}></Route>
          <Route path='/rooms/:id' element = {<RoomDetails/>}></Route>

          <Route path='/my-bookings' element = {<MyBookings/>}></Route>


        </Routes>

      </div>
      {/* make footer on all pages */}
      <Footer/>
    </div>
  )
}

export default App;