import { FaDownload } from "react-icons/fa";
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '../components/Loading';

const ViewApplications = () => {

  const { backendUrl, companyToken } = useContext(AppContext);

  const [applicants, setApplicants] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/applicants', { headers: { token: companyToken } })

      if (data.success) {
        setApplicants(data.applications.reverse())
      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      toast.error(error.message)
    }
  }

  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/company/change-status',
        { id, status },
        { headers: { token: companyToken } }
      )

      if (data.success) {
        setOpenMenu(null);
        fetchCompanyJobApplications();
      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);

  return applicants ? applicants.length === 0 ? (
    <div className='flex items-center justify-center h-[60vh] sm:h-[70vh] px-4 text-center w-full'>
      <p className='text-lg sm:text-2xl'>No Applicants Available !!</p>
    </div>
  ) : (
    <div className='w-full px-3 sm:px-5 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6'>
      <div className='w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm'>
        <table className='w-full min-w-[760px] border bg-white border-gray-200 max-sm:text-sm'>
          <thead>
            <tr className='border-b bg-gray-50'>
              <th className='py-3 px-3 sm:px-4 text-left'>#</th>
              <th className='py-3 px-3 sm:px-4 text-left'>User Name</th>
              <th className='py-3 px-3 sm:px-4 text-left max-sm:hidden'>Job Title</th>
              <th className='py-3 px-3 sm:px-4 text-left max-sm:hidden'>Location</th>
              <th className="py-3 px-3 sm:px-4 text-left">Match %</th>
              <th className='py-3 px-3 sm:px-4 text-left'>Resume</th>
              <th className='py-3 px-3 sm:px-4 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
              <tr key={index} className='text-gray-700 hover:bg-gray-50 transition'>
                <td className='py-3 px-3 sm:px-4 border-b text-center'>{index + 1}</td>
                <td className='py-3 px-3 sm:px-4 border-b'>
                  <div className='flex items-center gap-2'>
                    <img className="w-10 h-10 rounded-full mr-3 max-sm:hidden" src={applicant.userId.image} alt='' />
                    <span>{applicant.userId.name}</span>
                  </div>
                </td>
                <td className='py-3 px-3 sm:px-4 border-b max-sm:hidden'>{applicant.jobId.title}</td>
                <td className='py-3 px-3 sm:px-4 border-b max-sm:hidden'>{applicant.jobId.location}</td>
                <td className="py-3 px-3 sm:px-4 border-b text-center">
                  {applicant.matchScore ? (
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${applicant.matchScore >= 70
                        ? 'bg-green-100 text-green-700'
                        : applicant.matchScore >= 40
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                      {applicant.matchScore}%
                    </span>
                  ) : (
                    <span className='text-gray-400'>N/A</span>
                  )}
                </td>
                <td className='py-3 px-3 sm:px-4 border-b'>
                  <a
                    href={applicant.userId.resume}
                    target='_blank'
                    rel='noreferrer'
                    className='bg-blue-50 text-blue-400 px-2 py-1 rounded hover:bg-blue-100 transition-colors inline-flex gap-2 items-center'
                  >
                    Resume<FaDownload />
                  </a>
                </td>
                <td className='py-3 px-3 sm:px-4 border-b relative'>
                  {applicant.status === "Pending"
                    ? <div className='relative inline-block text-left'>
                        <button
                          onClick={() => setOpenMenu(openMenu === applicant._id ? null : applicant._id)}
                          className='text-gray-500 action-button px-2 py-1'
                        >
                          ...
                        </button>

                        {openMenu === applicant._id && (
                          <div className='z-10 absolute right-0 md:left-0 top-0 mt-8 w-32 bg-white border border-gray-200 rounded shadow-lg'>
                            <button
                              onClick={() => changeJobApplicationStatus(applicant._id, 'Accepted')}
                              className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100'
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => changeJobApplicationStatus(applicant._id, 'Rejected')}
                              className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    : <div>{applicant.status}</div>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : <Loading />;
}

export default ViewApplications