import React from 'react'
import {BarLoader, ClipLoader} from 'react-spinners'

const PageSpinner = () => {
  return (
    <div className='h-[25rem] flex justify-center items-center'>
      <div className='text-center'>
        <p className='text-xl mb-2'>Publishing</p>
        <BarLoader
          color="rgba(135, 17, 216, 1)"
          width='250'
          
        />
      </div>
    </div>
  )
}

export default PageSpinner
