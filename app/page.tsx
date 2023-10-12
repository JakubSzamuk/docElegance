import DocIcon from '@/components/DocIcon'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='flex flex-col gap-8'>
        <div className='flex gap-8'>
          <div className='flex flex-col gap-8'>
            <div className='p-8 text-white bg-primary mono text-4xl'>
              <p>Doc Elegance in </p>
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
    </div>
  )
}
