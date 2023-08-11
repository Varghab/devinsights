import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';

const MyBlogs = () => {
    const [error, setError] = useState(false);
    const [myBlogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(null);
    useEffect(()=>{
        setLoading(true);
        const name = JSON.parse(localStorage.getItem('user')).name
        const getMyBlogs = async()=>{
            const myBlogs = await axios.post(process.env.REACT_APP_BASE_URL + `/api/blog/getMyBlogs`,{},{
                withCredentials:true
            });
            if(myBlogs.data.success){
                setError(false);
                setTimeout(()=>{
                    const sorted = myBlogs.data.message.sort((a,b)=>{
                        if(a.createdAt > b.createdAt) return -1;
                        else if(b.createdAt < a.createdAt) return 1;
                        else return 0;
                    })
                    setBlogs(sorted);
                    setLoading(false);
                },500)
            }else {
                setLoading(false);
                setError(true);
            }
        }
        getMyBlogs();
    },[])

    return (
        <div className='w-10/12 mx-auto pb-10'>
            <div>
                <h1 className='text-2xl font-bold'>My Blogs</h1>
            </div>
            <div className=' grid gap-4 mt-6 grid-cols-1 lg:grid-cols-3 md:grid-cols-2 '>
                {
                    myBlogs.length>0?myBlogs.map((blog,id)=>{
                        return <BlogCard id={blog._id} key={blog._id} tag={blog.tag} createId={blog.createdBy.id} title={blog.title} cover={blog.cover} name={blog.createdBy.name} date={blog.createdAt} />
                    }): loading?<div className='h-96'><h1 className='text-xl'>Loading blogs <PulseLoader color='#7836d6' size={8} /> </h1></div>:<div className='h-96'><p>No blogs to show</p></div>
                }
            </div>
        </div>
    )
}

export default MyBlogs
