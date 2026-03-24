import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import moment from 'moment';
import Footer from '../components/Footer';
import Cloud from '../assets/Cloud.png'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useUser, useAuth } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Applications = () => {

  const { user } = useUser();
  const { getToken } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext);

  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append('resume', resume);

      const token = await getToken();

      const { data } = await axios.post(backendUrl + '/api/users/update-resume', formData, { headers: { Authorization: `Bearer ${token}` } })

      if (data.success) {
        await fetchUserData();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
    catch (error) {
      toast.error(error.message);
    }

    setIsEdit(false);
    setResume(null)
  }

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user])

  return (
    <>
      <Navbar />
      <div className='container px-4 sm:px-8 md:px-12 lg:px-20 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Your Resume</h2>
        <div className='flex gap-2 mb-6 mt-3'>
          {
            isEdit || (userData && userData.resume === "")
              ? <>
                <label className='flex items-center' htmlFor='resumeUpload'>
                  <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-3'>{resume ? resume.name : "Select Resume"}</p>
                  <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type="file" hidden />
                  <img src={Cloud} alt="upload" className='w-7 h-7' />
                </label>
                <button onClick={updateResume} className='bg-green-100 border border-green-400 px-4 py-2 rounded-lg ml-3'>Save</button>
              </>
              : userData && userData.resume
                ? <div className='flex gap-4 items-center'>
                  <a target='_blank' href={userData.resume} className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg cursor-pointer">Resume</a>
                  <button onClick={() => setIsEdit(true)} className="text-gray-600 border border-gray-400 bg-gray-100 rounded-lg px-4 py-2 cursor-pointer">Edit</button>
                </div>
                : <p className='text-gray-500'>Loading...</p>
          }
        </div>
        <h2 className='text-xl font-semibold mb-3'>Jobs Applied</h2>
        <div className="overflow-x-auto">
          <table className='min-w-full bg-white border border-gray-400 rounded-lg'>
            <thead>
              <tr>
                <th className='py-3 px-4 border-b border-gray-400 text-left'>Organisation</th>
                <th className='py-3 px-4 border-b border-gray-400 text-left'>Job Role</th>
                <th className='py-3 px-4 border-b border-gray-400 text-left max-sm:hidden'>Location</th>
                <th className='py-3 px-4 border-b border-gray-400 text-left max-sm:hidden'>Date</th>
                <th className='py-3 px-4 border-b border-gray-400 text-left'>Match Score</th>
                <th className='py-3 px-4 border-b border-gray-400 text-left'>Status</th>
              </tr>
            </thead>
            <tbody>
              {userApplications.map((job, index) => (
                <tr key={index}>
                  <td className='py-2 px-4 border-b border-gray-400 flex items-center gap-4'>
                    <img className='w-7 h-7' src={job.companyId.image} alt="" />
                    {job.companyId.name}
                  </td>
                  <td className='py-2 px-4 border-b border-gray-400'>{job.jobId.title}</td>
                  <td className='py-2 px-4 border-b border-gray-400 max-sm:hidden'>{job.jobId.location}</td>
                  <td className='py-2 px-4 border-b border-gray-400 max-sm:hidden'>{moment(job.date).format('ll')}</td>
                  <td className='py-2 px-4 border-b border-gray-400'>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${job.matchScore >= 70
                        ? 'bg-green-100 text-green-700'
                        : job.matchScore >= 40
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                      {job.matchScore ? `${job.matchScore}%` : 'N/A'}
                    </span>
                  </td>
                  <td className='py-2 px-4 border-b border-gray-400'>
                    <span className={`${job.status === 'Accepted' ? 'bg-green-100' : job.status === 'Rejected' ? 'bg-red-100' : 'bg-blue-100'} px-4 py-1.5 rounded`}>{job.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Applications