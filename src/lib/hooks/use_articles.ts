"use client"

import { useEffect, useState } from "react"

import { ArticleWithCreator, LoadingState } from "@types"

import { getArticles } from "@actions"

export function useArticles() {
  const [loadingState, setLoadingState] = useState(
    LoadingState.NotYet
  )

  const [articles, setArticles] = useState<
    ArticleWithCreator[]
  >([])

  useEffect(() => {
    async function getArticlesData() {
      setLoadingState(LoadingState.Loading)

      const articlesData = await getArticles()

      if (articlesData) setArticles(articlesData)

      setLoadingState(LoadingState.Loaded)
    }

    getArticlesData()
  }, [])

  return { loadingState, articles }
}
