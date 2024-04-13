"use client"

import { CalendarSlot } from "@prisma/client"

import { useEffect, useState } from "react"

import { LoadingState } from "@types"

import { getCalendarSlots } from "@actions"

export function useCalendarSlots() {
  const [loadingState, setLoadingState] = useState(
    LoadingState.NotYet
  )

  const [calendarSlots, setCalendarSlots] =
    useState<CalendarSlot[]>()

  useEffect(() => {
    async function getUserData() {
      setLoadingState(LoadingState.Loading)

      const calendarSlotsData = await getCalendarSlots()

      if (calendarSlotsData)
        setCalendarSlots(calendarSlotsData)

      setLoadingState(LoadingState.Loaded)
    }

    getUserData()
  }, [])

  return { loadingState, calendarSlots }
}
