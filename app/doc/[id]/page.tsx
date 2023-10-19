'use client'
import { ArrowSquareDown, ArrowSquareIn, Check, Clipboard, FloppyDisk } from '@phosphor-icons/react'
import Markdown from 'marked-react'
import React, { useEffect, useRef, useState } from 'react'
import { useAnimationControls, motion } from 'framer-motion'
import axios from 'axios'
import jsPDF from "jspdf";


const page = () => {

  const mdRefContainer = useRef<Node>(null)

  //   Copyright (c) 2010-2021 James Hall, https://github.com/MrRio/jsPDF (c) 2015-2021 yWorks GmbH, https://www.yworks.com/

  // Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  // The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  useEffect(() => {
    const fileData = axios.get("/api/getDoc").then(data => data)
    
  }, [])




  const [textContent, setTextContent] = useState('')
  const [titleContent, setTitleContent] = useState('Untitled')
  const [pastText, setPastText] = useState<number[]>([])

  const clipboardControls = useAnimationControls()
  const [isRecording, setIsRecording] = useState(false)

  useEffect(() => {
    // https://www.npmjs.com/package/use-debounce
    if (isRecording == false) {
      setIsRecording(true)
      const currentTextContent = textContent
      setTimeout(() => {
        if (currentTextContent === textContent) {
          console.log("not typing")
        }
        setIsRecording(false)
      }, 5000)
    }
  }, [textContent])



  const testPdf = () => {
    const doc = new jsPDF()
    console.log(mdRefContainer.current.outerHTML)
    doc.html(mdRefContainer.current.innerHTML, { callback: () => doc.save("test.pdf") })
  }

  return (
    <div className='w-screen min-h-screen flex justify-center'>
      <div className='flex flex-col text-white mono p-12 bg-primary rounded-md mt-24 max-w-2/3'>
        <div className='relative flex w-full text-5xl items-center'>
          <input value={titleContent} onChange={(e) => setTitleContent(e.target.value)} className='w-full'/>
          <div className='p-2 flex items-center gap-2 rounded-md bg-primary'>
            <button className='p-2' onClick={() => {/* navigator.clipboard.writeText(textContent);*/ clipboardControls.start("check"); setTimeout(() => {
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
            <button className='p-2' onClick={() => testPdf()}>
              <FloppyDisk />
            </button>
          </div>
        </div>
        <div className='textBoxContainer'>
          <textarea placeholder='Time to type something' className='hideMe flex z-10' value={textContent} onChange={(e) => setTextContent(e.target.value)} /> 
          <div className='renderedMD flex flex-col gap-4' ref={mdRefContainer}>
            <Markdown breaks={true} gfm={true}>
              {textContent || "Empty"}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page