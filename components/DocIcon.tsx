'use client'
import React from 'react'
import { docType } from './Home'
import { Trash } from '@phosphor-icons/react'
import axios from 'axios'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

const DocIcon = ({ title, id }: docType) => {
  const { push } = useRouter()
  
  const deleteDoc = () => {
    axios.post("/api/removeDoc", {
      id: id,
    })
  }
  
  
  return (
    <div className='flex-col'>
      <button onClick={() => push(`/doc/${id}`)}>
        
      </button>
      <div className='flex'>
        <button onClick={() => push(`/doc/${id}`)}  className='text-xl'>{title}</button>
        <button onClick={() => {confirm(`are you sure you want to remove ${title}?`) && deleteDoc()}} className='self-end -mt-5 z-10 justify-self-end'>
          <Trash size={32} />
        </button>
      </div>
    </div>
  )
}

export default DocIcon