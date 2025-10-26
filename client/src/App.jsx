// type rafce to create the component structure
import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';

const App = () => {

  const isOwnerpath = useLocation().pathname.includes("owner"); /*true*/


  return (
    <div>
      {/* not owner dashboard to show Navbar, else not showing up Navbar */}
      {!isOwnerpath && <Navbar />}
      <div className='min-h-[70vh'>
        <Routes>
          <Route path='/' element = {<Home/>}></Route>
          <Route path='/rooms' element = {<AllRooms/>}></Route>


        </Routes>

      </div>
      {/* make footer on all pages */}
      <Footer/>
    </div>
  )
}

export default App;