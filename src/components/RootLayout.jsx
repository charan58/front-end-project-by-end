import React from 'react'
import Navbar from './navbar/Navbar'
import { Outlet } from 'react-router-dom'
function RootLayout() {
  return (
    <div>
        <Navbar/>
        {/* placeholder */}
        <Outlet/>
    </div>
  )
}

export default RootLayout