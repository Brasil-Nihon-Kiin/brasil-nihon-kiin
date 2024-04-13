"use client"

import { useEffect, useState } from "react"

import {
  ArticleWithCreator,
  LoadingState,
  Nanoid,
} from "@types"

import { getArticle, getArticles } from "@actions"

export function useArticles(totalArticles?: number) {
  const [loadingState, setLoadingState] = useState(
    LoadingState.NotYet
  )

  const [articles, setArticles] = useState<
    ArticleWithCreator[]
  >([])

  useEffect(() => {
    async function getArticlesData() {
      setLoadingState(LoadingState.Loading)

      const articlesData = await getArticles(totalArticles)

      if (articlesData) setArticles(articlesData)

      setLoadingState(LoadingState.Loaded)
    }

    getArticlesData()
  }, [totalArticles])

  return { loadingState, articles }
}

export function useArticle(nid: Nanoid) {
  const [loadingState, setLoadingState] = useState(
    LoadingState.NotYet
  )

  const [article, setArticle] =
    useState<ArticleWithCreator>()

  useEffect(() => {
    async function getArticleData() {
      setLoadingState(LoadingState.Loading)

      const articleData = await getArticle(nid)

      if (articleData) setArticle(articleData)

      setLoadingState(LoadingState.Loaded)
    }

    getArticleData()
  }, [nid])

  return { loadingState, article }
}
