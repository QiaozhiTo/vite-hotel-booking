// type rafce to create the component structure
import React from 'react'
import Navbar from './components/Navbar'
import { useLocation } from 'react-router-dom'
const App = () => {

  const isOwnerpath = useLocation().pathname.includes("owner"); /*true*/


  return (
    <div>
      {/* not owner dashboard to show Navbar, else not showing up Navbar */}
      {!isOwnerpath && <Navbar />}
    </div>
  )
}

export default App;