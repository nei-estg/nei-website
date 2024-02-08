import { getUser } from "@src/api/UserRoutes"
import { IUser } from "@src/interfaces/IUser"
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const [user, setUser] = useState<IUser>({} as IUser)

  useEffect(() => {
    getUser().then((response) => {
      setUser(response)
    }).catch()
  }, [])

  return (
    <div>
      <h1>Profile</h1>
      <p>{JSON.stringify(user)}</p>
    </div>
  )
}