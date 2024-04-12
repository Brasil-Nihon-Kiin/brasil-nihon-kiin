"use client"

import { useParams } from "next/navigation"

import { LoadingState } from "@types"

import { useUser } from "@hooks"

import { UserFormProvider } from "@context"

import {
  Progress,
  UserForm,
  UserProfile,
} from "@components"

export default function Usuario() {
  const params = useParams()
  const userId = params.user_id as string

  const { user, loadingState } = useUser(userId, false)

  if (loadingState === LoadingState.Loading) {
    return <Progress />
  }

  if (user) {
    return (
      <UserFormProvider initialUser={user}>
        <div className="grid grid-cols-1 w-5/6">
          <UserProfile />
          <UserForm />
        </div>
      </UserFormProvider>
    )
  }
}
