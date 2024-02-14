import React from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { LightButton, Spinner } from '../../../components/Elements'
import { getFriendlyDate } from '../../../util/time'

const PollDetails = () => {
    const loaderData: any = useLoaderData()
    console.log(loaderData)
    return (
        <div className='h-full w-full'>

            <Await
                resolve={loaderData.result}
                errorElement={
                    <p>Error!</p>
                }
            >
                {(data) => {
                    console.log(data)
                    return <div className='flex flex-col'>
                        <div className="px-4 sm:px-0">
                            <h3 className="text-3xl font-semibold leading-7 text-gray-900">{data.question}</h3>
                            <div className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Poll created by <span className='text-black font-semibold'>{data.owner.name}</span> on {getFriendlyDate(data.timestamp)}</div>
                        </div>

 


                        {/* <LightButton  >Go Back</LightButton> */}
                    </div>
                }}
            </Await>

        </div>
    )
}

export default PollDetails