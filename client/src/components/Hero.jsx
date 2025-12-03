import React, { useContext, useRef} from 'react'
import microsoftLogo from '../assets/microsoft_logo.svg'
import walmartLogo from '../assets/walmart_logo.svg'
import accentureLogo from '../assets/accenture_logo.png'
import samsungLogo from '../assets/samsung_logo.png'
import amazonLogo from '../assets/amazon_logo.png'
import adobeLogo from '../assets/adobe_logo.png'
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { AppContext } from '../context/AppContext'

const Hero = () => {
    const {setSearchFilter, setIsSearched} = useContext(AppContext)

    const titleRef = useRef(null)
    const locationRef = useRef(null)

    const onSearch = ()=> {
        setSearchFilter({
            title:titleRef.current.value,
            location:locationRef.current.value
        })
        setIsSearched(true)
    }

    return (
        <div className='container 2xl:px-20 mx-auto my-10 px-4 sm:px-6 lg:px-8'>
            <div className="bg-gradient-to-r from-purple-700 to-purple-950 py-15 sm:py-14 md:py-20 text-center text-white mx-2 sm:mx-6 md:mx-10 rounded-xl">
                <h2 className='text-yellow-100 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-4 sm:mb-5'>Over 1,000+ jobs to apply</h2>
                <p className='mb-6 sm:mb-8 max-w-2xl mx-auto text-md sm:text-md md:text-lg text-white font-light  px-3 sm:px-5'>Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!</p>
                
                {/* Fixed Search Bar */}
                <div className='flex items-center justify-between text-gray-600 bg-white rounded-full w-full max-w-sm sm:max-w-lg md:max-w-xl p-1 mx-auto shadow-md'>
                    <div className='flex items-center flex-1'>
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 ml-2" />
                        <input
                            type="text"
                            placeholder="Search for jobs"
                            className="flex-1 outline-none ml-2 text-gray-700 text-sm placeholder:text-gray-400"
                            ref={titleRef}
                        />
                    </div>
                    
                    <div className='hidden sm:block h-8 w-px bg-gray-300'></div>
                    
                    <div className='flex items-center flex-1'>
                        <MapPinIcon className="h-5 w-5 text-gray-400 ml-4" />
                        <input
                            type="text"
                            placeholder="Location"
                            className="flex-1 outline-none ml-2 text-gray-700 text-sm placeholder:text-gray-400"
                            ref={locationRef}
                        />
                    </div>
                    
                    <button onClick={onSearch} className="bg-blue-600 px-6 py-2 rounded-full hover:bg-blue-700 cursor-pointer text-white font-medium text-sm">Search</button>
                </div>
            </div>

            <div className="border-2 border-gray-300 shadow-md mx-2 sm:mx-10 lg:mx-16 mt-8 p-3 sm:p-4 rounded-md">
                <p className="font-bold mb-4 text-center text-sm sm:text-base md:text-lg">TRUSTED PARTNERS</p>

                <div className="flex flex-wrap justify-center gap-4 sm:gap-8 lg:gap-12 mb-3">
                    <img src={microsoftLogo} alt="Microsoft" className="h-6 sm:h-6 md:h-8" />
                    <img src={walmartLogo} alt="Walmart" className="h-6 sm:h-6 md:h-8" />
                    <img src={accentureLogo} alt="Accenture" className="h-6 sm:h-6 md:h-8" />
                    <img src={samsungLogo} alt="Samsung" className="h-6 sm:h-6 md:h-8" />
                    <img src={amazonLogo} alt="Amazon" className="h-6 sm:h-6 md:h-8" />
                    <img src={adobeLogo} alt="Adobe" className="h-6 sm:h-6 md:h-8" />
                </div>
            </div>
        </div>
    )
}

export default Hero