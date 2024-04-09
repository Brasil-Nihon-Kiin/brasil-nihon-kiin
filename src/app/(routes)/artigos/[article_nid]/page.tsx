"use client"

import { useParams } from "next/navigation"

import { LoadingState, Nid } from "@types"

import { useArticle } from "@hooks"

import { Article, Progress } from "@components"

export default function ArticleView() {
  const params = useParams()
  const articleNid = params.article_nid as Nid

  const { article, loadingState } = useArticle(articleNid)

  if (loadingState === LoadingState.Loading) {
    return <Progress />
  }

  return article ? <Article article={article} /> : null
}
