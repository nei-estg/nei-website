import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { sendContactForm } from "@src/api/ContactRoutes";
import { IContact } from "@src/interfaces/IContact";
import { toast, Bounce } from "react-toastify";
import { Particle } from "@src/components/particles/particles";
import { useEffect, useState } from "react";
import { relative } from "path";
import { Scroll } from "@src/components/button/scroll";

const defaultTheme = createTheme();

export default function FrontPage() {
  const [showForm, setShowForm] = useState(true);
  
  useEffect(() => {
    document.title = "Home - NEI";
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newContact: IContact = {
      name: event.currentTarget.uName.value,
      email: event.currentTarget.email.value,
      subject: event.currentTarget.subject.value,
      message: event.currentTarget.message.value,
    };
    sendContactForm(newContact)
      .then(() => {
        setShowForm(false);
        toast.success(
          "Contacto criado com sucesso! O NEI irá responder o mais rápido possível!",
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
      })
      .catch(() => {
        toast.error(
          "Ocorreu um erro ao criar o pedido de contacto! Por favor tenta novamente!",
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
      })
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <img src="/public/estg.png" alt="Banner Image" style={{ width: '100%', position: "relative", zIndex: "2"}}></img>
      <Scroll />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div style={{ height: "60vh" }}>
          <div style={{ zIndex: 2, position: "relative", textAlign: "center" }}>
            {showForm && (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="name"
                    name="uName"
                    required
                    fullWidth
                    id="uName"
                    label="Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="subject"
                    name="subject"
                    required
                    fullWidth
                    id="subject"
                    label="Subject"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="message"
                    label="Message"
                    id="message"
                    autoComplete="message"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send Contact
              </Button>
            </Box>
            )}
            {!showForm && <div>Thank you for your submission!</div>}
          </div>
          <div style={{ zIndex: 1, position: "absolute" }}>
            <Particle />
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}
