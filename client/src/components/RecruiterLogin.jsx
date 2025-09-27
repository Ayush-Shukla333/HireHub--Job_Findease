import React from 'react'
import { useState } from 'react'
import { UserIcon } from '@heroicons/react/24/outline';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import UploadArea from '../assets/upload_area.svg'
const RecruiterLogin = () => {
  const [state, setState] = useState('Login')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const [image, setImage] = useState(false)
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault(); //prevent the webpage to reload on form submission
    if (state === 'Sign Up' && !isTextDataSubmitted) {
      setIsTextDataSubmitted(true)
    }
  }
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center '>
      <form onSubmit = {onSubmitHandler} className='relative  bg-white p-11 rounded-2xl text-slate-500'>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>Recruiter {state}</h1>
        <p className='text-sm mt-2'>Welcome Back !! Please sign in to continue.</p>
        {/* if the state is sign up and text data is submitted succesfully , we give the option to upload company logo */}
        {
          state === 'Sign Up' && isTextDataSubmitted ?
            <>
            <div className='flex items-center gap-4 my-10'>
              <label htmlFor="image">
                <img className="w-16 rounded-full cursor-pointer hover:scale-120" src = {image ? URL.createObjectURL(image): UploadArea} />
                <input onChange = {e=>setImage(e.target.files[0])} type = "file" id='image' hidden/>
              </label>
              <p>Upload Company <br/>Logo</p>
            </div>
            </>
            :
            <>
              {state !== 'Login' && (
                <div className='border px-4 py-2 flex items-center gap-3 rounded-3xl mt-6 mb-4'>
                  <UserIcon className='h-5 w-5 text-gray-400' />
                  <input className="outline-none text-sm" onChange={e => setName(e.target.value)} value={name} type='text' placeholder='Company Name' required />
                </div>
              )}
              <div className='border px-4 py-2 flex items-center gap-3 rounded-3xl mt-6 mb-4'>
                <EnvelopeIcon className='h-5 w-5 text-gray-400' />
                <input className="outline-none text-sm" onChange={e => setEmail(e.target.value)} value={email} type='email' placeholder='Email Id' required />
              </div>

              <div className='border px-4 py-2 flex items-center gap-3 rounded-3xl mt-6 mb-4'>
                <LockClosedIcon className='h-5 w-5 text-gray-400' />
                <input className="outline-none text-sm" onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Password' required />
              </div>

            </>
        }
        <p className='text-sm text-blue-600 cursor-pointer my-2 text-right'>Forgot Password?</p>
        <button type = 'submit' className='bg-blue-800 text-white w-full py-2 rounded-3xl mt-4 hover:bg-blue-600'>
          {state === 'Login' ? 'Login' : isTextDataSubmitted ? 'Create Account': 'Next'}
        </button>
        {state === 'Login' ? <p className='mt-3 text-center'>Don't have an account ? <span className="text-blue-600 cursor-pointer" onClick={() => setState("Sign Up")}>Sign Up</span></p> : <p className='mt-3 text-center'>Already have an account ? <span className="text-blue-600 cursor-pointer" onClick={() => setState("Login")}>Login</span></p>}
      </form>
    </div>
  )
}

export default RecruiterLogin
