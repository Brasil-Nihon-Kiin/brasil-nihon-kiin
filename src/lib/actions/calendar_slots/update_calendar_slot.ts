"use server"

import { prisma, toJSON } from "@utils"

import { Nanoid } from "@types"

export async function updateCalendarSlotTime(
  calendarSlotId: Nanoid,
  startTime: Date,
  endTime: Date
) {
  try {
    const event = await prisma.calendarSlot.update({
      where: {
        nanoid: calendarSlotId,
      },
      data: {
        startTime,
        endTime,
      },
    })

    return toJSON(event)
  } catch (e) {
    console.error(e)
  }
}
