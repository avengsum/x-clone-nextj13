'use client'
import Image from "next/image"
import SideMenu from "./SideMenu"
import {AiOutlineHome} from 'react-icons/ai'
import {CiCircleMore} from 'react-icons/ci'
import {CgProfile} from 'react-icons/cg'
import {IoPeopleSharp} from 'react-icons/io5'
import {HiClipboardList} from 'react-icons/hi'
import {AiOutlineMessage} from 'react-icons/ai'
import {AiOutlineSearch} from 'react-icons/ai'
import {GrNotification} from 'react-icons/gr'
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"


const Nav = () => {
  const {data: session}  = useSession()
  const [username , setUsername] = useState()
  useEffect(() => {
    setUsername(session?.user?.name?.split(' ').join('').toLowerCase());
  },[username])

  return (
    <div className="hidden bg-black sm:flex text-white flex-col p-2 xl:items-start fixed h-full">
        <div className="hoverEffect p-0 hover:bg-blue-100 xl:px">
            <Image 
            width="50"
            height="50"
            src="https://cdn.geekwire.com/wp-content/uploads/2023/07/xlogo-300x300.jpeg"
            alt="logo"
            ></Image>
        </div>
        <div className="mt-4 mb-2.5 text-white xl:items-start ">
          <Link href='/login'><SideMenu text="Home" Icon={AiOutlineHome} active={true} /></Link>
          { session && (<>
          <SideMenu text="Explore" Icon={AiOutlineSearch} /> 
          <SideMenu text="Notification"  Icon={GrNotification} /> 
          <SideMenu text="Message" Icon={AiOutlineMessage} /> 
          <SideMenu text="List" Icon={HiClipboardList} /> 
          <SideMenu text="Community" Icon={IoPeopleSharp} /> 
          <SideMenu text="Profile" Icon={CgProfile} /> 
          <SideMenu text="More" Icon={CiCircleMore} /> 

        
        <button  className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
          Post
        </button> </>)}
        </div>
        {session && (
        <div className="hoverEffect text-white flex items-center justify-center xl:justify-start mt-auto">
            <img
              onClick={() => signOut}
              src={session?.user?.image}
              alt="user-img"
              className="h-10 w-10 rounded-full xl:mr-2"
            />
            <div className="leading-5 hidden xl:inline">
              <h4 className="font-bold">{session?.user?.name}</h4>
              <p className="text-gray-500">@{username}</p>
            </div>
            <BiDotsHorizontalRounded className="h-5 xl:ml-8 hidden xl:inline" />
          </div>)
}
    </div>
  )
}

export default Nav