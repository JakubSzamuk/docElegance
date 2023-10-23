'use client'
import { ArrowSquareDown, ArrowSquareIn, Check, Clipboard, FloppyDisk } from '@phosphor-icons/react'
import Markdown from 'marked-react'
import marked from 'marked'
import React, { useEffect, useRef, useState } from 'react'
import { useAnimationControls, motion } from 'framer-motion'
import axios from 'axios'
import jsPDF from "jspdf";
import { useDebounce } from 'use-debounce';


const page = () => {

  const mdRefContainer = useRef<Node>(null)

  useEffect(() => {
    const fileData = axios.get("/api/getDoc").then(data => data)
    
  }, [])




  const [textContent, setTextContent] = useState('')
  const [saveText] = useDebounce(textContent, 1000)


  const [titleContent, setTitleContent] = useState('Untitled')


  const clipboardControls = useAnimationControls()

  const autosave = async () => {
    await axios.post("/api/autosaver", {
      docBody: saveText,
      docTitle: titleContent,
    })
  }

  useEffect(() => {
    // https://www.npmjs.com/package/use-debounce
    autosave()

  }, [saveText])


  const testPdf = () => {
    const htmlMD = marked.parse(textContent)
    const doc = new jsPDF()
    doc.fromHtml(htmlMD, { callback: () => doc.save("test.pdf") })
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