import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient()
export const revalidate = 0

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const userId = (await prisma.user.findFirst({
      where: {
        email: session?.user?.email
      }
    }))?.id
  
    try {
      if (body.id == null) {
        return NextResponse.json({ status: false })
      } else {
        await prisma.savedDocuments.update({
          where: {
            id: body.id,
            uid: userId
          },
          data: {
            title: body.docTitle || "Untitled",
            body: body.docBody
          }
        })
        return NextResponse.json({ status: true })
      }
    } catch (err) {
      return NextResponse.json(`error, ${err}`)
    } 
  } else {
    return NextResponse.json("You are not signed in")
  }
}
  
