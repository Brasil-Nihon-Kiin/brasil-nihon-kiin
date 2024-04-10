"use client"

import { useParams } from "next/navigation"

import { LoadingState } from "@types"

import { useUserWithArticles } from "@hooks"

import { Progress } from "@components"
import { useUser } from "@clerk/nextjs"
import { UserForm } from "../../../../lib/components/users/UserForm"

export default function Usuario() {
  const params = useParams()
  const userNid = params.user_nid as string

  const { userWithArticles, loadingState } =
    useUserWithArticles(userNid)

  const { user } = useUser()

  if (loadingState === LoadingState.Loading) {
    return <Progress />
  }

  if (userWithArticles) {
    return (
      <div className="grid grid-cols-1 w-5/6">
        <h1>
          {userWithArticles.firstName}{" "}
          {userWithArticles.lastName} @
          {userWithArticles.username}
        </h1>

        <Divider text="Editar Usuário" />

        {user && user.publicMetadata.nanoid ? (
          <UserForm />
        ) : null}
      </div>
    )
  }
}

type DividerProps = {
  text: string
}

export function Divider({ text }: DividerProps) {
  return (
    <div className="divider font-medium text-xl">
      {text}
    </div>
  )
}
