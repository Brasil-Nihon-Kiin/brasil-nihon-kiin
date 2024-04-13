"use server"

import { prisma, toJSON } from "@utils"

export async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    })

    return toJSON(events)
  } catch (e) {
    console.error(e)
  }
}
