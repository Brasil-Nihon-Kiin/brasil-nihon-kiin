"use server"

import { NextResponse } from "next/server"

import { prisma, toJSON } from "@utils"

import { Nid } from "@types"

export async function getUser(
  nid: Nid,
  includeArticles: boolean = false
) {
  try {
    const user = await prisma.user.findUnique({
      where: { nanoid: nid },
      include: { articles: includeArticles },
    })
    
    return JSON.parse(JSON.stringify(user))

    // return user ? toJSON(user) : NextResponse.json({})
  } catch (e) {
    console.error(e)
  }
}
