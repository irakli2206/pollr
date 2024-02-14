import classNames from 'classnames';
import React, { Fragment } from 'react'
import { BiPoll, BiUser } from "react-icons/bi";
import { Link, useLocation, useMatch, useMatches, useNavigate } from 'react-router-dom';
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { Popover, Transition } from '@headlessui/react';
import { TbLogout } from "react-icons/tb";
import Appwrite from '../services/Appwrite';
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const DashboardSidebar = () => {
  const navigate = useNavigate()

  const menuItems = [
    {
      icon: <BiPoll size={20} />,
      text: "Poll",
      path: "/dashboard/poll"
    },
    {
      icon: <BiUser size={20} />,
      text: "Account",
      path: "/dashboard/account"
    },
  ]

  const logout = async () => {
    let appwrite = new Appwrite()
    await appwrite.logoutUser()
      .then(() => navigate("/login"))
      .catch(e => console.log(e))
  }

  const userActions = [
    {
      name: "Logout",
      action: logout,
      icon: <TbLogout />

    }
  ]

  return (
    <nav className='flex flex-col border-r border-r-gray-200 h-full w-full max-w-72'>
      <header className="flex p-4 px-10 justify-between border-b relative border-b-gray-200">
        <div className="flex gap-3 items-center">
          <div className="w-8 h-8 bg-black rounded-md"></div>
          <h1 className='text-black text-lg font-bold '>Pollr</h1>
        </div>

        <button className="absolute w-6 h-6 right-0 bottom-0 translate-y-1/2 translate-x-1/2 z-50 bg-white rounded-full border text-gray-600 border-gray-300 flex items-center justify-center">
          <HiChevronLeft   />
        </button>
      </header>
      <main className='p-4 px-8 text-sm flex flex-col gap-2'>
        {menuItems.map(item => {
          let location = useLocation()
          const match = location.pathname.includes(item.path)
          return (
            <Link key={item.text} to={item.path} replace className={classNames('flex text-slate-600 items-center gap-3 font-medium cursor-pointer hover:bg-gray-100  transition duration-100 p-2 rounded-md', {
              "!text-slate-600 !bg-gray-100": match
            })}>
              {item.icon}
              <p>{item.text}</p>
            </Link>
          )
        })}
      </main>
      <footer className='flex gap-4 justify-self-end items-center mt-auto p-4 px-8'>
        {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfScpb-l06z02VcoVBrHc33PyhU04Y4xqVGqGzlwDBq6kPxjfA5G7KWWmu0yBZ8_B-hmg&usqp=CAU" alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col font-medium justify-between">
          <p className='font-bold'>Irakli Begoidze</p>
          <p className='text-gray-500 text-sm'>i.begoidze@2gdev.com</p>
        </div> */}

        {/* <div className='text-gray-700 ml-auto cursor-pointer hover:bg-gray-200 rounded-full p-1 transition'>
          <PiDotsThreeVerticalBold size={24} />
        </div> */}
        {/* <Popover.Group className="hidden ml-auto lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 ">
              <div className='text-gray-500 cursor-pointer hover:bg-gray-200 rounded-full p-1 transition'>
                <PiDotsThreeVerticalBold size={24} />
              </div>
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 bottom-full z-10 mb-3 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-2 cursor-pointer">
                  {userActions.map((item) => (
                    <div
                      onClick={async () => await item.action()}
                      key={item.name}
                      className="group text-slate-600 relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-100"
                    >

                      {item.name}
                      {item.icon}
                    </div>
                  ))}
                </div>

              </Popover.Panel>
            </Transition>
          </Popover>


        </Popover.Group> */}
        <button onClick={logout} className={classNames('flex w-full text-slate-600 items-center gap-3 font-medium cursor-pointer hover:bg-gray-100  transition duration-100 p-2 rounded-md', {

        })}>
          <TbLogout />
          <p>Logout</p>
        </button>
      </footer>
    </nav>
  )
}

export default DashboardSidebar