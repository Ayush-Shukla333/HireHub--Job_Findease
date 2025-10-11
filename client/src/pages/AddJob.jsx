import React from 'react'
import { useState, useEffect} from 'react'
import Quill from 'quill'
import { useRef } from 'react'
import { JobCategories, JobLocations } from '../assets/assets';

const AddJob = () => {

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Bangalore');
  const [category, setCategory] = useState('Programming');
  const [level, setLevel] = useState('Beginner');
  const [salary, setSalary] = useState(0);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    //Initialize Quill editor only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  return (
    <form className='container p-4 flex flex-col items-start gap-3 w-full'>
      <div className='w-full'>
      <p className='mb-2'>Job Title</p>
      <input type="text" placeholder='Type Here' onChange={e=>setTitle(e.target.value)} value={title} required className='border-2 border-gray-300 rounded px-3 py-2 w-full max-w-lg mb-2'/>
      </div>

      <div className='w-full max-w-lg'>
        <p className='my-2'>Job Description</p>
        <div ref={editorRef}>

        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Job Category</p>
          <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e=>setCategory(e.target.value)}>
            {JobCategories.map((category, index)=>(
              <option value={category} key={index}>{category}</option>
            ))}
          </select>
        </div>   

        <div>
          <p className='mb-2'>Job Location</p>
          <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e=>setLocation(e.target.value)}>
            {JobLocations.map((location, index)=>(
              <option value={location} key={index}>{location}</option>
            ))}
          </select>
        </div> 

        <div>
          <p className='mb-2'>Job Level</p>
          <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e=>setLevel(e.target.value)}>
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
          </select>
        </div> 
      </div>

      <div>
        <p className='mb-2'>Salary</p>
        <input min={1000} type="number" placeholder='3000' onChange={e=>setSalary(e.target.value)} value={salary} required className='border-2 border-gray-300 rounded px-3 py-2 w-full mb-4 sm:w-[120px]'/>
      </div>

      <button className='w-24 py-2 mt-4 bg-black text-white rounded hover:bg-gray-800 transition-transform hover:scale-105 cursor-pointer'>ADD</button>
    </form>
  )
}

export default AddJob
