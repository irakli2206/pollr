import React from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { LightButton, Spinner } from '../../../components/Elements'
import { getFriendlyDate } from '../../../util/time'
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";

type ChartItemT = {
    optionName: string
    votes: number
}

const PollDetails = () => {
    const loaderData: any = useLoaderData()
    console.log(loaderData)

    // const exampleData = [
    //     {
    //         name: "Page A",
    //         uv: 4000,
    //         amt: 2400
    //     },
    //     {
    //         name: "Page B",
    //         uv: 3000,
    //         amt: 2210
    //     },

    // ];

    const createChartData = (data: any) => {
        let votesData = data.votes.documents
        let chartData: ChartItemT[] = []

        data.options.documents.forEach((option: any) => chartData.push({optionName: option.description, votes: 0}))

        for (let i = 0; i < votesData.length; i++) {

            let ind = chartData.findIndex(item => item.optionName === votesData[i].option.description)
            chartData[ind].votes++

        }

        return chartData
    }


    return (
        <div className='w-full'>

            <Await
                resolve={loaderData.result}
                errorElement={
                    <p>Error!</p>
                }
            >
                {(data) => {
                    let chartData = createChartData(data)
                    console.log(chartData)
                    return <div className='flex flex-col'>
                        <div className="px-4 sm:px-0">
                            <h3 className="text-3xl font-semibold leading-7 text-gray-900">{data.question}</h3>
                            <div className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Poll created by <span className='text-black font-semibold'>{data.owner.name}</span> on {getFriendlyDate(data.timestamp)}</div>
                        </div>

                        <ResponsiveContainer height={300} style={{ marginTop: 50 }}>
                            <BarChart layout='vertical' margin={{ top: 0, right: 0, left: 0, bottom: 0 }} barCategoryGap={2} data={chartData} >
                                <XAxis type="number" allowDecimals={false} />
                                <YAxis type="category" dataKey="optionName" tickLine={false} fontSize={20} fontWeight={700} />
                                <Bar layout='vertical' dataKey="votes" fill="#27272a" />

                            </BarChart>
                        </ResponsiveContainer>
                        {/* <LightButton  >Go Back</LightButton> */}
                    </div>
                }}
            </Await>

        </div>
    )
}

export default PollDetails