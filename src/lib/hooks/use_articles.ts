"use client"

import { useEffect, useState } from "react"

import {
  ArticleWithCreator,
  LoadingState,
  Nid,
} from "@types"

import { getArticle, getArticles } from "@actions"

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

export function useArticle(nid: Nid) {
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