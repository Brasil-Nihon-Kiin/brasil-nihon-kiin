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
    <div className="">
      <h1 className="ml-7 mb-5 text-xl font-semibold">
        Artigos
      </h1>
      {articles ? (
        <ArticlesList articles={articles} />
      ) : null}
    </div>
  )
}
