// type rafce to create the component structure
import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';
import HotelReg from './components/HotelReg';
import Layout from './pages/hotelOwner/Layout';
import Dashboard from './pages/hotelOwner/Dashboard';
import AddRoom from './pages/hotelOwner/AddRoom';
import ListRoom from './pages/hotelOwner/ListRoom';
import {Toaster} from "react-hot-toast"
import { useAppContext } from './context/AppContext';

const App = () => {

  const isOwnerPath = useLocation().pathname.includes("owner"); /*true*/
  const { showHotelReg} = useAppContext();

  return (
    <div>
      <Toaster/>
      {/* not owner dashboard to show Navbar, else not showing up Navbar */}
      {!isOwnerPath && <Navbar />}
      {showHotelReg && <HotelReg/>}
      {/* for now we make it false to keep it hidden  */}
      {/* {false && <HotelReg/>}  */}
      <div className='min-h-[70vh'>
        <Routes>
          <Route path='/' element = {<Home/>}></Route>
          <Route path='/rooms' element = {<AllRooms/>}></Route>
          <Route path='/rooms/:id' element = {<RoomDetails/>}></Route>

          <Route path='/my-bookings' element = {<MyBookings/>}></Route>
          <Route path ='/owner' element={<Layout/>}>
            <Route index element={<Dashboard/>}></Route>
            <Route path="add-room" element={<AddRoom/>}></Route>
            <Route path="list-room" element={<ListRoom/>}></Route>


          </Route>
        </Routes>

      </div>
      {/* make footer on all pages */}
      <Footer/>
    </div>
  )
}

export default App;