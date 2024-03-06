import { Container, ThemeProvider, Typography, createTheme } from "@mui/material";
import { activateAccount } from "@src/api/UserRoutes";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const defaultTheme = createTheme();

export default function ActivateAccountPage() {
  const [isActivate, setIsActivate] = useState(false);
  const navigate = useNavigate();

  const { code } = useParams();

  useEffect(() => {
    if (!code) {
      navigate('/login');
    }
    activateAccount({ code: code as string }).then(() => {
      setIsActivate(true);
    }).catch(() => {
      setIsActivate(false);
    });
  } ,[code, navigate]);


  function checkActivate(code: string) {
    if (code === "a") {
      setIsActivate(true);
    }
    else {
      setIsActivate(false);
    }
  }



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="xl" sx={{ marginTop: '30px', marginBottom: '60px' }}>
        <div>
          codigo URL: {code}
          {checkActivate(code)}
        </div>


        {isActivate ? (
          <div>
            <Typography variant="h5" color="#1E2022" fontWeight="700" align="center">
              Conta Ativada.
            </Typography>
          </div>
        ) : (
          <div>
            <Typography variant="h5" color="#1E2022" fontWeight="700" align="center">
              Código Inválido.
            </Typography>
          </div>
        )}
      </Container>
    </ThemeProvider>
  )
}