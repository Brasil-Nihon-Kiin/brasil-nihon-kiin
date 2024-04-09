"use client"

import { LoadingState } from "@types"

import { useArticles } from "@hooks"

import { ArticlesList, Progress } from "@components"

export default function ArticlesView() {
  const { articles, loadingState } = useArticles()

  if (loadingState === LoadingState.Loading) {
    return <Progress />
  }

  return (
    <div className="inline-grid grid-cols-1">
      <h1 className="max-h-max">Artigos</h1>
      {articles ? (
        <ArticlesList articles={articles} />
      ) : null}
    </div>
  )
}
