"use client"
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

const Providers = (props ) => {
  return (
    <SessionProvider>{props.children}</SessionProvider>
  )
}

export default Providers