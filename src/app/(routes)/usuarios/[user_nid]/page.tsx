"use client"

import { useParams } from "next/navigation"

import { LoadingState } from "@types"

import { useUserWithArticles } from "@hooks"

import { Progress } from "@components"

export default function Usuario() {
  const params = useParams()
  const userNid = params.user_nid as string

  const { userWithArticles, loadingState } =
    useUserWithArticles(userNid)

  if (loadingState === LoadingState.Loading) {
    return <Progress />
  }

  if (userWithArticles) {
  console.log(userWithArticles)
    return (
      <>
        <h1>
          {userWithArticles.firstName}{" "}
          {userWithArticles.lastName}{" "}
          @{userWithArticles.username}
        </h1>
      </>
    )
  }
}
