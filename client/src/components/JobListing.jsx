import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { XMarkIcon } from "@heroicons/react/24/outline";
import { JobCategories, JobLocations, jobsData } from '../assets/assets';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import JobCard from './JobCard';

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext)
  const [showFilter, setShowFilter] = useState(false); //for filter toggle button

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-2">
      {/* Sidebar */}
      <div className='w-full lg:w-1/4 bg-white px-4'>
        {/* Search Filter from Hero component*/}
        {/* Check if something is searched in the input and if something is searched then display title and location in current search sidebar 58:00*/}

        {
          isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className='font-medium text-lg mb-4'>CurrentSearch</h3>
              <div className='text-gray-600 mb-4'>
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2.5 bg-blue-200 border border-blue-300 text-sm px-3 py-1 rounded mb-2">
                    {searchFilter.title}
                    <XMarkIcon onClick={e => setSearchFilter(prev => ({ ...prev, title: "" }))} className="h-4 w-4 ml-2 cursor-pointer text-gray-600 hover:text-red-500"
                    /> {/*Reset the title on clicking cross*/}
                  </span>
                )}

                {searchFilter.location && (
                  <span className="ml-2 inline-flex items-center gap-2.5 bg-red-200 border border-red-300 text-sm px-3 py-1 rounded">
                    {searchFilter.location}
                    <XMarkIcon onClick={e => setSearchFilter(prev => ({ ...prev, location: "" }))} className="h-4 w-4 ml-2 cursor-pointer text-gray-600 hover:text-red-500"
                    /> {/*Reset the location on clicking cross*/}
                  </span>
                )}
              </div>
            </>
          )
        }
        { /*Filter Toggle Button for small screen */}
        <div className="flex justify-start">
          <button onClick = {e => setShowFilter(prev => !prev)} className='px-3 py-1.5 rounded border border-gray-400 lg:hidden mb-4'>
            {showFilter ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        { /*Category Filter */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4 mb-1">Search by Categories</h4>
          <ul className="space-y-3 text-gray-600">
            {
              JobCategories.map((category, index) => {
                return (
                  <li key={index} className="flex items-center gap-2">
                    <input className="scale-125" type="checkbox" />
                    {category}
                  </li>
                )
              })
            }
          </ul>
        </div>

        { /*Location Filter */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4 pt-12">Search by Location</h4>
          <ul className="space-y-3 text-gray-600">
            {
              JobLocations.map((location, index) => {
                return (
                  <li key={index} className="flex items-center gap-2">
                    <input className="scale-125" type="checkbox" />
                    {location}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>

      {/* Job Listings */}
      <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
        <h3 className="font-bold text-xl py-2" id="job-list">Trending Jobs</h3>
        <p className='mb-8'>Secure latest jobs in top companies with desired job role</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
          {jobs.slice((currentPage-1)*6, currentPage*6).map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>

        {/* Pagination*/}
        {jobs.length > 0 && (
          <div className='mt-10 flex items-center justify-center space-x-6'>
            <a href="#job-list">
            <button onClick={()=>setCurrentPage(prev=>Math.max(prev-1), 1)}><FaArrowLeft/></button>
            </a>

            {Array.from({ length: Math.ceil(jobs.length / 6) }).map((_, index)=>(
              <a href="#job-list">
              <button className={`w-10 h-10 flex items-center justify-center rounded border border-gray-300 ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-white text-gray-800"}`}
              onClick={e => setCurrentPage(index + 1)}
              >
                {index+1}
              </button>
              </a>
            ))}

            <a href="#job-list">
            <button><FaArrowRight/></button>
            </a>

          </div>
        )}
      </section>
    </div>
  )
}

export default JobListing
