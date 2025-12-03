import { useContext, useState, useEffect, use } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
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
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';

const ApplyJob = () => {
  const { id } = useParams(); //find job data according to id from params and set the data in a state variable

  const { getToken } = useAuth();

  const navigate = useNavigate();

  const [jobData, setJobData] = useState(null);

  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);

  //logic to find the data from jobs array according to id and set the job data in jobData state variable
  const { jobs, backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext);

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`);
      if (data.success) {
        setJobData(data.job);
        console.log(data.job);
      } else {
        toast.error(data.message);
      }
    }
    catch (error) {
      toast.error(error.message);
    }

  }

  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error("Please login to apply for job");
      }

      if (!userData.resume) {
        navigate('/applications')
        return toast.error("Please upload your resume to apply for job");
      }

      const token = await getToken();

      const { data } = await axios.post(backendUrl + '/api/users/apply', { jobId: jobData._id }, { headers: { Authorization: `Bearer ${token}` } })

      if (data.success) {
        const score = data.match_score ?? 0;
        toast.success(
          `Applied successfully! AI Match Score: ${score.toFixed(2)}%`
        );
        fetchUserApplications();
      } else {
        toast.error(data.message);
      }

    }
    catch (error) {
      toast.error(error.message);
    }
  }

  const checkAlreadyApplied = () => {
    const hasApplied = userApplications.some(item => item.jobId._id === jobData._id);
    setIsAlreadyApplied(hasApplied);


  }
  useEffect(() => {
    fetchJob();
  }, [id]); //fetch job data when id changes

  useEffect(() => {
    if (userApplications.length > 0 && jobData) {
      checkAlreadyApplied();
    }
  }, [jobData, userApplications, id])
  return jobData ? (
    <>
      <Navbar />
      <div className='min-h-screen flex flex-col py-6 container px-4 sm:px-8 md:px-12 lg:px-20 2xl:px-32 mx-auto'>
        <div className='bg-white text-black rounded-lg w-full'>
          <div className='flex justify-center md:justify-between flex-wrap gap-5 px-4 sm:px-8 lg:px-14 py-15 mb-6 bg-sky-100 border border-sky-400 rounded-xl'>
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
              <button onClick={applyHandler} className='bg-blue-600 text-white px-4 py-2 rounded m-2 hover:bg-blue-700 cursor-pointer'>{isAlreadyApplied ? 'Already Applied' : 'Apply Now'}</button>
              <p className='mt-1 text-gray-600'>Posted {moment(jobData.date).fromNow()}</p>
            </div>
          </div>

          <div className='flex flex-col lg:flex-row justify-between items-start'>
            <div className='w-full lg:w-2/3'>
              <h2 className='font-bold text-2xl mb-3'>Job Description</h2>
              <div className="rich-text" dangerouslySetInnerHTML={{ __html: jobData.description }}></div>
              <button onClick={applyHandler} className='bg-blue-600 text-white px-4 py-2 rounded mt-5 hover:bg-blue-700 cursor-pointer'>{isAlreadyApplied ? 'Already Applied' : 'Apply Now'}</button>
              <hr className="block md:hidden my-2 border-gray-600 mt-6" />
            </div>
            {/* Right section for more jobs */}
            <div className='w-full lg:w-1/3 mt-3 lg:mt-8 lg:ml-8 space-y-3'>
              <h2 className='text-lg'>More jobs from {jobData.companyId.name}:</h2>
              {jobs.filter(job => job._id != jobData._id && job.companyId._id === jobData.companyId._id).filter(job => {
                //Set of applied jobIds
                const appliedJobsIds = new Set(userApplications.map(app => app.jobId && app.jobId._id));
                //Retrun true if user has not applied for this job
                return !appliedJobsIds.has(job._id);
              }).slice(0, 4).map((job, index) => <JobCard key={index} job={job} />)}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  )
}

export default ApplyJob
