import React, {useContext} from 'react'
import { AppContext } from '../context/AppContext'

const JobListing = () => {
    const {isSearched, searchFilter} = useContext(AppContext)
    return (
    <div>
      {/* Sidebar */}
      <div>
        {/* Search Filter from Hero component*/}
        {
            isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                <>
                <h3>CurrentSearch</h3>
                <div>
                    {searchFilter.title}
                </div>
                </>
            )
        }
      </div>
    </div>
  )
}

export default JobListing
