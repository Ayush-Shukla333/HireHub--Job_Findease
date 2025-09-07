import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { XMarkIcon } from "@heroicons/react/24/outline";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter } = useContext(AppContext)
  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* Sidebar */}
      <div className='w-full lg:w-1/4 bg-white px-14'>
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
                  <span className="ml-2 inline-flex items-center gap-2.5 bg-red-200 border border-red-300 text-sm px-3 py-1 rounded mb-2">
                    {searchFilter.location}
                    <XMarkIcon onClick={e => setSearchFilter(prev => ({ ...prev, location: "" }))} className="h-4 w-4 ml-2 cursor-pointer text-gray-600 hover:text-red-500"
                    /> {/*Reset the location on clicking cross*/}
                  </span>
                )}
              </div>
            </>
          )
        }

        {/* Category Filter */}
        <div className="max-lg:hidden">
          <h4 className="font-medium text-lg py-4 mb-2">Search by Category</h4>
          <ul>
            {
              JobCategories.map((category, index)=> {
                return (
                <li key={index} className="flex items-center gap-2 my-1">
                  <input  className="scale-125" type="checkbox"/>
                  {category}
                </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default JobListing
