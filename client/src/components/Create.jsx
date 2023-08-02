import React, { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {CiImageOn} from 'react-icons/ci'
import axios from 'axios'
import { ClipLoader } from 'react-spinners';

const Create = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    error:false,
    message:''
  });
  const [formData, setFormData] = useState({
    title:"",
    content:"",
    cover:""
  })

  const changeHandler = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  
  const getText = (html)=>{
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  }

  const submitHandler = async(e) =>{
    e.preventDefault();
    const data = new FormData();
    data.append('title',formData.title)
    data.append('content', getText(formData.content))
    data.append('cover', formData.cover)
    setLoading(true);
    const response = await axios.post(process.env.REACT_APP_BASE_URL + '/api/blog/createBlog', data, {
      withCredentials: true
    });
    if(response.data.success) {
      setMessage({...message, error:false, message:response.data.message})
      setFormData({
        title:"",
        content:"",
        cover:""
      })
    }
    else if(!response.data.success){
      setMessage({...message, error: true, message:response.data.message})
    }
    setLoading(false);

  }

  return (
        <div className='w-10/12 mx-auto'>
          <form method='post' encType='multipart/form-data' onSubmit={submitHandler} >
          <div>
            <input required onChange={changeHandler} className='mt-2 border-2 bg-neutral-100 py-2 px-2 border-neutral-300 w-full outline-none text-lg' name='title' placeholder='Blog Title...' ></input>
          </div>
          <div className='mt-6 mb-16 flex flex-col lg:flex-row gap-4'>
              <ReactQuill required value={formData.content} onChange={(e)=> setFormData({...formData,content:e})} className='h-96 lg:flex-1 w-full lg:w-72' />
            <div className='rounded-lg border-2 h-fit border-neutral-300 px-4 py-4 w-full lg:w-72 mt-16 sm:mt-12 lg:mt-0'>
              <div>
                <h2 className='text-3xl'>Media</h2>
                <div className='flex mt-2 gap-2'>
                  <div className='p-2 bg-gray-200 rounded-lg'>
                    <CiImageOn className='text-3xl' />
                  </div> 
                  <div>
                    <h2 className='text-black font-semibold'>Image</h2>
                    <p className='text-neutral-500'>Upload a cover image</p>
                  </div>
                </div>
                <div className='mt-2'>
                  <input onChange={(e)=>setFormData({...formData, [e.target.name]:e.target.files[0]})} required name='cover' type='file' className='w-full' accept='.jpg, .jpeg'></input>
                  {loading?<button type='submit' className='bg-purple-500 px-3 py-1 text-white mt-2 rounded-full' disabled><div className='flex items-center gap-2'>Publishing<ClipLoader
                    color="white"
                    size={20}
                  /></div></button>:<button type='submit' className='bg-purple-500 px-2 py-1 text-white mt-2 rounded-full cursor-pointer'>Publish</button>}
                  <p className={`${message.error?'text-red-500':'text-green-500'} mt-2`}>{message.message}</p>

                </div>
              </div> 
            </div>
          </div>
          </form>
        </div>

      ) 
};

export default Create;
