"use server"

import { prisma, toJSON } from "@utils"

import { Nanoid } from "@types"

export async function getCalendarSlots() {
  try {
    const calendarSlots =
      await prisma.calendarSlot.findMany({
        orderBy: {
          startTime: "desc",
        },
      })

    return toJSON(calendarSlots)
  } catch (e) {
    console.error(e)
  }
}

export async function getCalendarSlot(nid: Nanoid) {
  try {
    const calendarSlot =
      await prisma.calendarSlot.findUnique({
        where: {
          nanoid: nid,
        },
      })

    return toJSON(calendarSlot)
  } catch (e) {
    console.error(e)
  }
}
