import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../components/DashboardSidebar'
import DashboardOutletWrapper from '../components/DashboardOutletWrapper'
// import DashboardBreadcrumbs, { DashboardBreadcrumbsT } from '../components/DashboardBreadcrumbs'
import { BiPoll, BiUser } from "react-icons/bi";
import Breadcrumbs from '../components/Breadcrumbs'

const Dashboard = () => {


    return (
        <div className='flex h-full '>
            <DashboardSidebar />

            <DashboardWithBreadcrumbs />

        </div>
    )
}

const DashboardWithBreadcrumbs = () => {

    return (
        <div className='p-8 bg-gray-50 w-full '>
            <Breadcrumbs />
            <DashboardOutletWrapper>

                <Outlet />
            </DashboardOutletWrapper>
        </div>
    )
}

export default Dashboard