import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import puppeteer from "puppeteer";

const prisma = new PrismaClient()
export const revalidate = 0

const getThumbnail = async (body: any) => {
  const browser = await puppeteer.launch({
    executablePath: 'google-chrome-stable',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(`${process.env.NEXTAUTH_URL}doc/${body.id}`);

  await page.screenshot({ path: `./public/thumbnails/${body.id}.png` });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const userId = (await prisma.user.findFirst({
      where: {
        email: session?.user?.email
      }
    }))?.id

    getThumbnail(body)

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

