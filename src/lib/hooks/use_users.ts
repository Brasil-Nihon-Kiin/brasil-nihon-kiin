"use client"

import { useEffect, useState } from "react"

import { LoadingState, Nid, UserWithArticles } from "@types"

import { getUser } from "@actions"

export function useUser(
  nid: Nid,
  includeArticles: boolean = true
) {
  const [loadingState, setLoadingState] = useState(
    LoadingState.NotYet
  )

  const [user, setUser] = useState<UserWithArticles>()

  useEffect(() => {
    async function getUserData() {
      setLoadingState(LoadingState.Loading)

      const userData = await getUser(nid, includeArticles)

      if (userData) setUser(userData)

      setLoadingState(LoadingState.Loaded)
    }

    getUserData()
  }, [nid, includeArticles])

  return { loadingState, user }
}
