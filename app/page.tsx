import DocIcon from '@/components/DocIcon'
import Home from '@/components/Home'
import { Metadata } from 'next'
import { useSession, signIn, SessionProvider } from "next-auth/react"
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Doc Elegance',
  description: 'The perfect Documents app for the minimalist',
}

export default function Main() {
  return (
    <Home />
  )
}
