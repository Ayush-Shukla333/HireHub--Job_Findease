import React from 'react'
import hirehubLogo from '../assets/Hirehub.png'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const {openSignIn} = useClerk()
  const {user} = useUser()
  return (
    <div className = "shadow py-3">
      <div className = "container px-10 2xl mx-auto flex justify-between items-center">
        <img src = {hirehubLogo} alt = "logo" className = "w-30 h-auto items-center"/>
        {
          user ? <div className = "flex items-center gap-4">
            <Link to={'/applications'}>Applied Jobs</Link>
            <p>|</p>
            <p className='max-sm:hidden'>Hi, {user.firstName+" "+user.lastName}</p>
            <UserButton/>
          </div>
          :<div className="flex gap-8 max-sm:text-xs">
          <button className="text-gray-600 cursor pointer">Recruiter Login</button>
          <button onClick={ e=>openSignIn() } className="bg-blue-800 text-white px-5 sm:px-8 py-2 rounded-full hover:bg-blue-600 cursor-pointer">Login</button>
        </div>
        }
      </div>
    </div>
  )
}

export default Navbar
