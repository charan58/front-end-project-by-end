import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <nav className='navbar navbar-light bg-light m-2'>
        <Link className='nav-link'><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Wu3roAfmhA8RMmi22FUDsQeTUwSCrs_0Eg&usqp=CAU'
        alt='not found' width="30" height="30" className="d-inline-block align-top"/>
        </Link>
        <Link to='/users' className='nav-link'>Users</Link>
        <Link to='/removed-users' className='nav-link mt-1'>Removed Users</Link>
    </nav>
  )
}

export default Navbar