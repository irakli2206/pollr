import React, { Children, ReactNode, Suspense } from 'react'
import { Spinner } from './Elements'

type Props = {
    children: ReactNode
}

const DashboardOutletWrapper = ({ children }: Props) => {
    return (
        <div className='py-4 bg-gray-50 w-full '>
            <Suspense fallback={<Spinner />}>
                {children}
            </Suspense>
        </div>
    )
}

export default DashboardOutletWrapper