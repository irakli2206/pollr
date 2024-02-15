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
    user?: Models.Document | undefined
}

const PollList = ({ user }: PollListProps) => {


    const data: any = useLoaderData()
    const navigate = useNavigate()

    const gotoPoll = (url: string) => {
        navigate(url)
    }

    const showVoteTooltip = (show: boolean) => {

    }

    return (
        <ul role="list" className="divide-y divide-gray-200 w-full">
            <Await
                resolve={data.result}
                errorElement={
                    <p>Error!</p>
                }
            >
                {(data) => {
                    let allPolls = data[0]
                    let votablePolls = data[1]
                    let votablePollIDs = votablePolls.map((poll: any) => poll.$id)
                    let user = data[2]
                    console.log(data)
                    return user && [...allPolls, ...allPolls].map((poll) => {
                        console.log(poll)
                        // console.log(user)
                        let votesCount = 0
                        for (let i = 0; i < poll.options.length; i++) {
                            votesCount += poll.options[i].votes.length
                        }
                        const isVotablePoll = votablePolls.length ? votablePollIDs.includes(poll.$id) : false
                        const destinationPath = isVotablePoll ? poll.$id + '/vote' : poll.$id
                        return (
                            <li key={poll.question} className="flex group justify-between items-center gap-x-6  cursor-pointer rounded-md relative z-10 " onClick={() => gotoPoll(destinationPath)}>
                                {/* This is just an empty div so that we can click on the entire li and switch to poll details but also be able to hover on Vote button without triggering li */}
                                <div className="absolute z-10 w-full h-full  transition group-hover:bg-gray-100"></div>

                                <div className="py-5 px-5 flex justify-between w-full relative z-20 bg-transparent">
                                    <div className="flex min-w-0 gap-x-4">
                                        {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" /> */}
                                        <div className="min-w-0 flex-auto">
                                            <div className="text-sm font-semibold leading-6 text-gray-900 flex gap-4">
                                                {poll.question}

                                            </div>
                                            <div className="mt-1 truncate text-xs leading-5 text-gray-500 flex items-center gap-2">
                                                Created on {getFriendlyDate(poll.timestamp)} <div className="w-0.5 h-0.5 rounded-full bg-gray-500"></div> {votesCount || 0} votes
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
                                    <div className=" shrink-0 sm:flex sm:flex-col sm:items-end relative z-50">
                                        {/* <LightButton size='sm' className='!rounded-full ' onClick={() => gotoPoll(destinationPath)}
                                        variant={isVotablePoll ? "info" : "normal"}
                                    >{isVotablePoll ? "Vote" : "View"}</LightButton> */}


                                        <div className="group/button relative">
                                            <div className={classNames("absolute pointer-events-none z-30 opacity-0 transition  bottom-[110%] right-0 text-gray-200   rounded-md shadow-md bg-zinc-800 px-2 py-1 min-w-52 max-w-52 flex", {
                                                "group-hover/button:opacity-100": !isVotablePoll
                                            })}>
                                                <p>You have already voted in this poll</p>

                                            </div>
                                            <LightButton disabled={!isVotablePoll} size='sm' variant='info' className="!rounded-full peer">
                                                Vote
                                            </LightButton>
                                        </div>
                                    </div>
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