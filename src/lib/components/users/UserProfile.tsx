import { useUserForm } from "@context"

export function UserProfile() {
  const { user } = useUserForm()

  return (
    <>
      <h1>
        {user.firstName} {user.lastName} @{user.username}
      </h1>
    </>
  )
}
