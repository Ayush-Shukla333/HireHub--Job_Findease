import hirehubLogo from '../assets/Hirehub.png'
import companyLogo from '../assets/company_icon.svg'
import { NavLink, useNavigate, Outlet } from 'react-router-dom'
import { PlusIcon } from '@heroicons/react/24/outline';
import { FaUserCheck } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa'

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen'>
      {/* Navbar for recruiter panel */}
      <div className='shadow py-4'>
        <div className='px-10 flex justify-between items-center'>
          <img onClick={e => navigate('/')} src={hirehubLogo} alt="logo" className="w-33 max-sm:w-32 h-auto items-center cursor-pointer" />
          <div className='flex items-center gap-4'>
            <p className='max-sm:hidden mr-5'>Welcome Ayush</p>
            <div className='relative group'>
              <img src={companyLogo} alt="company logo" className="w-10 h-10 rounded-full" />
              <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                <ul className='list-none m-0 p-2 bg-white rounded-md text-sm'>
                  <li className='py-1 px-0.5 cursor-pointer pr-5'>Logout </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex items-start'>
        {/* Left sidebar with option to add job, manage job and view applications */}
        <div className='inline-block min-h-screen border-r-2 border-gray-200'> 
          <ul className='flex flex-col items-start text-gray-800'>
              <NavLink className={({isActive})=> `flex items-center px-3 py-3 sm:p-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to="/dashboard/add-job">
                <PlusIcon className='h-4 w-4 text-gray-600' />
                <p className='max-sm:hidden'>Add Job</p>
              </NavLink>

              <NavLink className={({isActive})=> `flex items-center p-3 sm:p-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to="/dashboard/manage-jobs">
                <FaCog className='h-4 w-4 text-gray-600' />
                <p className='max-sm:hidden'> Manage Jobs</p>
              </NavLink>

              <NavLink className={({isActive})=> `flex items-center p-3 sm:p-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to="/dashboard/view-applications">
                <FaUserCheck className='h-4 w-4 text-gray-600' />
                <p className='max-sm:hidden'>View Applications</p>
              </NavLink>
          </ul>
        </div>

        <div>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
