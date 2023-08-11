import React, { useContext, useEffect, useState } from 'react'
import Hero from './Hero'
import BlogCard from './BlogCard'
import axios from 'axios'
import { userContext } from '../store/UserContext'
import {RiArrowDropDownLine} from 'react-icons/ri'
import { BeatLoader, ClipLoader, MoonLoader, PacmanLoader, PulseLoader } from 'react-spinners';

import {RiArrowDropUpLine} from 'react-icons/ri'
import Tag from './Tag'

const Home = () => {
    const [allBlogs, setAllBlogs] = useState([]);
    const [backUp, setBackup] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const userCtx = useContext(userContext)
    useEffect(()=>{
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setLoading(true)

        const getAllBlogs = async () =>{
            const res = await axios.get(process.env.REACT_APP_BASE_URL + '/api/blog/getAllBlogs');
            // console.log(res.data.result);
            if(res.data.success){
                setAllBlogs(res.data.result);
                setTimeout(()=>{
                    setLoading(false);
                },1000)
                
            }
        }
        

        getAllBlogs();
        
    },[])

    const handleSortToggle = () => {
        setToggle((p)=>!p)
    }

    const handleSort = (e)=>{
        if(e.target.id==='newest'){
            const sortedBlogs = (backUp.length>0?[...backUp]:[...allBlogs]).sort((a,b)=>{
                if(a.createdAt>b.createdAt)return -1;
                else if(a.createdAt<b.createdAt)return 1;
                return 0;
            })
            backUp.length>0? setBackup(sortedBlogs):setAllBlogs(sortedBlogs);

        }else{
            const sortedBlogs = (backUp.length>0?[...backUp]:[...allBlogs]).sort((a,b)=>{
                if(a.createdAt>b.createdAt)return 1;
                else if(a.createdAt<b.createdAt)return -1;
                return 0;
            })
            backUp.length>0? setBackup(sortedBlogs):setAllBlogs(sortedBlogs);
        }
    }

    const handleSearch = () =>{
        const searchedValue = allBlogs.filter((blog)=>{
            return blog.title.toLowerCase().includes(search.toLowerCase())
        })
        setBackup(searchedValue);
    }

    const filterHandler = (e) => {
        setLoading(true);
        const tag = e.target.value;
        const filtered = allBlogs.filter((blog)=>blog.tag===tag);
        setBackup(filtered);
        setTimeout(()=>{
            setLoading(false);
        },500)
        
    }

    const clearHandler = () => {
        setBackup([]);
    }

    return (
        <div>
            <div className='w-11/12 md:w-10/12 mx-auto py-2 pb-6'>
                {localStorage.getItem("isLogin")&&<div className='py-4'>
                    {JSON.parse(localStorage.getItem('user'))?.name&&<h1 className='font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
                    Welcome {JSON.parse(localStorage.getItem('user')).name}!</h1>}
                </div>}
                <Hero />
                <div className='mt-8 px-4 py-6'>
                    <div className='text-center p-6 text-black rounded-xl'>
                        <h1 className='text-3xl font-normal'>All blogs</h1>
                    </div>
                    <div className='flex mt-8 flex-col lg:flex-row gap-4 md:gap-1 '>
                        <section className='w-full lg:w-[40rem] px-4 '>
                            <div className='sticky top-5'>
                            <div className='flex gap-2'>
                                <input onChange={(e)=>setSearch(e.target.value)} value={search} type='text' className='px-3 py-2 w-full outline-none border-2 rounded-lg' placeholder='Search the blog...'></input>
                                <button onClick={handleSearch} className='px-2 py-1 bg-purple-500 rounded-lg text-white'>Search</button>
                            </div>
                            <div className='mt-4 sticky top-0'>
                                <h1 className='text-2xl font-semibold'>Sort By</h1>
                                <div className='mt-2 px-2 py-4 border-2  rounded-lg'>
                                    <button onClick={handleSortToggle} className='flex justify-between items-center w-full'>
                                    Released Date
                                    {
                                        toggle?<RiArrowDropUpLine />:<RiArrowDropDownLine />
                                    }

                                    </button>
                                    <div className={`mt-4 ${toggle?"block":"hidden"}`}>
                                        <div class="flex items-center mt-2 gap-2">
                                            <input onClick={handleSort} type="radio" name="release_date" id="newest" value="Newest" />
                                            <label className='text-lg font-light' htmlFor="newest">Newest</label>
                                        </div>
                                        <div class="flex items-center mt-2 gap-2">
                                            <input onClick={handleSort} type="radio" name="release_date" id="oldest" value="Oldest" />
                                            <label className='text-lg font-light' htmlFor="oldest">Oldest</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <h1 className='text-2xl font-semibold'>Filter by tags</h1>
                                    <div className='flex flex-col mt-2 gap-1'>
                                        {(allBlogs).map((blog)=>{
                                            return blog.tag;
                                        }).filter((tag, index, arr) => arr.indexOf(tag)===index).map((item)=><Tag key={item} filterHandler={filterHandler} label={item} />)
                                        }                          
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <button onClick={clearHandler} className='p-2 border-2 border-neutral-400 rounded-xl w-24 outline-none '>Clear</button>
                                </div>
                            </div>
                            </div>
                        </section>
                        {loading?<div className='w-full px-0 md:px-10 mt-4 md:mt-0'>
                            <h1 className='text-2xl'>Loading blogs <PulseLoader color='#7836d6' size={10} /> </h1>
                        </div>:<div className=' grid gap-4 grid-cols-1 lg:grid-cols-2 '>
                            {
                                (backUp.length>0?backUp:allBlogs).map((blog,id)=>{
                                    return <BlogCard key={blog._id} id={blog._id} title={blog.title} cover={blog.cover} tag={blog.tag} name={blog.createdBy.name} createId={blog.createdBy.id} date={blog.createdAt} />
                                })
                            }
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
