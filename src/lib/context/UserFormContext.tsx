import { User } from "@prisma/client"

import { createContext, useContext, useState } from "react"

import { Nid, ReactChildren } from "@types"

import { useUser } from "@hooks"

type UserFormContext = {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}

const UserFormContext =
  createContext<UserFormContext | null>(null)

type UserFormProviderProps = ReactChildren & {
  initialUser: User
}

export function UserFormProvider({
  initialUser,
  children,
}: UserFormProviderProps) {
  const [user, setUser] = useState(initialUser)

  return (
    <UserFormContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserFormContext.Provider>
  )
}

export function useUserForm() {
  const context = useContext(UserFormContext)

  if (!context) {
    throw new Error(
      "`useUserForm` must be used within a `UserFormProvider`."
    )
  }

  return context
}
