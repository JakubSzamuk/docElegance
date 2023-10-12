'use client'
import { ArrowSquareDown, ArrowSquareIn, Check, Clipboard, FloppyDisk } from '@phosphor-icons/react'
import Markdown from 'marked-react'
import React, { useState } from 'react'
import { useAnimationControls, motion } from 'framer-motion'

const page = () => {
  const [textContent, setTextContent] = useState('')
  const [titleContent, setTitleContent] = useState('Untitled')

  const clipboardControls = useAnimationControls()


  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='flex flex-col text-white mono p-12 bg-primary rounded-md'>
        <div className='relative flex w-full text-5xl items-center'>
          <input value={titleContent} onChange={(e) => setTitleContent(e.target.value)} />
          <div className='p-2 flex items-center gap-2 rounded-md bg-primary'>
            <button className='p-2' onClick={() => {navigator.clipboard.writeText(textContent); clipboardControls.start("check"); setTimeout(() => {
              clipboardControls.start("initial")
            }, 2000);}}>
              <motion.div
                className='absolute'
                animate={clipboardControls}
                variants={{
                  initial: {
                    rotate: 0,
                    opacity: 1
                  },
                  check: {
                    rotate: 360,
                    opacity: 0
                  }
                }}
                initial="initial"
              >
                <Clipboard />
              </motion.div>
              <motion.div
                animate={clipboardControls}
                variants={{
                  initial: {
                    rotate: 0,
                    opacity: 0
                  },
                  check: {
                    rotate: 360,
                    opacity: 1
                  }
                }}
                initial="initial"
              >
                <Check />
              </motion.div>
            </button>
            <button className='p-2'>
              <ArrowSquareIn />
            </button>
            <button className='p-2'>
              <FloppyDisk />
            </button>
          </div>
        </div>
        <div className='textBoxContainer'>
          <textarea placeholder='Time to type something' className='hideMe flex z-10' value={textContent} onChange={(e) => setTextContent(e.target.value)} /> 
          <div className='renderedMD flex-col'>
            <Markdown breaks={true} gfm={true} >
              {textContent || "Empty"}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page