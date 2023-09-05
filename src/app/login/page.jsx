"use client";
import React from 'react';
import {signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';


const Login = () => {
  const {data} = useSession();
  console.log(data)
  return (
    <div className='flex flex-col bg-black h-screen items-center'>
      <img
        className='w-24 mt-16 mb-8'
        src='https://cdn.geekwire.com/wp-content/uploads/2023/07/xlogo-300x300.jpeg'
        alt='Logo'
      />
      <div className='bg-white p-8 rounded-lg shadow-md text-center'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>
          Sign in to X
        </h1>
        <button
        onClick={() => signIn("google")}
         className="bg-slate-400 text-white py-2 px-4 rounded-full flex items-center hover:bg-blue-600 transition duration-300">
          <div className="mr-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google Logo"
              className="w-6 h-6"
            />
          </div>
          <div>Sign In with Google</div>
        </button>
        <Link href='/'>
        <button className='text-black'>home</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
