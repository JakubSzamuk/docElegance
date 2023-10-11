'use client'
import { GoogleLogo } from '@phosphor-icons/react'
import React from 'react'



const Login = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center relative'>
      <div className='flex flex-col mono gap-4 p-16 text-white text-4xl bg-primary rounded-md z-10'>
        <h1 className='text-5xl -ml-4'>Time to Login....</h1>
        <button className='p-4 bg-primary rounded-md flex gap-2 items-center'><GoogleLogo size={32} color='#fff' />Login With Google</button>
      </div>
      <img src='/orb1.svg' draggable='false' className='absolute w-2/5 -top-32 left-64' />
      <img src='/orb2.svg' draggable='false' className='absolute w-2/5 -bottom-32 right-16' />
    </div>
  )
}

export default Login
