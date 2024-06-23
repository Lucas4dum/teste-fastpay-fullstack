"use client"

import { useUser } from "~/store/user"

export default function Page() {
  const { user } = useUser()
  return (
    <div>
      <h1>Dashboard</h1>
      {user && user.email}
      {user && user.access_token}
      {!user && "Loading..."}
    </div>
  )
}
