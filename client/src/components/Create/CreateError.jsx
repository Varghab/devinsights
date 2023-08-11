import React from 'react'
import { Link } from 'react-router-dom'

const CreateError = () => {
  return (
    <div>
      <div className={`w-10/12 mx-auto h-96`}>
          <div className='text-center'>
            <p className='text-xl md:text-3xl text-red-500'>Oops! You are not logged in :&#40;</p>
            <Link to='/login'><button className='bg-purple-600 text-white px-4 py-2 rounded-full mt-4'>Login</button></Link>
          </div>
        </div>
    </div>
  )
}

export default CreateError
