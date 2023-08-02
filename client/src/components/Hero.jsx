import React from 'react'
import HeroImage from '../assets/emile-perron-xrVDYZRGdw4-unsplash.jpg'
import { NavLink } from 'react-router-dom'
const Hero = () => {
    return (
        <div className='relative'>
            <img src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80" className='rounded-lg transition-all duration-200 ease-in-out filter grayscale brightness-50 hover:grayscale-0 hover:brightness-75'></img>
            <div className='absolute w-8/12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-200 py-4 px-6 md:py-8 md:px-10 lg:py-14 lg:px-16'>
                <h1 className='text-black text-2xl rounded-xl md:text-6xl lg:text-8xl bg-neutral-200'>Learn, Share, and Grow!</h1>
                <NavLink to='/create'><button className='border-2 border-black text-purple-600 mt-2 md:mt-4 text-sm md:text-2xl rounded-full px-2 md:px-4 py-1 md:py-2'>Create</button></NavLink>
            </div>
        </div>
    )
}

export default Hero
