import { Button } from "@mui/material"
import { sendContactForm } from "@src/api/ContactRoutes"
import { IContact } from "@src/interfaces/IContact"
import { toast, Bounce } from "react-toastify"

export default function FrontPage() {

  const handleSubmit = () => {
    //TODO: Get Data from form
    const newContact: IContact = {
      name: "Irineu",
      email: "irineu@naosabenem.eu",
      subject: "Test",
      message: "Lorem Ipsum"
    }
    sendContactForm(newContact).then(() => {
      toast.success("Contacto criado com sucesso! O NEI irá responder os mais rápido possível!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }).catch(() => {
      toast.error("Ocorreu um erro ao criar o pedido de contacto! Por favor tenta novamente!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }); 
  }

  return (
    <>
      <p>FrontPage</p>
      <Button onClick={handleSubmit}>Test Button For Contact (Backend Complaining about CSRF)</Button>
    </>
  )
}