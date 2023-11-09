import React from 'react'
import { docType } from './Home'
import { Trash } from '@phosphor-icons/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const DocIcon = ({ title, id }: docType) => {
  const { push } = useRouter()
  
  const deleteDoc = () => {
    axios.post("/api/removeDoc", {
      id: id,
    })
  }
  
  
  return (
    <div className='flex bg-primary items-center justify-center px-2'>
      <button className='p-2 flex flex-col relative items-start w-full' onClick={() => push(`/doc/${id}`)}>
        <p className='text-xl'>{title}</p>
      </button>
      <button onClick={() => {confirm(`are you sure you want to remove ${title}?`) && deleteDoc(); window.location.reload()}} className='z-10'>
        <Trash size={32} />
      </button>
    </div>
  )
}

export default DocIcon