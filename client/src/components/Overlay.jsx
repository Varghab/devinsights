import React from 'react'
import { BeatLoader, ClipLoader, MoonLoader, PacmanLoader, PulseLoader } from 'react-spinners';

const Overlay = () => {
    return (
        <div className='w-full z-[200] h-full inset-0 top-0 absolute flex justify-center items-center  bg-neutral-400/70'>
            <div className='w-22 h-24 -translate-y-[20rem] md:-translate-y-full text-center'>
                <h1 className='text-xl text-neutral-900 font-semibold'>Deleting</h1><ClipLoader color='#7836d6' size={35} className='mt-2'/>
            </div>
        </div>
    )
}

export default Overlay
