import React, { use } from 'react'
import hirehubLogo from '../assets/Hirehub.png'
import { useNavigate } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
const Navbar = () => {
  const {openSignIn} = useClerk()
  const {user} = useUser()

  const navigate = useNavigate();
  const {setShowRecruiterLogin} = useContext(AppContext)
  return (
    <div className = "shadow py-4">
      <div className = "container px-10 2xl mx-auto flex justify-between items-center">
        <img onClick={()=> navigate('/')} src = {hirehubLogo} alt = "logo" className = "w-35 h-auto items-center cursor-pointer"/>
        {
          user ? <div className = "flex items-center gap-4">
            <Link to={'/applications'}>Applied Jobs</Link>
            <p>|</p>
            <p className='max-sm:hidden'>Hi, {user.firstName+" "+user.lastName}</p>
            <UserButton/>
          </div>
          :<div className="flex gap-8 max-sm:text-xs">
          <button onClick={e=>setShowRecruiterLogin(true)} className="text-gray-600 cursor-pointer hover:bg-gray-100 border border-white rounded-4xl px-3 mb-1">Recruiter Login</button>
          <button onClick={ e=>openSignIn() } className="bg-blue-800 text-white px-5 sm:px-8 py-2 rounded-full hover:bg-blue-600 cursor-pointer">Sign In</button>
        </div>
        }
      </div>
    </div>
  )
}

export default Navbar
