import React, { useContext, useEffect, useState } from 'react'
import Hero from './Hero'
import BlogCard from './BlogCard'
import axios from 'axios'
import { userContext } from '../store/UserContext'
import {RiArrowDropDownLine} from 'react-icons/ri'
import { MoonLoader, PacmanLoader } from 'react-spinners';

import {RiArrowDropUpLine} from 'react-icons/ri'

const Home = () => {
    const [allBlogs, setAllBlogs] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const userCtx = useContext(userContext)
    useEffect(()=>{
        setLoading(true)
        const getAllBlogs = async () =>{
            const res = await axios.get(process.env.REACT_APP_BASE_URL + '/api/blog/getAllBlogs');
            // console.log(res.data.result);
            if(res.data.success){
                setAllBlogs(res.data.result);
                setLoading(false);
            }
        }
        getAllBlogs();
    },[])

    const handleSortToggle = () => {
        setToggle((p)=>!p)
    }

    return (
        <div>
            <div className='w-11/12 md:w-10/12 mx-auto py-2 pb-6'>
                {localStorage.getItem("isLogin")&&<div className='py-4'>
                    <h1 className='font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
                    Welcome {JSON.parse(localStorage.getItem('user')).name}!</h1>
                </div>}
                <Hero />
                <div className='mt-8'>
                    <div className='text-center p-6 bg-neutral-200 text-black rounded-xl'>
                        <h1 className='text-3xl font-normal'>All blogs</h1>
                    </div>
                    <div className='flex mt-8'>
                        <section className='w-96 px-4'>
                            <div>
                                <h1 className='text-2xl font-semibold'>Sort By</h1>
                                <div className='mt-2 px-2 py-4 bg-neutral-200 rounded-lg'>
                                    <button onClick={handleSortToggle} className='flex justify-between items-center w-full'>
                                    Released Date
                                    {
                                        toggle?<RiArrowDropUpLine />:<RiArrowDropDownLine />
                                    }

                                    </button>
                                    <div className={`mt-4 ${toggle?"block":"hidden"}`}>
                                        <div class="flex items-center mt-2">
                                            <button className='w-full py-1 px-2 text-left bg-white rounded-sm'>
                                                Lastest
                                            </button>
                                
                                        </div>
                                        <div class="flex items-center mt-2">
                                            <button className='w-full py-1 px-2 text-left bg-white rounded-sm'>
                                                Oldest
                                            </button>
                                            
                                        </div>
                                    </div>
                                </div>
        
                            </div>
                        </section>
                        {loading?<div className='w-full'>
                                    <h1 className='text-2xl'>Loading...</h1>
                        </div>:<div className=' grid gap-4 grid-cols-1 lg:grid-cols-3 md:grid-cols-2'>
                            {
                                allBlogs.length>0?allBlogs.map((blog,id)=>{
                                    return <BlogCard key={blog._id} title={blog.title} cover={blog.cover} name={blog.createdBy.name} date={blog.createdAt} />
                                }): <p>No blogs to show!</p>
                            }
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
