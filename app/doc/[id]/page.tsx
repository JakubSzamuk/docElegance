'use client'
import { ArrowSquareDown, ArrowSquareIn, Check, Clipboard, FloppyDisk, Link } from '@phosphor-icons/react'
import Markdown from 'marked-react'
// import marked from 'marked'
import React, { useEffect, useRef, useState } from 'react'
import { useAnimationControls, motion } from 'framer-motion'
import axios from 'axios'
import jsPDF from "jspdf";
import { useDebounce } from 'use-debounce';


const page = ({ params }: any) => {



  const identifier = params.id

  const mdRefContainer = useRef<Node>(null)

  useEffect(() => {
    axios.post("/api/fetchdoc", { id: identifier }).then(data => {
      setIsSaving(data.data.status)
      setTextContent(data.data.docBody)
      setTitleContent(data.data.docTitle)
    })
  }, [])


  const [isSaving, setIsSaving] = useState<boolean>()

  const [textContent, setTextContent] = useState('')
  const [saveText] = useDebounce(textContent, 500)



  const [titleContent, setTitleContent] = useState('')
  const [saveTitle] = useDebounce(titleContent, 500)

  const clipboardControls = useAnimationControls()

  const autosave = async () => {
    if (isSaving) {
      await axios.post("/api/autosaver", {
        id: identifier,
        docBody: saveText,
        docTitle: titleContent,
      }).then(data => {
        console.log(data.data)
        if (data.data.status == true) {
          setIsSaving(true)
        } else {
          setIsSaving(data.data.status)
        }
      })
    }
  }

  useEffect(() => {
    autosave()
  }, [saveText, saveTitle])

  console.log(isSaving)


  return (
    <div className='w-screen min-h-screen flex justify-center overflow-x-hidden'>
      <div className={`flex flex-col text-white mono p-12 bg-primary rounded-md mt-24 max-w-2/3 ${isSaving ? "" : "collapse"}`}>
        <div className='relative flex w-full text-5xl items-center'>
          <input value={titleContent} onChange={(e) => setTitleContent(e.target.value)} className='w-full'/>
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
            <button className='p-2' onClick={() => {navigator.clipboard.writeText(`https://docs.JakubSzamuk.co.uk/doc/${identifier}`);}}>
              <Link />
            </button>
            <button className='p-2' onClick={() => {/*testPdf()*/}}>
              <FloppyDisk />
            </button>
          </div>
        </div>
        <div className='textBoxContainer'>
          <textarea placeholder='Time to type something' className='hideMe flex z-10' value={textContent} onChange={(e) => setTextContent(e.target.value)} /> 
          <div className='renderedMD flex flex-col gap-4' ref={mdRefContainer}>
            <Markdown breaks={true} gfm={true}>
              {textContent || "Time to type something"}
            </Markdown>
          </div>
        </div>
      </div>
      <div className={`mt-96 bg-primary text-white mono text-8xl p-8 ${isSaving ? "collapse" : ""}`}>
        <p>Loading...</p>
      </div>
    </div>
  )
}

export default page