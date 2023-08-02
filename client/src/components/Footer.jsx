import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='bg-zinc-800 text-white py-16'>
            <div className='w-10/12 mx-auto'>
                <div className=' flex flex-col md:flex-row justify-between gap-8 md:gap-0'>
                    <div className='w-72'>
                        <h1 className='text-3xl font-bold'>DevInsights;</h1>
                        <h1 className='mt-2 text-xl text-neutral-300'>The only place to showcase your knowledge and expand your skill set.</h1>
                    </div>
                    <div>
                        <h1 className='text-neutral-500 text-lg'>Get in touch</h1>
                        <ul className='mt-1 flex flex-col gap-1'>
                            <li>shibvarghab@gmail.com</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className='text-neutral-500 text-lg'>Quick Links</h1>
                        <ul className='mt-1 flex flex-col gap-1'>
                            <Link to='/create'><li className='underline'>Write</li></Link>
                            <Link to='/'><li className='underline'>Faqs</li></Link>
                            <Link to='/'><li className='underline'>Account</li></Link>
                        </ul>
                    </div>
                    <div>
                        <h1 className='text-neutral-500 text-lg'>Connect</h1>
                        <ul className='mt-1 flex flex-col gap-1'>       
                            <Link target='_blank' to='https://github.com/Varghab'><li className='underline'>Github</li></Link>
                            <Link target='_blank' to='https://www.linkedin.com/in/varghab-shib-aa0b4a179'><li className='underline'>Linkedin</li></Link>
                        </ul>
                    </div>
                </div>
                <div className='mt-8'>
                    <hr className='border-neutral-600'></hr>
                    <h1 className='text-left md:text-center mt-6'>DevInsights © 2023. All Rights Reserved.</h1>
                </div>
            </div>
        </div>
    )
}

export default Footer
