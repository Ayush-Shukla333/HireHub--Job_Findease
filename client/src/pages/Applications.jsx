import React, { useEffect, useState, useContext, useMemo } from 'react'
import Navbar from '../components/Navbar'
import moment from 'moment'
import Footer from '../components/Footer'
import Cloud from '../assets/Cloud.png'
import { AppContext } from '../context/AppContext'
import { useUser, useAuth } from '@clerk/clerk-react'
import { toast } from 'react-toastify'
import axios from 'axios'

const Applications = () => {
  const { user } = useUser()
  const { getToken } = useAuth()
  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)

  const {
    backendUrl,
    userData,
    userApplications,
    fetchUserData,
    fetchUserApplications
  } = useContext(AppContext)

  const updateResume = async () => {
    if (!resume) {
      toast.error('Please select a resume first')
      return
    }

    try {
      const formData = new FormData()
      formData.append('resume', resume)

      const token = await getToken()

      const { data } = await axios.post(
        backendUrl + '/api/users/update-resume',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        await fetchUserData()
        toast.success(data.message)
        setIsEdit(false)
        setResume(null)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      fetchUserApplications()
      fetchUserData()
    }
  }, [user])

  const stats = useMemo(() => {
    const total = userApplications.length
    const accepted = userApplications.filter(app => app.status === 'Accepted').length
    const rejected = userApplications.filter(app => app.status === 'Rejected').length
    const pending = userApplications.filter(
      app => app.status !== 'Accepted' && app.status !== 'Rejected'
    ).length

    return { total, accepted, rejected, pending }
  }, [userApplications])

  const getStatusClass = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-700'
      case 'Rejected':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-blue-100 text-blue-700'
    }
  }

  const getMatchClass = (score) => {
    if (score >= 70) return 'bg-green-100 text-green-700'
    if (score >= 40) return 'bg-yellow-100 text-yellow-700'
    return 'bg-red-100 text-red-700'
  }

  return (
    <>
      <Navbar />

      <div className='container mx-auto min-h-[70vh] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-8'>
        {/* Heading */}
        <div className='mb-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>My Applications</h1>
          <p className='text-gray-500 mt-2 text-sm sm:text-base'>
            Track your job applications and keep your resume updated.
          </p>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
          <div className='bg-white border rounded-xl p-4 shadow-sm'>
            <p className='text-sm text-gray-500'>Total Applied</p>
            <h3 className='text-2xl font-bold text-gray-800 mt-1'>{stats.total}</h3>
          </div>
          <div className='bg-white border rounded-xl p-4 shadow-sm'>
            <p className='text-sm text-gray-500'>Pending</p>
            <h3 className='text-2xl font-bold text-blue-600 mt-1'>{stats.pending}</h3>
          </div>
          <div className='bg-white border rounded-xl p-4 shadow-sm'>
            <p className='text-sm text-gray-500'>Accepted</p>
            <h3 className='text-2xl font-bold text-green-600 mt-1'>{stats.accepted}</h3>
          </div>
          <div className='bg-white border rounded-xl p-4 shadow-sm'>
            <p className='text-sm text-gray-500'>Rejected</p>
            <h3 className='text-2xl font-bold text-red-600 mt-1'>{stats.rejected}</h3>
          </div>
        </div>

        {/* Resume Section */}
        <div className='bg-white border rounded-xl p-5 shadow-sm mb-8'>
          <h2 className='text-lg sm:text-xl font-semibold text-gray-800 mb-2'>Your Resume</h2>
          <p className='text-sm text-gray-500 mb-4'>
            Upload your latest resume in PDF format to improve your chances.
          </p>

          <div className='flex flex-col sm:flex-row sm:items-center gap-3'>
            {
              isEdit || (userData && userData.resume === "")
                ? <>
                    <label className='flex items-center flex-wrap gap-3 cursor-pointer' htmlFor='resumeUpload'>
                      <p className='bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border text-sm sm:text-base break-all'>
                        {resume ? resume.name : "Select Resume"}
                      </p>
                      <input
                        id='resumeUpload'
                        onChange={e => setResume(e.target.files[0])}
                        accept='application/pdf'
                        type="file"
                        hidden
                      />
                      <img src={Cloud} alt="upload" className='w-7 h-7' />
                    </label>

                    <button
                      onClick={updateResume}
                      className='bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer'
                    >
                      Save
                    </button>

                    <button
                      onClick={() => {
                        setIsEdit(false)
                        setResume(null)
                      }}
                      className='bg-gray-100 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-200 transition cursor-pointer'
                    >
                      Cancel
                    </button>
                  </>
                : userData && userData.resume
                  ? <div className='flex flex-col sm:flex-row gap-3 sm:items-center'>
                      <a
                        target='_blank'
                        rel='noreferrer'
                        href={userData.resume}
                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg cursor-pointer text-center hover:bg-blue-200 transition"
                      >
                        View Resume
                      </a>
                      <button
                        onClick={() => setIsEdit(true)}
                        className="text-gray-700 border border-gray-300 bg-gray-50 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-100 transition"
                      >
                        Edit Resume
                      </button>
                    </div>
                  : <p className='text-gray-500'>Loading...</p>
            }
          </div>
        </div>

        {/* Applications Section */}
        <div className='bg-white border rounded-xl shadow-sm p-4 sm:p-5'>
          <h2 className='text-lg sm:text-xl font-semibold mb-4 text-gray-800'>Jobs Applied</h2>

          {userApplications.length === 0 ? (
            <div className='text-center py-10'>
              <p className='text-gray-500 text-sm sm:text-base mb-4'>
                You haven't applied for any jobs yet.
              </p>
              <a
                href='/'
                className='inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition'
              >
                Browse Jobs
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className='min-w-200 w-full border border-gray-200 rounded-lg overflow-hidden'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='py-3 px-4 border-b text-left text-sm font-semibold text-gray-700'>Organisation</th>
                    <th className='py-3 px-4 border-b text-left text-sm font-semibold text-gray-700'>Job Role</th>
                    <th className='py-3 px-4 border-b text-left text-sm font-semibold text-gray-700'>Location</th>
                    <th className='py-3 px-4 border-b text-left text-sm font-semibold text-gray-700'>Date</th>
                    <th className='py-3 px-4 border-b text-left text-sm font-semibold text-gray-700'>Match Score</th>
                    <th className='py-3 px-4 border-b text-left text-sm font-semibold text-gray-700'>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {userApplications.map((job, index) => (
                    <tr key={index} className='hover:bg-gray-50 transition'>
                      <td className='py-3 px-4 border-b'>
                        <div className='flex items-center gap-3'>
                          <img className='w-8 h-8 object-contain rounded' src={job.companyId.image} alt="" />
                          <span className='text-sm text-gray-800 whitespace-nowrap'>{job.companyId.name}</span>
                        </div>
                      </td>

                      <td className='py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap'>
                        {job.jobId.title}
                      </td>

                      <td className='py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap'>
                        {job.jobId.location}
                      </td>

                      <td className='py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap'>
                        {moment(job.date).format('ll')}
                      </td>

                      <td className='py-3 px-4 border-b'>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getMatchClass(job.matchScore || 0)}`}>
                          {job.matchScore ? `${job.matchScore}%` : 'N/A'}
                        </span>
                      </td>

                      <td className='py-3 px-4 border-b'>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusClass(job.status)}`}>
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Applications