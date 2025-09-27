import React from 'react'

const Loading = () => {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='w-15 h-15 border-4 border-blue-500 border-t-2 border-t-gray-300 rounded-full animate-spin'></div>
        </div>
    )
}

export default Loading