"use server"

import { prisma, standardNanoid, toJSON } from "@utils"

import { ClerkId } from "@types"

export async function postCalendarSlot(
  creatorId: ClerkId,
  startTime: Date,
  endTime: Date
) {
  try {
    const event = await prisma.user.update({
      where: {
        clerkId: creatorId,
      },
      data: {
        calendarSlots: {
          create: {
            nanoid: standardNanoid(),
            startTime,
            endTime,
          },
        },
      },
    })

    return toJSON(event)
  } catch (e) {
    console.error(e)
  }
}
