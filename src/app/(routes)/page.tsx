"use client"

import { setTitle } from "@utils"

import { LoadingState } from "@types"

import { useArticles } from "@hooks"

import { ArticlesList, Progress } from "@components"

export default function Home() {
  setTitle("Página Principal")

  const { articles, loadingState: loadingArticles } =
    useArticles()

  if (loadingArticles === LoadingState.Loading) {
    return <Progress />
  }

  if (articles) {
    return (
      <div>
        <ArticlesList totalCols={1} articles={articles} />
      </div>
    )
  }
}
