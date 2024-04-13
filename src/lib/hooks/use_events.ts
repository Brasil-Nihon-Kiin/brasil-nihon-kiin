"use client"

import { Event } from "@prisma/client"

import { useEffect, useState } from "react"

import { LoadingState } from "@types"

import { getEvents } from "@actions"

export function useEvents() {
  const [loadingState, setLoadingState] = useState(
    LoadingState.NotYet
  )

  const [events, setEvents] = useState<Event[]>()

  useEffect(() => {
    async function getUserData() {
      setLoadingState(LoadingState.Loading)

      const eventsData = await getEvents()

      if (eventsData) setEvents(eventsData)

      setLoadingState(LoadingState.Loaded)
    }

    getUserData()
  }, [])

  return { loadingState, events }
}
