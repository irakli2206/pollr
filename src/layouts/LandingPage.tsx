import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const LandingPage = () => {
    return (
        <main className='flex flex-col min-h-screen'>
            <Navbar />
            <Outlet />
        </main>
    )
}

export default LandingPage