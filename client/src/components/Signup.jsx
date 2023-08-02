import React, { useContext, useState } from 'react';
import { userContext } from '../store/UserContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const userCtx = useContext(userContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
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
    userCtx.handleSignup(formData)
    // navigate('/');
    setFormData({
        name: '',
        email: '',
        password: '',
        });
    };

    if(userCtx.isLogin) {
        navigate('/')
    }

    return (
    <div className=''>
        <div className="flex justify-center items-center p-8">
        <form className="w-96 space-y-6 bg-zinc-800 px-8 pt-14 pb-10 text-white rounded-xl" onSubmit={handleSubmit}>
            <h1 className='text-2xl md:text-3xl'>Create your account</h1>
            <div>
            <label htmlFor="name" className="block">
                Name
            </label>
            <input
                id="name"
                type="text"
                className="mt-1 block w-full border-gray-300 text-black outline-none px-2 py-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            </div>
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
                <p className={`${userCtx.signinMessage === "Something went wrong!"?'text-red-400':'text-green-400'}`}>{userCtx.signinMessage}</p>
            </div>
            <div>
            <button
                type="submit"
                className="w-full  transition-bg duration-200 bg-zinc-800 text-white border-2 border-white py-3 px-4 rounded-full hover:bg-zinc-900"
            >
                Sign Up
            </button>
            </div>
        </form>
        </div>
    </div>
  );
};

export default Signup;