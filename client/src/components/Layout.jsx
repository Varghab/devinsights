import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import UserProvider from '../store/UserContext'


const Layout = () => {

    return (
        <UserProvider>
        <div className='bg-neutral-100 relative'>
            <Navbar />
                <Outlet />
            <Footer />
        </div>
        </UserProvider>
    )
}

export default Layout
