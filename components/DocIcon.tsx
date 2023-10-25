import React from 'react'
import { docType } from './Home'
import { Trash } from '@phosphor-icons/react'
import axios from 'axios'

const DocIcon = ({ title, id }: docType) => {
  const deleteDoc = () => {
    axios.post("/api/deleteDoc", {
      id: id,
    })
  }
  
  
  return (
    <a href={`/doc/${id}`} className='p-2 bg-primary flex flex-col relative'>
      <p className='text-xl'>{title}</p>
      <button onClick={() => deleteDoc()} className='self-end -mt-5 z-10'>
        <Trash size={32} />
      </button>
    </a>
  )
}

export default DocIcon