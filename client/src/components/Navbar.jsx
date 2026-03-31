import React, { useContext, useState } from 'react'
import hirehubLogo from '../assets/Hirehub.png'
import { useNavigate, Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { AppContext } from '../context/AppContext'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
  const { openSignIn } = useClerk()
  const { user } = useUser()
  const navigate = useNavigate()

  const {
    setShowRecruiterLogin,
    companyToken,
    setCompanyToken,
    setCompanyData
  } = useContext(AppContext)

  const [showMenu, setShowMenu] = useState(false)

  const logoutRecruiter = () => {
    localStorage.removeItem('companyToken')
    setCompanyToken(null)
    setCompanyData(null)
    navigate('/')
  }

  return (
    <div className="shadow py-3 sm:py-4 bg-white w-full">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <img
            onClick={() => navigate('/')}
            src={hirehubLogo}
            alt="logo"
            className="w-28 sm:w-32 md:w-36 h-auto cursor-pointer"
          />

          {companyToken && (
            <span className="hidden md:inline-block bg-blue-100 text-blue-700 text-xs sm:text-sm px-3 py-1 rounded-full font-medium">
              Recruiter Panel
            </span>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? (
            <XMarkIcon className="w-6 h-6 text-gray-700" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-gray-700" />
          )}
        </button>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 text-sm sm:text-base">
          {companyToken ? (
            <>
              <Link to="/dashboard/manage-jobs" className="hover:text-blue-700 transition">
                Manage Jobs
              </Link>
              <Link to="/dashboard/add-job" className="hover:text-blue-700 transition">
                Add Job
              </Link>
              <Link to="/dashboard/view-applications" className="hover:text-blue-700 transition">
                Applications
              </Link>
              <button
                onClick={logoutRecruiter}
                className="border rounded-full px-4 py-2 hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          ) : user ? (
            <>
              <Link to="/" className="hover:text-blue-700 transition">
                Browse Jobs
              </Link>
              <Link
                to="/applications"
                className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full hover:bg-blue-100 transition"
              >
                My Applications
              </Link>
              <p className="text-gray-700">
                Hi, {user.firstName}
              </p>
              <UserButton />
            </>
          ) : (
            <>
              <button
                onClick={() => setShowRecruiterLogin(true)}
                className="text-gray-600 cursor-pointer hover:bg-gray-100 border rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition"
              >
                Recruiter Login
              </button>
              <button
                onClick={() => openSignIn()}
                className="bg-blue-800 text-white px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 rounded-full hover:bg-blue-600 cursor-pointer transition"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden px-4 sm:px-6 pb-4 pt-2 border-t bg-white space-y-3">
          {companyToken ? (
            <>
              <Link to="/dashboard/manage-jobs" onClick={() => setShowMenu(false)} className="block">
                Manage Jobs
              </Link>
              <Link to="/dashboard/add-job" onClick={() => setShowMenu(false)} className="block">
                Add Job
              </Link>
              <Link to="/dashboard/view-applications" onClick={() => setShowMenu(false)} className="block">
                Applications
              </Link>
              <button onClick={logoutRecruiter} className="block text-left w-full">
                Logout
              </button>
            </>
          ) : user ? (
            <>
              <Link to="/" onClick={() => setShowMenu(false)} className="block">
                Browse Jobs
              </Link>
              <Link to="/applications" onClick={() => setShowMenu(false)} className="block">
                My Applications
              </Link>
              <div className="flex items-center gap-3 pt-2">
                <span>Profile Settings</span>
                <UserButton />
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setShowRecruiterLogin(true)
                  setShowMenu(false)
                }}
                className="block text-left w-full"
              >
                Recruiter Login
              </button>
              <button
                onClick={() => {
                  openSignIn()
                  setShowMenu(false)
                }}
                className="block text-left w-full"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Navbar