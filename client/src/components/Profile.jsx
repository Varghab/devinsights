import React, { useEffect, useState } from 'react'
import ProfileDesktop from '../assets/profile_desktop.jpg'
import ProfileMobile from '../assets/profile_mobile.jpg'
import axios from 'axios'
import { AiOutlineClose } from 'react-icons/ai'

const Profile = () => {
    const [user, setUser] = useState({
        email:"",
        name:""
    });
    const [updateAvatar, setAvatar] = useState(false);
    const [formValues, setFormValues] = useState({
        avatar: "",
        name: "",
        email: "",
        currentpassword: "",
        newpassword: "",
        bio:""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        avatarError: false,
        userError:false,
        updateError:{
            success:false,
            message:""
        }
    })

    useEffect(()=>{
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        const getUser = async() => {
            try {
                const response = await axios.post(process.env.REACT_APP_BASE_URL + '/api/account/getUser',{},{withCredentials:true});
                if(response.data.success){
                    const {name, email, avatar, bio} = response.data.message;
                    setUser({...user, name: response.data.message.name, email: response.data.message.email})
                    setFormValues({...formValues, name: name,email: email , avatar:avatar, bio:bio})
                }
            } catch (error) {
                setError({...error, userError:true})
            }
        }
        getUser();
    },[])

    const formHandler = (e) =>{
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    const submitHandler = async(e) =>{
        e.preventDefault();
        let response;
        try {
            response = await axios.put(process.env.REACT_APP_BASE_URL + '/api/account/updateProfile',formValues,{withCredentials:true});
            setError({...error, updateError: {...error.updateError ,success:true, message: response?.data?.message}});
        } catch (error) {
            setError({...error, updateError: {...error.updateError ,success:false, message: response?.data?.message}});
        }
        setFormValues({
            ...formValues,
            currentpassword: "",
            newpassword: "",
        })
    }
    
    const avatarHandler = async (e) => {
        setLoading(true);
        console.log(loading);
        const file = e.target.files[0];
        const data = new FormData();
        data.append('avatar', file);
        const response = await axios.post(process.env.REACT_APP_BASE_URL + '/api/account/avatarUpload',data);
        if(response.data.success){
            setFormValues({...formValues, avatar: response.data.message});
        }
        else{
            setError({...error, avatarError:true});
        }
        setLoading(false);
        console.log(loading);

    }
    
    return (
        <div className=''>
            <div className='h-64 w-full relative bg-neutral-200'>
                {/* <picture>
                    <source className='w-full h-full object-fit' media="(min-width:750px)" srcSet={ProfileDesktop}></source>
                    <img className='w-full h-full object-fit' src={ProfileMobile} alt='Porilfe mobile'></img>
                </picture> */}
                <div className='absolute top-0 translate-x-6 md:translate-x-20 lg:translate-x-32 w-10/12 translate-y-12 text-neutral-800'>
                    <h1 className='text-4xl font-bold'>Profile</h1>
                    <p className='text-2xl font-light'>Update your email, avatar, password, etc</p>
                </div>
            </div>
            <div className=' w-10/12 mx-auto relative flex' >
                {/* Profile Rounded */}
                <div className='top-0 absolute md:w-0 w-full flex flex-col items-center justify-center md:block -translate-y-14'>
                    <div className='w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center'>
                        {formValues.avatar?.length>0?<img className='w-full h-full rounded-full' src={formValues.avatar}></img>:
                        <div>
                            <h1 className='text-5xl'>{JSON.parse(localStorage.getItem('user')).name.slice(0,1)}</h1>
                        </div>}
                    </div>
                </div>
                <div className='flex w-full gap-4 md:gap-8 flex-col md:flex-row md:items-start justify-normal items-normal'>
                    <div className='flex md:items-start w-72 mx-auto flex-col items-center justify-center pt-28'>
                            <p className='text-lg md:text-xl break-words max-w-full'>{formValues.bio?.length>0?formValues.bio:"No Bio"}</p>
                            <button onClick={()=>setAvatar(p=>!p)} className='px-4 py-2 rounded-full bg-purple-500 mt-2 text-white'>Change Avatar</button>
                            {updateAvatar&&
                            <div className={`mt-4 transition-all duration-300 px-2 py-2 rounded-lg border-2 border-neutral-400`}>
                                <div className='flex justify-between items-center'>
                                    <label className='text-xl'>Choose an Avatar</label>
                                    <AiOutlineClose className='cursor-pointer' onClick={()=> setAvatar(p=>!p)} />
                                </div>
                                <input disabled={loading.avatarLoading} onChange={avatarHandler} type='file' className='w-56 mt-2' accept='.jpg,.jpeg,,png,.jfif'></input> 
                                <p>{error.avatarError&&"Error uploading avatar"}</p>  
                            </div>
                            }
                        </div>
                        <div className='w-full py-6'>
                            <div className=' w-full md:w-10/12 mx-auto bg-white shadow-md rounded-lg p-6'>
                                <form onSubmit={submitHandler}>
                                <div className='mb-4'>
                                    <label htmlFor='email' className='block text-xl text-gray-600'>Email</label>
                                    <input
                                    disabled
                                    onChange = {formHandler}
                                    name='email'
                                    id='email'
                                    value={formValues.email}
                                    type='email'
                                    className='w-full border cursor-not-allowed disabled:bg-neutral-200 border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-purple-400'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor='name' className='block text-xl text-gray-600'>Name</label>
                                    <input
                                    onChange = {formHandler}
                                    name='name'
                                    value={formValues.name}
                                    id='name'
                                    type='text'
                                    className='w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-purple-400'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor='CurrentPassword' className='block text-xl text-gray-600'>Current Password</label>
                                    <input
                                    onChange = {formHandler}
                                    required = {formValues.newpassword.length>0}
                                    name='currentpassword'
                                    id='CurrentPassword'
                                    type='password'
                                    className='w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-purple-400'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor='NewPassword' className='block text-xl text-gray-600'>New Password</label>
                                    <input
                                    onChange = {formHandler}
                                    name='newpassword'
                                    id='NewPassword'
                                    type='password'
                                    className='w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-purple-400'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor='bio' className='block text-xl text-gray-600'>Bio</label>
                                    <textarea
                                    onChange = {formHandler}
                                    name='bio'
                                    id='bio'
                                    value={formValues.bio}
                                    className='w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-purple-400'
                                    rows='4'
                                    ></textarea>
                                </div>
                                <button
                                    disabled={loading}
                                    type='submit'
                                    className='px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600'
                                >
                                    Update Profile
                                </button>
                                <p>{error.updateError?.message}</p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Profile
