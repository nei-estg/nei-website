import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { activateAccount, getActivateAccountCode } from "@src/api/UserRoutes";
import routes from "@src/router/Routes";
import { toast, Bounce } from "react-toastify";
import { useEffect, useState } from "react";
import { RootState } from "@src/components/redux/store";
import { useSelector } from "react-redux";





export default function ActivateAccountPage() {
  const [clickGetCode, setClickGetCode] = useState(false);
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);


  useEffect(() => {
    document.title = routes.activateaccountpage.name;
  }, []);

  const handleGetCode = async () => {
    const username = document.getElementById('username') as HTMLInputElement;
    if (username.value === "") {
      return;
    }
    getActivateAccountCode(username.value).then(() => {
      setClickGetCode(true);

      toast.success("Se o teu username existir, receberás um código!!", {
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
    }).catch(() => {
      setClickGetCode(false);

      toast.error("Ocorreu um erro interno ao enviar o código! Por favor tenta novamente!", {
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
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      username: event.currentTarget.username.value,
      code: event.currentTarget.resetCode.value,
    };

    activateAccount(data).then(() => {
      toast.success("Se os dados corresponderem, a tua conta será ativada!", {
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
    }).catch(() => {
      toast.error("Ocorreu um erro interno ao alterar ao ativar a conta! Por favor tenta novamente!", {
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
    });
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs" sx={{ marginTop: '60px', marginBottom: '60px' }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color={darkMode ? "#FFFFFF" : "#191919"}>
            Ativar Conta
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {!clickGetCode &&
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, marginTop: '0px' }}
                  onClick={handleGetCode}
                >
                  Enviar Código
                </Button>
              </>
            }

            <TextField
              margin="normal"
              required
              fullWidth
              name="resetCode"
              label="Código"
              type="password"
              id="resetCode"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, marginTop: '0px', marginBottom: '20px' }}
            >
              Ativar
            </Button>
            <Grid container>
              <Grid item>
                <Link href={routes.loginpage.path} variant="body2">
                  {"Queres voltar para a tua sessão? Inicia Sessão"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}