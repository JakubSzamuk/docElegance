'use client'
import { useState } from 'react'

const Loading = () => {
  const [loadingText, setLoadingText] = useState<string>('.')
  setTimeout(() => {
    loadingText.length < 3 ? setLoadingText(loadingText + '.') : setLoadingText('')
  }, 300)
  
  return (
    <div className='absolute w-full h-full top-0 flex justify-center items-center'>
      <div className='p-8 text-xl text-white textFont bg-primary flex w-64 justify-center'>
        <p>Loading{loadingText}</p>
      </div>
    </div>
  )
}

export default Loading