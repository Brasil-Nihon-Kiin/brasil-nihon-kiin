"use server"

import { prisma, standardNanoid, toJSON } from "@utils"

import { ClerkId } from "@types"

export async function postEvent(
  creatorId: ClerkId,
  name: string,
  category: string,
  description?: string | null | undefined
) {
  try {
    const event = await prisma.user.update({
      where: {
        clerkId: creatorId,
      },
      data: {
        events: {
          create: {
            nanoid: standardNanoid(),
            name,
            category,
            description,
          },
        },
      },
    })

    return toJSON(event)
  } catch (e) {
    console.error(e)
  }
}
