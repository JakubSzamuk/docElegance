import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


const prisma = new PrismaClient()
export const revalidate = 0

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json()
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const userId = (await prisma.user.findFirst({
      where: {
        email: session?.user?.email
      }
    }))!.id
  
    try {
      if (body.id == null) {
        const docId = await prisma.savedDocuments.create({
          data: {
            uid: userId,
            title: "Untitled",
            body: ""
          }
        })
        return NextResponse.json({ documentId: docId.id })
      } else {
        const fetchedDoc = await prisma.savedDocuments.findFirst({
          where: {
            id: body.id,
            uid: userId
          },
        })
        if (fetchedDoc == null) {
          return NextResponse.json({ status: 404 })
        } else {
          return NextResponse.json({ status: true, documentId: fetchedDoc.id, docTitle: fetchedDoc.title, docBody: fetchedDoc.body })
        }
      }
    } catch (err) {
      return NextResponse.json(`error, ${err}`)
    } 

    return NextResponse.json("Success")
  } else {
    return NextResponse.json("You are not signed in")
  }
}
  