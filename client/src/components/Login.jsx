import React, { useContext, useState } from 'react'
import { userContext } from '../store/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { MoonLoader, PacmanLoader } from 'react-spinners';

const Login = () => {
    const userCtx = useContext(userContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); 
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
            }));
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    userCtx.handleLogin(formData);
    setFormData({
        email: '',
        password: '',
        });

    setLoading(true);
    setTimeout(()=>{
        setLoading(false)
        setTimeout(()=>{
            navigate('/')
        },1000) 
    }, 3000)
    
    };

    
    return (
    <div className='bg-neutral-100'>
        <div className="flex justify-center items-center p-8">
        <form className="w-96 space-y-6 bg-zinc-800 px-8 pt-14 pb-10 text-white rounded-xl" onSubmit={handleSubmit}>
            <h1 className='text-2xl md:text-3xl'>Login to your account</h1>
            
            <div>
            <label htmlFor="email" className="block">
                Email Address
            </label>
            <input
                id="email"
                type="email"
                className="mt-1 block w-full border-gray-300 text-black outline-none px-2 py-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            </div>
            <div>
            <label htmlFor="password" className="block">
                Password
            </label>
            <input
                id="password"
                type="password"
                className="mt-1 block w-full border-gray-300 text-black outline-none px-2 py-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            </div>
            <div>
                <p className='text-red-400'>{userCtx.loginMessage}</p>
            </div>
            <div>
            <button
                type="submit"
                className="w-full transition-bg duration-200 bg-zinc-800 text-white border-2 border-white py-3 px-4 rounded-full hover:bg-zinc-900"
            >
                {loading? 
                <span className='flex items-center text-center justify-center gap-2'>
                    <PacmanLoader size={10} color="#b736d6" />
                </span> 
                :"Login"}
            </button>
            </div>
        </form>
        </div>
    </div>
    );
};


export default Login
