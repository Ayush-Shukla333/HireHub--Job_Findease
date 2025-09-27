import React , { useState } from 'react'
import Navbar from '../components/Navbar'
import moment from 'moment';
import { jobsApplied } from '../assets/assets'
import Footer from '../components/Footer';
import Cloud from '../assets/cloud.png'

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null); //state variable to store resume file and data

  return (
    <>
    <Navbar/>
    <div className='container px-4 sm:px-8 md:px-12 lg:px-20 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
      <h2 className='text-xl font-semibold'>Your Resume</h2>
      <div className='flex gap-2 mb-6 mt-3'>
        {
          isEdit ? 
          <>
            <label className='flex items-center' htmlFor='resumeUpload'>
              <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-3'>Select Resume</p>
              <input id='resumeUpload' onChange={e=>setResume(e.target.files[0])} accept='application/pdf' type="file" hidden />
              <img src = {Cloud} alt = "upload" className='w-7 h-7'/>
            </label>
            <button onClick = {e=> setIsEdit(false)} className='bg-green-100 border border-green-400 px-4 py-2 rounded-lg ml-3'>Save</button>
          </>
          : <div className='flex gap-4 items-center'>
            <a className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg cursor-pointer" href = "#  ">Resume</a>
            <button onClick={()=> setIsEdit(true)} className="text-gray-600 border border-gray- bg-gray-100 rounded-lg px-4 py-2 cursor-pointer">Edit</button>
          </div>
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
            <th className='py-3 px-4 border-b border-gray-400 text-left'>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobsApplied.map((job, index) => true ? (
            <tr key={index}>
              <td className='py-2 px-4 border-b border-gray-400 flex items-center gap-4'>
                <img className='w-7 h-7' src = {job.logo} alt=""/>
                {job.company}
              </td>
              <td className='py-2 px-4 border-b border-gray-400'>{job.title}</td>
              <td className='py-2 px-4 border-b border-gray-400 max-sm:hidden'>{job.location}</td>
              <td className='py-2 px-4 border-b border-gray-400 max-sm:hidden'>{moment(job.date).format('ll')}</td>
              <td className='py-2 px-4 border-b border-gray-400'>
                <span className={`${job.status==='Accepted' ? 'bg-green-100' : job.status==='Rejected' ? 'bg-red-100': 'bg-blue-100'} px-4 py-1.5 rounded`}>{job.status}</span>
              </td>
            </tr>
          ): (null))}
        </tbody>
      </table>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Applications
