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
    useEffect(()=>{ 
        const checkLogin = async () => {
            try {
                if (!cookies.token||cookies.token===undefined) {
                    console.log("Inside Effect");
                    userCtx.setLogin(false);
                } else {
                    const response = await axios.post(process.env.REACT_APP_BASE_URL + '/api/account/check', {}, {
                        withCredentials:true,
                        
                    });
                    const { success } = response.data;
                    if(success){
                        userCtx.setLogin(true)
                    }
                }
                } catch (error) {
                console.error('Error during login check:', error);
                }
            };
            checkLogin();
        }, []);
    
    const hamburgerToggle = () =>{
        setToggle((p)=>!p)
    }

    return (
        <div className='py-4 md:py-5 bg-neutral-100'>
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
                </div>:<NavLink to='/'><button onClick={()=>userCtx.handleLogout()} className=' px-2 hidden md:block font-semibold underline py-2 text-md md:text-xl'>Logout</button></NavLink>}
                {/* Hamburger */}
                <div className='justify-end flex md:hidden items-center' onClick={hamburgerToggle}><RiMenu2Fill className='text-3xl'/></div>
                
            </div>
            <hr className='w-11/12 md:w-10/12 mx-auto mt-4 border-zinc-300'></hr>   
            {/* MenuBar */}
            <div className={`bg-neutral-200 p-6 md:hidden h-full w-full top-0 fixed transition-all right-0 duration-300 z-30 ${toggle?"right-0  ":"-right-[50rem]" }`}>
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
                            {localStorage.getItem('isLogin')? 
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
