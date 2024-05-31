import React from 'react'
import Logo from '../assets/movieIcon.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex border space-x-8 items-center li-3 py-2'>
        <img className='w-[50px]' src={Logo} alt="" />

        <Link to='/' className='text-blue-400 text-3xl font-bold' >Movies</Link>

        <Link to='/watchlist' className='text-blue-400 text-3xl font-bold' >WatchList</Link>
    
    
    </div>
  )
}

export default Navbar;