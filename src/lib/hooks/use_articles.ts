"use client"

import { useEffect, useState } from "react"

import { Article } from "@prisma/client"

import { LoadingState } from "@types"

export function useArticles() {
  const [loadingState, setLoadingState] = useState(
    LoadingState.NotYet
  )

  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {}, [])

  return { loadingState, articles }
}
