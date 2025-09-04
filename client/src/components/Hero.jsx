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
        <div className='container 2xl:px-20 mx-auto my-10'>
            <div className="bg-gradient-to-r from-purple-700 to-purple-950 py-15 text-center text-white mx-10 rounded-xl">
                <h2 className='text-yellow-100 text-2xl md:text-3xl lg:text-4xl font-medium mb-5'>Over 7,000+ jobs to apply</h2>
                <p className='mb-8 max-w-2xl mx-auto text-md text-white font-light px-5'>Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!</p>
                <div className='flex items-center justify-between text-gray-600 bg-white rounded max-w-xl pl-4 mx-4 sm:mx-auto'>
                    <div className='flex items-center'>
                        <MagnifyingGlassIcon className="h-4 sm:h-5 w-5 mr-2" />
                        <input
                            type="text"
                            placeholder="Search for jobs"
                            className="flex-1 outline-none"
                            ref={titleRef}
                        />
                    </div>
                    <p className='text-xl text-gray-500'>|</p>
                    <div className='flex items-center'>
                        <MapPinIcon className="h-4 sm:h-5 w-5 mr-2" />
                        <input
                            type="text"
                            placeholder="Location"
                            className="flex-1 outline-none"
                            ref={locationRef}
                        />
                    </div>
                    <button onClick={onSearch} className="bg-blue-600 px-6 py-2 rounded sm:px-5 hover:bg-blue-800 cursor-pointer m-1 text-white font-medium">Search</button>
                </div>
            </div>

            <div className="border-3 border-gray-300 shadow-md mx-16 mt-5 p-2 rounded-md">
                <p className="font-bold mb-4 text-center">TRUSTED PARTNERS</p>

                <div className="flex justify-center gap-10 lg:gap-22">
                    <img src={microsoftLogo} alt="Microsoft" className="h-6" />
                    <img src={walmartLogo} alt="Walmart" className="h-6" />
                    <img src={accentureLogo} alt="Accenture" className="h-6" />
                    <img src={samsungLogo} alt="Samsung" className="h-6" />
                    <img src={amazonLogo} alt="Amazon" className="h-6" />
                    <img src={adobeLogo} alt="Adobe" className="h-6" />
                </div>
            </div>

        </div>
    )
}

export default Hero
