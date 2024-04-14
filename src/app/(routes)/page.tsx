"use client"

import { setTitle } from "@utils"

import { LoadingState } from "@types"

import { useArticles } from "@hooks"

import {
  ArticlesCardList,
  EventsCalendar,
  Progress,
} from "@components"

export default function Home() {
  setTitle("Página Principal")

  const { articles, loadingState: loadingArticles } =
    useArticles()

  if (loadingArticles === LoadingState.Loading) {
    return <Progress />
  }

  if (articles) {
    return (
      <div className="flex gap-6 w-full">
        <ArticlesCardList
          totalCols={1}
          articles={articles}
        />
        <EventsCalendar />
      </div>
    )
  }
}
