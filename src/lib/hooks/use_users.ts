"use client"

import { useEffect, useState } from "react"

import { useUser as useClerkUserOriginal } from "@clerk/nextjs"

import {
  LoadingState,
  UserId,
  UserWithArticles,
} from "@types"

import { getUser } from "@actions"

export function useUser(
  id: UserId,
  includeArticles: boolean = true
) {
  const [loadingState, setLoadingState] = useState(
    LoadingState.NotYet
  )

  const [user, setUser] = useState<UserWithArticles>()

  useEffect(() => {
    async function getUserData() {
      setLoadingState(LoadingState.Loading)

      const userData = await getUser(id, includeArticles)

      if (userData) setUser(userData)

      setLoadingState(LoadingState.Loaded)
    }

    getUserData()
  }, [id, includeArticles])

  return { loadingState, user }
}

export function useClerkUser() {
  const clerkData = useClerkUserOriginal()

  function userIdIsFromSignedInUser(id: UserId) {
    return (
      !!clerkData.user &&
      (clerkData.user.publicMetadata.nanoid === id ||
        clerkData.user.username === id ||
        clerkData.user.id === id)
    )
  }

  return { ...clerkData, userIdIsFromSignedInUser }
}
