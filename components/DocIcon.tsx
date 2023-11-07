import React from 'react'
import { docType } from './Home'
import { Trash } from '@phosphor-icons/react'
import axios from 'axios'
import { redirect } from 'next/navigation'

const DocIcon = ({ title, id }: docType) => {
  const deleteDoc = () => {
    axios.post("/api/removeDoc", {
      id: id,
    })
  }
  
  
  return (
    <button className='p-2 bg-primary flex flex-col relative items-start' onClick={() => redirect(`/doc/${id}`)}>
      <p className='text-xl'>{title}</p>
      <button onClick={() => {confirm(`are you sure you want to remove ${title}?`) && deleteDoc()}} className='self-end -mt-5 z-10'>
        <Trash size={32} />
      </button>
    </button>
  )
}

export default DocIcon