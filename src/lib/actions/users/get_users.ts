"use server"

import { prisma, toJSON } from "@utils"

import { UserId } from "@types"

export async function getUser(
  id: UserId,
  includeArticles: boolean = false
) {
  try {
    const user = await prisma.user.findMany({
      where: {
        OR: [
          {
            nanoid: id,
          },
          {
            clerkId: id,
          },
          {
            username: id,
          },
        ],
      },
      include: { articles: includeArticles },
    })

    return toJSON(user.first())
  } catch (e) {
    console.error(e)
  }
}
