import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { changePassword } from '@src/api/UserRoutes';
import { isLoggedIn } from '@src/api/utils/LoginStatus';
import routes from '@src/router/Routes';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Bounce, toast } from 'react-toastify';

const defaultTheme = createTheme();

export default function ChangePasswordPage() {

  useEffect(() => {
    document.title = routes.changepasswordpage.name;


    //verificar se o user está logado
    if(!isLoggedIn())
    {
      window.location.href = routes.loginpage.path;
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const passwords = {
      oldPassword: event.currentTarget.oldPassword.value,
      newPassword: event.currentTarget.newPassword.value
    };
    changePassword(passwords).then(() => {
      window.location.href = routes.profilepage.path;
    }).catch(() => {
      toast.error(
        "Ocorreu um erro ao modificar a palavra-passe! Por favor tenta novamente!",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        }
      );
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              name="oldPassword"
              label="Old Password"
              type="password"
              id="oldPassword"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change
            </Button>
            <Grid container>
              <Grid item>
                <Link href={routes.profilepage.path} variant="body2">
                  {"Want to go back? Profile"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
