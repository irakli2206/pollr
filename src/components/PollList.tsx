import classNames from 'classnames'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Await, defer, json, useLoaderData, useNavigate } from 'react-router-dom'
import moment from 'moment';
import Appwrite from '../services/Appwrite';
import { LightButton, Spinner } from './Elements';
import { Models } from 'appwrite';
import { getFriendlyDate } from '../util/time';


type PollT = {
    $id?: string
    question: string
    votes: number
    status: 'Active' | 'Closed',
    timestamp?: string
}

type PollListProps = {
    user: Models.Document | undefined
}

const PollList = ({user}: PollListProps) => {
    

    const data: any = useLoaderData()
    const navigate = useNavigate()

    const gotoPoll = (url: string) => {
        console.log(url)
        navigate(url)
    }

    return (
        <ul role="list" className="divide-y divide-gray-200">
            <Await
                resolve={data.result}
                errorElement={
                    <p>Error!</p>
                }
            >
                {(data) => {
                    return user && [...data.documents].map((poll) => {
                        console.log(poll)
                        console.log(user)
                        const isMyPoll = poll.owner.email === user.email
                        const destinationPath = isMyPoll ? poll.$id : poll.$id + '/vote'
                        return (
                            <li key={poll.question} className="flex justify-between items-center gap-x-6 py-5">
                                <div className="flex min-w-0 gap-x-4">
                                    {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" /> */}
                                    <div className="min-w-0 flex-auto">
                                        <div className="text-sm font-semibold leading-6 text-gray-900 flex gap-4">
                                            {poll.question}

                                        </div>
                                        <div className="mt-1 truncate text-xs leading-5 text-gray-500 flex items-center gap-2">
                                            Created on {getFriendlyDate(poll.timestamp)} <div className="w-0.5 h-0.5 rounded-full bg-gray-500"></div> {poll.votes || 0} votes
                                            <div className="ml-2  flex justify-center items-center gap-x-1.5 ">
                                                <div className="relative flex items-center justify-center">
                                                    <div className={classNames("flex-none rounded-full absolute animate-ping  bg-emerald-500/50 p-1", {
                                                        "!bg-red-500/50": poll.status === 'Closed'
                                                    })} />

                                                    <div className={classNames("h-1.5 w-1.5 rounded-full bg-emerald-500", {
                                                        "!bg-red-500": poll.status === 'Closed'
                                                    })} />

                                                </div>

                                                <p className="text-xs leading-5 text-gray-500">{poll.status}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <LightButton size='sm' className='!rounded-full ' onClick={() => gotoPoll(destinationPath)}
                                        variant={isMyPoll ? "normal" : "info"}
                                    >{isMyPoll ? "View" : "Vote"}</LightButton>

                                </div>
                            </li>
                        )
                    })
                }}

            </Await>
        </ul>
    )
}

export default PollList