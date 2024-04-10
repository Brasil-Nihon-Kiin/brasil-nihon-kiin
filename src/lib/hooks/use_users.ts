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

  const [userWithArticles, setUserWithArticles] =
    useState<UserWithArticles>()

  useEffect(() => {
    async function getUserData() {
      setLoadingState(LoadingState.Loading)

      const userData = await getUser(nid, includeArticles)

      if (userData) setUserWithArticles(userData)

      setLoadingState(LoadingState.Loaded)
    }

    getUserData()
  }, [nid, includeArticles])

  return { loadingState, userWithArticles }
}
