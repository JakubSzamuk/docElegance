'use client'
import React, { useEffect } from 'react'
import DocIcon from './DocIcon'
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const Home = () => {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login")
    }
  }, [session])

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='flex flex-col gap-8'>
        <div className='flex gap-8'>
          <div className='flex flex-col gap-8'>
            <div className='p-8 text-white bg-primary mono text-4xl'>
              <p>Doc Elegance</p>
            </div>
            <div className='p-8 bg-primary flex flex-col justify-center'>
              <DocIcon />
            </div>
          </div>
          <div className='flex flex-col'>

          </div>
        </div>
        <div>

        </div>
      </div>
      <button onClick={() => signOut()}>SIGNOUT</button>
    </div>
  )
}

export default Home
