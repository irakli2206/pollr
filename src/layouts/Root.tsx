import React, { Suspense, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { OverlaySpinner } from '../components/Elements'
import Appwrite from '../services/Appwrite'

let appwrite = new Appwrite()
const Root = () => {

    useEffect(() => {
        const getCurrentSession = async() => {
            
            let currentSession = await appwrite.checkSessionExists()
            console.log(currentSession)
        }
        getCurrentSession()
    }, [])
    return (
        <main className='flex flex-col min-h-screen'>
            <Suspense fallback={<OverlaySpinner />}>
                <Outlet />
            </Suspense>
        </main>
    )
}

export default Root