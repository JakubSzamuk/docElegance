import { Metadata } from "next";
import React from 'react'

export const metadata: Metadata = {
  title: "Your document",
  description: 'The perfect Documents app for the minimalist',
}

const HomeLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div>
      {children}
    </div>
  )
}
export default HomeLayout
