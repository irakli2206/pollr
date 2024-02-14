import React, { useState } from 'react'
import { Await, useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getFriendlyDate } from '../../../util/time'
import { LightButton } from '../../../components/Elements'
import Appwrite from '../../../services/Appwrite'

const appwrite = new Appwrite()

const MakeVote = () => {
  const [selectedOption, setSelectedOption] = useState<any | null>(null)

  const loaderData: any = useLoaderData()
  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()

  console.log(params)
  const path = location.pathname

  const handleVote = async () => {
    const currentUser = await appwrite.getCurrentUser()

    appwrite.makeVote({
      optionID: selectedOption.$id!,
      pollID: params.pollID as string,
      userID: currentUser.$id
    })

    const destinationPath = path.slice(0, path.lastIndexOf('/'))

    //Goes to poll details
    navigate(destinationPath)
  }

  return (
    <div className='flex justify-center'>
      <Await
        resolve={loaderData.result}
        errorElement={
          <p>Error!</p>
        }
      >
        {(data) => {
          console.log(data)
          return (
            <div className='flex flex-col'>
              <div className="px-4 sm:px-0">
                <h3 className="text-3xl font-semibold leading-7 text-gray-900">{data.question}</h3>
                <div className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Poll created by <span className='text-black font-semibold'>{data.owner.name}</span> on {getFriendlyDate(data.timestamp)}</div>
              </div>


              <fieldset className="flex flex-col gap-6 my-8">
                {data.options.map((option: any) => {

                  return (
                    <div key={option.description} className="flex items-center gap-2">
                      <input id={option.description} type="radio" name={option.description}
                        onChange={(e) => setSelectedOption(e.target.checked && option)} checked={selectedOption && (selectedOption.description === option.description)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor={option.description} className="ms-2 text-xl  text-gray-900 dark:text-gray-300">{option.description}</label>
                    </div>
                  )
                })}
              </fieldset>


              <LightButton onClick={handleVote} variant='info' disabled={!selectedOption}  >Vote</LightButton>
            </div>
          )
        }}

      </Await>
    </div>
  )
}

export default MakeVote