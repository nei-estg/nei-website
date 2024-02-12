import { getUser } from "@src/api/UserRoutes"
import { IUser } from "@src/interfaces/IUser"
import { useEffect, useState } from "react"
import { toast, Bounce } from "react-toastify"

export default function ProfilePage() {
  const [user, setUser] = useState<IUser>({} as IUser)

  useEffect(() => {
    document.title = "Profile - NEI"
    getUser().then((response) => {
      setUser(response)
    }).catch(() => {
      toast.error("Ocorreu um erro ao aceder ao Perfil! Por favor tenta novamente!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    })
  }, [])

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <p>{JSON.stringify(user)}</p>
      )}
    </div>
  )
}