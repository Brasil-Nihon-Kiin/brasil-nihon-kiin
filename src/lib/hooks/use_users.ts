"use client"

import { useEffect, useState } from "react"

import { LoadingState, Nid, UserWithArticles } from "@types"
import { getUser } from "../actions/users/get_users"


export function useUserWithArticles(nid: Nid) {
  const [loadingState, setLoadingState] = useState(
    LoadingState.NotYet
  )

  const [userWithArticles, setUserWithArticles] =
    useState<UserWithArticles>()

  useEffect(() => {
    async function getUserData() {
      setLoadingState(LoadingState.Loading)

      const userData = await getUser(nid, true)

      if (userData) setUserWithArticles(userData)

      setLoadingState(LoadingState.Loaded)
    }

    getUserData()
  }, [nid])

  return { loadingState, userWithArticles }
}
