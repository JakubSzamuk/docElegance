'use client'
import React, { useEffect, useState } from 'react'
import DocIcon from './DocIcon'
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { PlusSquare, SignOut } from '@phosphor-icons/react'

export type docType = {
  title: string,
  id: string,
  body?: string,
  uid?: string
}

type userData = {
  docs: docType[],
  account: {
    image: string,
    email: string,
    name: string,
    id: string,
    emailVerified: boolean,
  }
}

const Home = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  const [userData, setUserData] = useState<userData>()

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login")
    }
  }, [session])

  const createFile = async () => {
    await axios.post("/api/fetchdoc", {}).then(data => push(`/doc/${data.data.documentId}`))
  }

  const fetchFileData = async () => {
    await axios.post("/api/fetchUserData", {}).then(data => setUserData(data.data))
  }
  console.log(userData)

  useEffect(() => {
    fetchFileData()
  }, [])

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='flex flex-col gap-8'>
        <div className='flex gap-8'>
          <div className='flex flex-col gap-8'>
            <div className='p-8 text-white bg-primary mono text-4xl h-24'>
              <p>Doc Elegance</p>
            </div>
            <div className='p-8 bg-primary flex flex-col justify-center gap-4'>
              {userData && userData.docs.map((doc: docType) => <DocIcon title={doc.title} id={doc.id} />)}
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='p-8 text-white flex bg-primary mono text-4xl gap-4 h-24 justify-center items-center'>
              <div className='rounded-lg overflow-hidden flex justify-center items-center h-12 aspect-square'>
                {userData && <img src={userData.account.image} />}
              </div>
              <button onClick={() => signOut()}><SignOut /></button>

              <button onClick={() => createFile()} className='ml-16'>
                <PlusSquare size={72} color='#fff' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
