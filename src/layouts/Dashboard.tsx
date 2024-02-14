import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../components/DashboardSidebar'
import DashboardOutletWrapper from '../components/DashboardOutletWrapper'
import DashboardBreadcrumbs, { DashboardBreadcrumbsT } from '../components/DashboardBreadcrumbs'
import { BiPoll, BiUser } from "react-icons/bi";
import Breadcrumbs from '../components/Breadcrumbs'

const Dashboard = () => {
    const [breadcrumbs, setBreadcrumbs] = useState<DashboardBreadcrumbsT>({
        polls: {
            label: "Polls",
            path: '/dashboard',
            icon: <BiPoll />,
            children: [
                {
                    label: "Poll Details",
                    path: "/dashboard/:pollID",
                    active: false,
                    children: [
                        {
                            label: "Poll Vote",
                            path: "/dashboard/:pollID/vote",
                            active: true
                        }
                    ]
                },

            ]
        }
    })

    return (
        <div className='flex h-screen'>
            <DashboardSidebar />
            <DashboardOutletWrapper>
                {/* <DashboardBreadcrumbs breadcrumbs={breadcrumbs} /> */}
                <Breadcrumbs />
                <Outlet />
            </DashboardOutletWrapper>

        </div>
    )
}

export default Dashboard