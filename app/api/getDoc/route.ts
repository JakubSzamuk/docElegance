import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()
export const revalidate = 0

export async function GET(req: NextRequest, res: NextResponse) {
  
  // await prisma.test.create({
  //   data: {
  //     test: "testing one two three",
  //   },
  // })


  // const data = await prisma.test.findMany({})

  console.log(data)
}
  