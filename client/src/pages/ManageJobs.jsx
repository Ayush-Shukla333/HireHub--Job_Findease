import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate} from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const ManageJobs = () => {
  const navigate = useNavigate()

  const [jobs, setJobs] = useState(false);

  const { backendUrl, companyToken } = useContext(AppContext)

//Function to fetch company Job Application Data
  const fetchCompanyJobs = async ()=>{
    try {
      const { data } = await axios.get(backendUrl + '/api/company/list-jobs', {headers:{token:companyToken}})

      if (data.success) {
        setJobs(data.jobsData.reverse())
        console.log(data.jobsData)
      }
      else {
        toast.error(data.message)
      }

    }
    catch (error) {
      toast.error(error.message)
    }
  }
  //Function to change job visibility
  const changeJobVisibility = async (id)=>{
    try {
      const { data } = await axios.post(backendUrl + '/api/company/change-visibility', {id}, {headers:{token:companyToken}})

      if (data.success) {
        toast.success(data.message)
        fetchCompanyJobs()
      } else {
        toast.error(data.message)
      }
    }
    catch (error) {
      toast.error(error.message)
    }

  }
  useEffect(()=>{
    if (companyToken) {
      fetchCompanyJobs()
    }
  },[companyToken])

  return jobs ? jobs.length === 0 ? (
  <div className='flex items-center justify-center h-[70vh]'>
    <p className='text-xl sm:text-2xl'>No Jobs Posted !!</p>
  </div>) : (
    <div className='container max-w-5xl p-4'>
      <div className='overflow-x-auto'>
        <table className='min-w-full border bg-white border-gray-200 max-sm:text-sm'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>#</th>
              <th className='py-2 px-4 border-b text-left'>Job Title</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>Date</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>Location</th>
              <th className='py-2 px-4 border-b text-center'>Applicants</th>
              <th className='py-2 px-4 border-b text-left'>Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs && jobs.map((job, index) => (
              <tr key={index} className='text-gray-700'>
                <td className='py-2 px-4 border-b max-sm:hidden'>{index+1}</td>
                <td className='py-2 px-4 border-b'>{job.title}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{job.location}</td>
                <td className='py-2 px-4 border-b text-center'>{job.applicants}</td>
                <td className='py-2 px-4 border-b'>
                  <input onChange={()=>changeJobVisibility(job._id)} className='scale-125 ml-4' type="checkbox" checked={job.visible}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-end mt-4'>
        <button onClick = {()=> navigate('/dashboard/add-job')} className='bg-gray-800 text-white py-2 px-4 rounded cursor-pointer hover:bg-black'>Add New Job</button>
      </div>
    </div>
  ) : <Loading/>
}

export default ManageJobs
