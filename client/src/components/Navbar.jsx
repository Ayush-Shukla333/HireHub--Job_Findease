import React, { useContext } from 'react'
import hirehubLogo from '../assets/Hirehub.png'
import { useNavigate, Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const { openSignIn } = useClerk()
  const { user } = useUser()
  const navigate = useNavigate()
  const { setShowRecruiterLogin } = useContext(AppContext)

  return (
    <div className="shadow py-3 sm:py-4 bg-white w-full">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
        <img
          onClick={() => navigate('/')}
          src={hirehubLogo}
          alt="logo"
          className="w-28 sm:w-32 md:w-36 h-auto cursor-pointer"
        />

        {user ? (
          <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
            <Link
              to="/applications"
              className="hidden sm:block hover:text-blue-700 transition"
            >
              Applied Jobs
            </Link>

            <Link
              to="/applications"
              className="sm:hidden hover:text-blue-700 transition"
            >
              Jobs
            </Link>

            <p className="hidden sm:block text-gray-400">|</p>

            <p className="hidden md:block">
              Hi, {user.firstName} {user.lastName}
            </p>

            <p className="block md:hidden">
              Hi, {user.firstName}
            </p>

            <UserButton />
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm md:text-base">
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className="text-gray-600 cursor-pointer hover:bg-gray-100 border rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition whitespace-nowrap"
            >
              Recruiter Login
            </button>
            <button
              onClick={() => openSignIn()}
              className="bg-blue-800 text-white px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 rounded-full hover:bg-blue-600 cursor-pointer transition whitespace-nowrap"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar