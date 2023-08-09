import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai'
import Overlay from './Overlay';

const BlogDetail = () => {
    const uid = useLocation().state.createId;
    const navigate = useNavigate();
    const currentBlog = useParams().id;
    const {name, id} = useParams();
    const [blog, setBlog] = useState({});
    const [error, setError] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        const getSingleBlog = async() =>{
            const response = await axios.get(process.env.REACT_APP_BASE_URL + `/api/blog/getSingleBlog/${id}`);
            if(response.data.success){
                setError(false);
                setBlog(response.data.message);
            }else setError(true);
        }
        const validate = async() =>{
            try {
                const response = await axios.post(process.env.REACT_APP_BASE_URL + `/api/account/validate`,{
                    id: uid
                },{withCredentials:true});
                if(response.data.success){
                    setUpdateMode(true);
                }else{
                    setUpdateMode(false);
                }
            } catch (error) {
                setUpdateMode(false);
            }
        }
        getSingleBlog();
        validate();
    },[]);

    const deleteHandler = async () =>{
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setLoading(true);
        const response = await axios.delete(process.env.REACT_APP_BASE_URL + `/api/blog/deleteBlog/${currentBlog}`,{withCredentials:true});
        console.log('Inside Delete function');
        if(response.data.success){
            setTimeout(() => {
                navigate('/');
                setLoading(false);
            }, 2000);
        }
    }

    return (
    loading? <div className='h-[30rem]'><Overlay /></div> :<div className=' bg-neutral-100 p-4 pb-14'>
        <div className='w-full md:w-10/12 mx-auto'>
            <div className='h-[30rem]'>
                <img className='h-full w-full object-cover' src={blog.cover} alt={blog.title}></img>
            </div>
            <div className='text-left md:text-center mt-6 mx-auto'>
                <h1 className='text-5xl font-semibold'>{blog.title}</h1>
            </div>
            <div className='text-left md:text-center mt-4 flex justify-center items-center gap-4'>
                <p className='text-2xl font-light'>Published by {blog.createdBy?.name} , {new Date(blog.createdAt).toLocaleString('en-US',{day:"2-digit", month:"long", year:"numeric"})} </p>
                {updateMode&&<div className='flex gap-2 items-center'>
                    <Link state={blog} to='/create'><AiOutlineEdit className='text-3xl p-[0.3rem] rounded-full bg-neutral-300 cursor-pointer'/></Link>
                    <AiOutlineDelete onClick={deleteHandler} className='text-3xl p-[0.3rem] rounded-full bg-neutral-300 cursor-pointer'/>
                </div>  }
                
            </div>
            {/* Content */}
            <div className='mx-auto max-w-3xl'>
                <hr className='mt-4 md:mt-10 border-neutral-400'></hr>
                <div className='mt-8'>
                    <div className="blogDetails" dangerouslySetInnerHTML={{__html:blog.content}}></div>
                </div>
        
            </div>
        </div>
    </div>
    )
}

export default BlogDetail
