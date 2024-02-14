import React from 'react'
import { useMatches } from 'react-router-dom';

const Breadcrumbs = () => {
    let matches = useMatches();
    console.log(matches)
    let crumbs = matches
        // first get rid of any matches that don't have handle and crumb
        .filter((match: any) => Boolean(match.handle?.crumb))
        // now map them into an array of elements, passing the loader
        // data to each one
        .map((match: any) => match.handle.crumb(match.data));


    console.log(crumbs)
    return (

        <nav className="flex w-fit px-5  text-gray-700 border border-gray-200  rounded-md bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
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
        </nav>
    )
}

export default Breadcrumbs