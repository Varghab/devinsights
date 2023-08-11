import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {RiMenu2Fill} from 'react-icons/ri'
import {VscClose} from 'react-icons/vsc'
import axios from 'axios';
import { userContext } from '../store/UserContext';
import { useCookies } from 'react-cookie';


const Navbar = () => {

    const [cookies, removeCookies] = useCookies(['token'])
    const userCtx = useContext(userContext);
    const [toggle, setToggle] = useState(false);
    const [profileClicked, setProfileClicked] = useState(false);
    const profileStyle = profileClicked?`opacity-1 scale-100`:`opacity-0 scale-0`;
    const [avatar , setAvatar] = useState('');

    useEffect(()=>{ 
        const checkLogin = async () => {
            try {
                const response = await axios.post(process.env.REACT_APP_BASE_URL + '/api/account/check', {}, {
                    withCredentials:true,
                });
                const { success } = response.data;
                if(success){
                    userCtx.setLogin(true)
                }
            }
            catch (error) {
                userCtx.setLogin(false);
            console.error('Error during login check:', error);
            }
            };
            const getAvatar = async () => {
                try {
                    const response = await axios.post(process.env.REACT_APP_BASE_URL + '/api/account/getUser',{},{withCredentials:true});
                    setAvatar(response.data.message.avatar);
                } catch (error) {
                    setAvatar('');
                }
            }
            checkLogin();
            getAvatar();
        }, [userCtx.handleLogout,userCtx.isLogin]);
    
    const hamburgerToggle = () =>{
        setToggle((p)=>!p)
    }
    const handleProfileClick = () =>{
        setProfileClicked((p)=>!p)
    }

    return (
        <div className='py-4 md:py-5 bg-neutral-100 relative'>
            <div className='w-11/12 md:w-10/12 mx-auto flex items-center justify-between gap-6 lg:gap-8'>
                {/* Logo */}
                <div>
                    <NavLink to='/'><h1 className='text-xl md:text-2xl font-bold'>&lt;DevInsights /&gt;</h1></NavLink>
                </div>
                {/* Navlinks */}
                <div className='flex-1 hidden md:flex justify-end'>
                    <ul className='flex items-center gap-3 text-xl font-light'>
                        <NavLink to="/"><li className='transition-all duration-200 hover:text-purple-600'>/home</li></NavLink>
                        {userCtx.isLogin&&<>
                        <NavLink to="/myblogs"><li className='transition-all duration-200 hover:text-purple-600 '>/myblogs</li></NavLink>
                        <NavLink to="/create"><li className='transition-all duration-200 hover:text-purple-600 '>/create</li></NavLink>
                        </>}
                    </ul>
                </div>
                {/* Nav Buttons */}
                {!userCtx.isLogin?<div className='hidden md:flex'>   
                    <NavLink to='/login'><button className=' px-2 font-semibold underline py-2 text-md md:text-xl'>Login</button></NavLink>
                    <NavLink to='/signup'><button className='px-2 font-semibold underline text-purple-600 py-2 text-md md:text-xl'>Signup</button></NavLink>
                </div>:
                <div className='relative hidden md:block'>
                    <div onClick={handleProfileClick} className='bg-gray-200 cursor-pointer w-12 h-12 rounded-full mx-auto flex justify-center items-center'>
                        {avatar?.length>0?<img alt='avatar' src={avatar} className='w-full h-full rounded-full'></img>:
                        <div>
                            <h1 className='text-xl'>{JSON.parse(localStorage.getItem('user')).name.slice(0,1)}</h1>
                        </div>}
                    </div>
                    <div className={`${profileStyle} transition-all duration-200 w-40 p-4 border-2 -right-8 lg:-right-24 top-[3.5rem] border-purple-500 bg-white absolute z-40 rounded-xl shadow-lg`}>
                        <ul className='flex flex-col gap-2'>
                            <NavLink to='/myProfile'><li onClick={handleProfileClick} className='px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-all duration-200 cursor-pointer'>My Profile</li></NavLink>
                            <li onClick={()=>{userCtx.handleLogout();handleProfileClick()}} className='px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-all duration-200 cursor-pointer'>Logout</li>
                        </ul>
                    </div>
                </div>
                }
                {/* Hamburger */}
                <div className='justify-end flex md:hidden items-center' onClick={hamburgerToggle}><RiMenu2Fill className='text-3xl'/></div>
                
            </div>
            <hr className='w-11/12 md:w-10/12 mx-auto mt-4 border-zinc-300'></hr>   
            {/* MenuBar */}
            <div className={`bg-neutral-200 p-6 md:hidden h-full fixed w-full ${toggle?'opacity-100 z-30':'opacity-0 -z-30'} top-0 transition-all duration-300`}>
                    <div className='flex flex-col justify-between h-full'>
                        <div className='flex justify-between items-center'>
                            <NavLink onClick={hamburgerToggle} to='/'><h1 className='text-xl font-bold'>&lt;DevInsights /&gt;</h1></NavLink>
                            <VscClose onClick={hamburgerToggle} className='text-3xl'/>
                        </div>
                        <div className='-mt-36'>
                            <ul className='flex items-start flex-col gap-3 text-3xl font-light'>
                                <NavLink onClick={hamburgerToggle} to="/"><li className='transition-all duration-200 hover:text-purple-600'>/home</li></NavLink>
                                {userCtx.isLogin&&<>
                                <NavLink onClick={hamburgerToggle} to="/myblogs"><li className='transition-all duration-200 hover:text-purple-600 '>/myblogs</li></NavLink>
                                <NavLink onClick={hamburgerToggle} to="/create"><li className='transition-all duration-200 hover:text-purple-600 '>/create</li></NavLink>
                                </>}
                            </ul>
                        </div>
                        <div className=' mb-6'>
                            {userCtx.isLogin? 
                            <div>
                                <button className='px-4 w-full py-2 rounded-full bg-purple-400 text-white' onClick={()=>userCtx.handleLogout()}>Logout</button>
                            </div>:
                            <div className='flex gap-4'>
                                <NavLink onClick={hamburgerToggle} className='px-4 w-full text-center py-2 rounded-full bg-purple-400 text-white' to='/login'>Login</NavLink>
                                <NavLink onClick={hamburgerToggle} className='px-4 w-full text-center py-2 rounded-full bg-purple-400 text-white' to='/signup'>Signup</NavLink>
                            </div>}
                        </div>
                
                    </div>
                
                </div>       
        </div>
    )
}

export default Navbar
