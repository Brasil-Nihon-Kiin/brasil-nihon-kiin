"use client"

import { LoadingState } from "@types"

import { useArticles } from "@hooks"

import { ArticlesList } from "@components"

export default function ArticlesView() {
  const { articles, loadingState } = useArticles()

  if (loadingState === LoadingState.Loading) {
    return <></>
  }

  return (
    <>
      {articles ? (
        <ArticlesList articles={articles} />
      ) : null}
    </>
  )
}
