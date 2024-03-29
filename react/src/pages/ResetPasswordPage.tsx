import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { RootState } from "@src/components/redux/store";
import { getResetPasswordCode, resetPassword } from "@src/api/UserRoutes";
import routes from "@src/router/Routes";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";





export default function ResetPasswordPage() {
  const darkReader = useSelector((state: RootState) => state.theme.darkMode);

  const [clickGetCode, setClickGetCode] = useState(false);


  useEffect(() => {
    document.title = routes.changepasswordpage.name;
  }, []);

  const handleGetCode = async () => {
    const username = document.getElementById("username") as HTMLInputElement;
    if (username.value === "") {
      return;
    }
    getResetPasswordCode(username.value).then(() => {
      setClickGetCode(true);

      toast.success("Se o teu username existir, receberás um código!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkReader ? "dark" : "light",
        transition: Bounce,
      });
    })
      .catch(() => {
        setClickGetCode(false);

        toast.error(
          "Ocorreu um erro interno ao enviar o código! Por favor tenta novamente!",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: darkReader ? "dark" : "light",
            transition: Bounce,
          }
        );
      });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      username: event.currentTarget.username.value,
      code: event.currentTarget.resetCode.value,
      password: event.currentTarget.password.value,
    };

    resetPassword(data)
      .then(() => {
        toast.success(
          "Se os dados corresponderem, a tua password será alterada!",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: darkReader ? "dark" : "light",
            transition: Bounce,
          }
        );
      })
      .catch(() => {
        toast.error(
          "Ocorreu um erro interno ao alterar a Palavra-Passe! Por favor tenta novamente!",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: darkReader ? "dark" : "light",
            transition: Bounce,
          }
        );
      });
  };

  const theme = createTheme({
    components: {
      MuiFilledInput: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgb(232, 241, 250)',
            '&:hover': {
              backgroundColor: 'rgb(232, 241, 250)',
              '@media (hover: none)': {
                backgroundColor: 'rgb(232, 241, 250)',
              },
            },
            '&.Mui-focused': {
              backgroundColor: 'rgb(232, 241, 250)',
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgb(232, 241, 250)',
            '&:hover': {
              backgroundColor: 'rgb(232, 241, 250)',
              '@media (hover: none)': {
                backgroundColor: 'rgb(232, 241, 250)',
              },
            },
            '&.Mui-focused': {
              backgroundColor: 'rgb(232, 241, 250)',
            },
          },
        },
      },
    }
  });

  return (
    <ThemeProvider theme={theme}>

      <Container component="main" maxWidth="xs" sx={{ marginTop: '60px', marginBottom: '60px' }}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Redefinir a Palavra-Passe
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: '70%' }}
          >
            {!clickGetCode &&
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  variant="filled"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, marginTop: '0px', marginBottom: '20px' }}
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
              variant="filled"
              type="password"
              id="resetCode"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Nova Palavra-Passe"
              type="password"
              id="password"
              variant="filled"
              autoComplete="new-password"
              sx={{ marginTop: '5px', }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, marginTop: '0px', marginBottom: '10px' }}
            >
              Redefinir
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
