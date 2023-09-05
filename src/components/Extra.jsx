"use client"
import {AiOutlineSearch} from 'react-icons/ai'
import { IArticle} from '@/app/page'
import News from './News'
import { IUser } from '@/app/page'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'

export default function Extra({data , user}) {
  const [newsPost , setNewsPost] = useState(4)
  const [numberOfUser , setNumberOfUser] = useState(5)
   const {data :session} = useSession();

  return (
    <div className="xl:w-[600px] bg-black hidden lg:inline pl-8 space-y-5">
      {session && 
      (<>
        <div className="w-[90%] xl:w-[75%] sticky top-0 py-1.5 z-50">
            <div className="flex items-center p-3 rounded-full bg-red-300 relative">
                <AiOutlineSearch className="h-5 z-50 text-gray-500"/>
                <input className="absolute inset-0 rounded-full pl-11 border-gray-500 text-white focus:shadow-lg  bg-[#16181C] " type="text" placeholder="Search" />
            </div>
        </div>
        <div className="text-white  bg-[#16181C] space-y-3 rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">What&apos;s happening</h4>
        {data?.slice(0,newsPost)?.map((x) => (
            <News key={x.title} article={x} />
        ))}
        <button
        onClick={() => setNewsPost((prev) =>  prev + 2)}
        className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
        >
          Show More
        </button>
        </div></>)}
        {/* when not login */}
{!session && (
<div className="border border-gray-300 mt-4 pt-2 rounded-xl w-[90%] xl:w-[75%] p-4 ">
  <h1 className="text-xl font-semibold mb-2">New to X?</h1>
  <p className="text-white mb-2">Sign up now to get your own personalized timeline!</p>
  <button
    onClick={() => signIn("google")}
    className="bg-slate-800 text-white py-2 px-4 rounded-full flex items-center hover:bg-blue-600 transition duration-300 mb-2"
  >
    <div className="mr-2">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        alt="Google Logo"
        className="w-6 h-6"
      />
    </div>
    <div>Sign In with Google</div>
  </button>
  <p className="text-white">
    By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
  </p>
</div>)}


        <div className="sticky top-16 text-gray-700 space-y-3 bg-[#16181C] pt-2 rounded-xl w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-white text-xl px-4">You might like</h4>
        {user?.slice(0,numberOfUser)?.map((x) => (
          <div
          key={x.login.username}
          className="flex items-center text-white px-4 py-2  cursor-pointer hover:bg-slate-800"
        >
          <img
            className="rounded-full"
            width="40"
            src={x.picture.thumbnail}
            alt=""
          />
          <div className="truncate ml-4 leading-5">
            <h4 className="font-bold hover:underline text-[14px] truncate">
              {x.login.username}
            </h4>
            <h5 className="text-[13px] text-gray-500 truncate">
              {x.name.first + " " + x.name.last}
            </h5>
          </div>
          <button className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold">
            Follow
          </button>
        </div>
        ))}
        </div>
        <button
        onClick={() =>  setNumberOfUser((prev) =>  prev + 2)}
        className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
        >
          Show More
        </button>
    </div>
  )
}
