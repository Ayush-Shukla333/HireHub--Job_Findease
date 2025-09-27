import companyIcon from '../assets/company_icon.svg'
import { useNavigate } from 'react-router-dom';
const JobCard = ({ job }) => {
  const navigate = useNavigate(); //function to navigate to different page when button is clicked
  return (
    <div className='border-gray-300 border-2 px-5 py-2 rounded hover:shadow-lg transition-shadow duration-300'>
      <div className='flex justify-between items-center mb-4'>
        <img className="h-8" src={companyIcon}/>
      </div>
      <h4 className='font-medium text-xl mt-2'>{job.title}</h4>
      <div className='flex gap-3 text-xs mt-2'>
        <span className='bg-blue-50 border border-blue-300 px-3 py-1.5 rounded'>{job.location}</span>
        <span className='bg-red-50 border border-red-300 px-3 py-1.5 rounded'>{job.level}</span>
      </div>
      <p className='text-gray-800 text-sm mt-4' dangerouslySetInnerHTML={{__html: job.description.slice(0,150)}}></p>
      <div className='flex gap-3 mt-4'>
        <button onClick={()=> {navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className='bg-blue-500 text-white px-3 py-1.5 rounded cursor-pointer hover:bg-blue-900'>Apply Now</button>
        <button onClick={()=> {navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className='text-gray-900 border border-gray-400 px-4 py-1.5 rounded cursor-pointer hover:bg-gray-200'>Learn More</button>
      </div>
    </div>
  )
}

export default JobCard
