import React, { Children, ReactNode, Suspense } from 'react'
import { Spinner } from './Elements'

type Props = {
    children: ReactNode
}

const DashboardOutletWrapper = ({ children }: Props) => {
    return (
        <div className='p-8 bg-gray-50 w-full h-full'>
            <Suspense fallback={<Spinner />}>
                {children}
            </Suspense>
        </div>
    )
}

export default DashboardOutletWrapper