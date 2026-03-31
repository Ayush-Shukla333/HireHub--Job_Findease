import hirehubLogo from '../assets/Hirehub.png'
import { NavLink, useNavigate, Outlet } from 'react-router-dom'
import { PlusIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { FaUserCheck, FaCog } from 'react-icons/fa'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'

const Dashboard = () => {
  const navigate = useNavigate()

  const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  // Function to logout for company
  const logout = () => {
    setCompanyData(null)
    setCompanyToken(null)
    localStorage.removeItem('companyToken')
    navigate('/')
  }

  useEffect(() => {
    if (companyData) {
      navigate('/dashboard/manage-jobs')
    }
  }, [companyData])

  return (
    <div className='min-h-screen w-full bg-gray-50'>

      {/* Navbar for recruiter panel */}
      <div className='shadow py-4 bg-white w-full'>
        <div className='w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => setShowSidebar(true)}
              className='sm:hidden p-2 rounded-md hover:bg-gray-100'
            >
              <Bars3Icon className='w-6 h-6 text-gray-700' />
            </button>

            <img
              onClick={() => navigate('/')}
              src={hirehubLogo}
              alt="logo"
              className="w-28 sm:w-32 md:w-36 h-auto cursor-pointer"
            />

            <span className='hidden md:inline-block bg-blue-100 text-blue-700 text-xs sm:text-sm px-3 py-1 rounded-full font-medium'>
              Recruiter Panel
            </span>
          </div>

          {companyData && (
            <div className='flex items-center gap-3 sm:gap-4'>
              <p className='hidden md:block text-sm lg:text-base text-gray-700'>
                Welcome, {companyData.name}
              </p>

              <div className='relative'>
                <img
                  src={companyData.image}
                  alt="company logo"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full cursor-pointer border"
                />

                {showProfileMenu && (
                  <div className='absolute right-0 top-12 z-20 text-black rounded'>
                    <ul className='list-none m-0 p-2 bg-white rounded-md text-sm shadow-md border min-w-[120px]'>
                      <li
                        onClick={logout}
                        className='py-2 px-3 cursor-pointer hover:bg-gray-100 rounded'
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='flex w-full min-h-[calc(100vh-72px)] relative'>
        {/* Mobile Overlay */}
        {showSidebar && (
          <div
            className='fixed inset-0 bg-black/30 z-30 sm:hidden'
            onClick={() => setShowSidebar(false)}
          ></div>
        )}

        {/* Left sidebar */}
        <div
          className={`fixed sm:static top-0 left-0 z-40 h-full sm:min-h-screen bg-white border-r border-gray-200 w-[240px] sm:w-64 transform transition-transform duration-300
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
        >
          <div className='flex items-center justify-between p-4 sm:hidden border-b'>
            <p className='font-semibold text-gray-700'>Menu</p>
            <button onClick={() => setShowSidebar(false)}>
              <XMarkIcon className='w-6 h-6 text-gray-700' />
            </button>
          </div>

          <ul className='flex flex-col items-start text-gray-800 w-full'>
            <NavLink
              onClick={() => setShowSidebar(false)}
              className={({ isActive }) =>
                `flex items-center px-4 py-4 sm:p-6 gap-3 w-full hover:bg-gray-100 ${isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''
                }`
              }
              to="/dashboard/add-job"
            >
              <PlusIcon className='h-4 w-4 text-gray-600 shrink-0' />
              <p className='block text-sm sm:text-base'>Add Job</p>
            </NavLink>

            <NavLink
              onClick={() => setShowSidebar(false)}
              className={({ isActive }) =>
                `flex items-center px-4 py-4 sm:p-6 gap-3 w-full hover:bg-gray-100 ${isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''
                }`
              }
              to="/dashboard/manage-jobs"
            >
              <FaCog className='h-4 w-4 text-gray-600 shrink-0' />
              <p className='block text-sm sm:text-base'>Manage Jobs</p>
            </NavLink>

            <NavLink
              onClick={() => setShowSidebar(false)}
              className={({ isActive }) =>
                `flex items-center px-4 py-4 sm:p-6 gap-3 w-full hover:bg-gray-100 ${isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''
                }`
              }
              to="/dashboard/view-applications"
            >
              <FaUserCheck className='h-4 w-4 text-gray-600 shrink-0' />
              <p className='block text-sm sm:text-base'>View Applications</p>
            </NavLink>
          </ul>
        </div>

        {/* Main content */}
        <div className='flex-1 w-full min-w-0 p-2 sm:p-4 md:p-6 sm:ml-0'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard