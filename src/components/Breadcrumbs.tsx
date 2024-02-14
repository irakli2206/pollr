import React from 'react'
import { Link, Pathname, useLocation, useMatches } from 'react-router-dom';
import { MdHome } from "react-icons/md";
import classNames from 'classnames';

type Crumb = {
    label: string
    path: Pathname
}

const Breadcrumbs = () => {
    //Custom implementation
    let location = useLocation()
    let path = location.pathname

    let splitPaths = path.split('/').slice(1) //Slice 1 because first dash has nothing in front, ex. /dashboard/poll
    let crumbs: Crumb[] = []
    for (let i = 0; i < splitPaths.length; i++) {
        //Means we are viewing the poll
        if (splitPaths[i - 1] === 'poll' && !splitPaths.includes('edit')) {
            console.log('hi')
            crumbs.push({ label: "Poll Details", path: `/${splitPaths.slice(0, i + 1).join('/')}` })
            continue //So not to duplicate this crumb
        }

        crumbs.push({ label: splitPaths[i][0].toUpperCase() + splitPaths[i].slice(1), path: `/${splitPaths.slice(0, i + 1).join('/')}` })
    }

    console.log(crumbs)


    // Method that doesn't work without nesting in a retarded way, waiting for reply from RRD team

    // let matches = useMatches();
    // console.log(matches)
    // let crumbs = matches
    //     // first get rid of any matches that don't have handle and crumb
    //     .filter((match: any) => Boolean(match.handle?.crumb))
    //     // now map them into an array of elements, passing the loader
    //     // data to each one
    //     .map((match: any) => match.handle.crumb(match.data));


    console.log(crumbs)
    return (
        <>
            {/* {Boolean(crumbs.length) && <nav className="flex w-fit px-5 mb-4  text-gray-700 border border-gray-200  rounded-md bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse ">
                    {crumbs.map((crumb, index) => (
                        <li key={index} aria-current="page">
                            <div className="flex items-center">
                                <svg className="h-full w-6 text-gray-200" viewBox="0 0 24 44" preserveAspectRatio="none" fill="currentColor" aria-hidden="true"><path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z"></path></svg>

                                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">{crumb}</span>
                            </div>
                        </li>
                    ))}


                </ol>
            </nav>} */}
            {crumbs.length > 1 && <nav className="flex w-fit px-5 mb-4  text-gray-700 border border-gray-200  rounded-md bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse ">
                    {crumbs.map((crumb, index) => (
                        <li key={index} aria-current="page">
                            <div className="flex items-center">
                                {crumb.label === 'Dashboard' ?
                                    <MdHome size={20} className='text-gray-400' />
                                    :
                                    <svg className="h-full w-6 text-gray-200" viewBox="0 0 24 44" preserveAspectRatio="none" fill="currentColor" aria-hidden="true"><path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z"></path></svg>
                                }

                                <Link to={crumb.path} className={classNames("ms-1 text-sm font-medium text-gray-400 hover:text-gray-600 md:ms-2  transition", {
                                    "!text-gray-600 !font-bold": crumbs.length - 1 === index //If last
                                })}>{crumb.label}</Link>
                            </div>
                        </li>
                    ))}


                </ol>
            </nav>}
        </>
    )
}

export default Breadcrumbs