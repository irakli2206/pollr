import React, { useEffect, useState } from 'react'
import { Button, LightButton, Spinner } from '../../components/Elements'
import { useNavigate } from 'react-router-dom'
import PollList from '../../components/PollList'
import { Models } from 'appwrite'
import Appwrite from '../../services/Appwrite'


const appwrite = new Appwrite()


const Polls = () => {
  const [user, setUser] = useState<Models.Document | undefined>()

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await appwrite.getCurrentAuthUser()
      setUser(currentUser as any)
    }

    getUser()
  }, [])

  let navigate = useNavigate()

  const gotoCreatePoll = () => {
    navigate("create-poll")
  }


  return (
    <div className='h-full w-full'>
      <React.Suspense
        fallback={<Spinner />}

      >
        {/* <Spinner /> */}
        <PollList user={user} />
        <LightButton className='mt-2' title='Create Poll' onClick={gotoCreatePoll} />
      </React.Suspense>
    </div>
  )
}

export default Polls