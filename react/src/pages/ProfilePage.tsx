import { Container, Grid, ThemeProvider, createTheme } from "@mui/material"
import { getUser } from "@src/api/UserRoutes"
import { IUser } from "@src/interfaces/IUser"
import { useEffect, useState } from "react"
import { toast, Bounce } from "react-toastify"


const defaultTheme = createTheme();


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
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="xl" sx={{ marginTop: '30px' , marginBottom: '60px' }}>
        <div>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Grid container direction="column" alignItems="center" justifyContent="center">
                 <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                   {user && (
                      <p>{JSON.stringify(user)}</p>
                    )}
                 </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Container>
    </ThemeProvider>
  )
}