"use server"

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

    return toJSON(user)
  } catch (e) {
    console.error(e)
  }
}
