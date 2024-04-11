import { useUserForm } from "@context"

export function UserProfile() {
  const { user } = useUserForm()

  return (
    <>
      <h1>
        {user.firstName} {user.lastName} @{user.username}
      </h1>
      <h2>Languages</h2>
      {user.languages.map((l, i) => (
        <p key={i}>{l}</p>
      ))}
    </>
  )
}
