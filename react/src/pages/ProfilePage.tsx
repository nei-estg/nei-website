import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import SecurityIcon from '@mui/icons-material/Security';
import { Avatar, Button, Container, Grid, ThemeProvider, Tooltip, Typography, createTheme } from "@mui/material"
import { getUser } from "@src/api/UserRoutes"
import { ICourse } from "@src/interfaces/ICourse"
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



  /** obter o ano do utilizador
   * 
   * @param year 
   * @returns 
   */
  function getUserYearText(year: number) : string
  {
    switch(year) 
    {
      case 1:
        return "1º ano";
      case 2:
        return "2º ano";
      case 3:
        return "3º ano";
      case 4:
        return "Erasmus";
      case 5:
        return "Alumni";
      default:
        return `${year}º ano`; // Para anos não especificados, mas presentes
    }
  }



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="xl" sx={{ marginTop: '30px' , marginBottom: '60px' }}>
        <div>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Grid container direction="row" alignItems="start" justifyContent="center">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: 'center', width: '92%',}}>
                    {/*foto*/}
                    <Avatar sx={{width: "160px", height: "160px"}} src={user.profilemodel?.image}/>
                   
                    {/*nome*/}
                    <div>
                      <Tooltip title="Administrador" placement="left-start">
                        <Typography variant="subtitle2" color="#054496" sx={{fontSize: {xs: "32px", sm: "32px", md: "32px", lg: "32px", xl: "32px"}, textAlign: 'center', marginTop: "10px"}}>
                          {user.is_staff ? <SecurityIcon/> : ""} 
                          {user.first_name} {user.last_name}
                        </Typography>
                      </Tooltip>
                    </div>
                   
                    {/*username*/}
                    <Typography variant="subtitle2" color="#636F80" sx={{fontSize: {xs: "24px", sm: "24px", md: "24px", lg: "24px", xl: "24px"}, textAlign: 'center', marginTop: "-8px"}}>@{user.username}</Typography>
                                      
                    {/*ano*/}
                    <div>
                      <Tooltip title="Todos os anos tens que atualizar, não te esqueças!" placement="left-start">
                        <Typography variant="subtitle2" color="#969696" sx={{fontSize: "16px", textAlign: 'start', marginTop: "10px"}}>
                          <InfoIcon sx={{fontSize: 20, marginBottom: "-3px"}}/> {getUserYearText(user.profilemodel?.year)}
                        </Typography>
                      </Tooltip>
                    </div>

                    {/*cursos*/}
                    <Typography variant="subtitle2" color="#969696" sx={{fontSize: "16px", textAlign: 'center', marginTop: "0px"}}>{user.profilemodel?.course?.map((course: ICourse) => course.abbreviation).join(", ")}</Typography>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: "end", justifyContent: 'end', width: '8%',}}>
                  <Button variant="contained" startIcon={<EditIcon />} sx={{fontSize: "14px", backgroundColor: '#054496', color: "#FFFFFF", borderRadius: "100px", alignSelf: "end"}}>Editar</Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Container>
    </ThemeProvider>
  )
}