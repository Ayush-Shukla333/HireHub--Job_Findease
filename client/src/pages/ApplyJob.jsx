import React from 'react'
import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import { FaSuitcase } from 'react-icons/fa';
import { MapPinIcon } from "@heroicons/react/24/outline";
import { BriefcaseIcon } from '@heroicons/react/24/outline'
import { UserIcon } from '@heroicons/react/24/outline';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import kconvert from 'k-convert';
import moment from 'moment';
import JobCard from '../components/JobCard';
import Footer from '../components/Footer';

const ApplyJob = () => {
  const { id } = useParams(); //find job data according to id from params and set the data in a state variable

  const [jobData, setJobData] = useState(null);
  //logic to find the data from jobs array according to id and set the job data in jobData state variable
  const { jobs } = useContext(AppContext);
  const fetchJob = async () => {
    const data = jobs.filter(job => job._id === id) //Store in jobData array
    if (data.length != 0) {
      setJobData(data[0]);
      console.log(data[0]);
    }
  }

  useEffect(() => {
    if (jobs.length > 0) {
      fetchJob();
    }
  }, [id, jobs]); //fetch job data when id changes

  return jobData ? (
    <>
      <Navbar />
      <div className='min-h-screen flex flex-col py-6 container px-4 sm:px-8 md:px-12 lg:px-20 2xl:px-32 mx-auto'>
        <div className='bg-white text-black rounded-lg w-full'>
          <div className='flex justify-center md:justify-between flex-wrap gap-5 px-4 sm:px-8 lg:px-14 py-10 mb-6 bg-sky-100 border border-sky-400 rounded-xl'>
            <div className='flex flex-col md:flex-row gap-6 md:gap-10 items-center'>
              <img className="h-18 bg-white rounded-lg p-4 mr-0.5 max-md:mb-4 border" src={jobData.companyId.image} />
              <div className='text-center md:text-left text-neutral-7  00'>
                <h1 className='text-2xl sm:text-2xl font-medium'>{jobData.title}</h1>
                <div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-700 mt-2'>
                  <span className='flex gap-1.5 items-center'>
                    <BriefcaseIcon className='h-4 w-4' />
                    {jobData.companyId.name}
                  </span>
                  <span className='flex gap-1.5 items-center'>
                    <MapPinIcon className="h-4 w-4" />
                    {jobData.location}
                  </span>
                  <span className='flex gap-1.5 items-center'>
                    <UserIcon className="h-4 w-4" />
                    {jobData.level}
                  </span>
                  <span className='flex gap-1.5 items-center'>
                    <CurrencyDollarIcon className="h-4 w-4" />
                    CTC: {kconvert.convertTo(jobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center'>
              <button className='bg-blue-600 text-white px-4 py-2 rounded m-2 hover:bg-blue-700 cursor-pointer'>Apply Now</button>
              <p className='mt-1 text-gray-600'>Posted {moment(jobData.date).fromNow()}</p>
            </div>
          </div>

          <div className='flex flex-col lg:flex-row justify-between items-start'>
            <div className='w-full lg:w-2/3'>
              <h2 className='font-bold text-2xl mb-3'>Job Description</h2>
              <div className="rich-text" dangerouslySetInnerHTML={{ __html: jobData.description }}></div>
              <button className='bg-blue-600 text-white px-4 py-2 rounded mt-5 hover:bg-blue-700 cursor-pointer'>Apply Now</button>
              <hr className="block md:hidden my-2 border-gray-600 mt-6" />
            </div>
            {/* Right section for more jobs */}
            <div className='w-full lg:w-1/3 mt-3 lg:mt-8 lg:ml-8 space-y-3'>
              <h2 className='text-lg'>More jobs from {jobData.companyId.name}:</h2>
              {jobs.filter(job=> job._id !=jobData._id && job.companyId._id === jobData.companyId._id).slice(0,4).map((job, index) => <JobCard key={index} job = {job}/>)}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  ) : (
    <Loading />
  )
}

export default ApplyJob
