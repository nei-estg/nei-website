import {
  Box,
  Button,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { sendContactForm } from '@src/api/ContactRoutes';
import { IContact } from '@src/interfaces/IContact';
import { toast, Bounce } from 'react-toastify';
import { Particle } from '@src/components/particles/particles';
import { useEffect, useState } from 'react';
import { Scroll } from '@src/components/button/scroll';
import './css/FrontPage.css';

const defaultTheme = createTheme();

export default function FrontPage() {
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    document.title = 'Home - NEI';
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
          'Contacto criado com sucesso! O NEI irá responder o mais rápido possível!',
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            transition: Bounce,
          }
        );
      })
      .catch(() => {
        toast.error(
          'Ocorreu um erro ao criar o pedido de contacto! Por favor tenta novamente!',
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            transition: Bounce,
          }
        );
      });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <div>
        <img
          src="/public/estg.png"
          alt="Banner Image"
          style={{ width: '100%', position: 'relative', zIndex: '2' }}
        ></img>
        <Scroll />
        <div style={{ position: 'relative', zIndex: '2', marginTop: "80px", marginBottom: "80px" }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <div id="div1" style={{ margin: '20px' }}>
              <h1 style={{ color: 'white' }}>Sobre o Nosso Núcleo</h1>
              <img
                src="public/logo.png"
                alt="Descrição da imagem"
                style={{ height: '150px', width: '150px' }}
              />
              <p style={{ color: 'white' }}>Descrição pequena</p>
            </div>
            <div id="div2" style={{ textAlign: 'center', margin: '20px' }}>
              <h1 style={{ color: 'white' }}>Atividades</h1>
            </div>
          </div>
        </div>
      </div>

      <CssBaseline />
      <div
        style={{
          zIndex: 2,
          position: 'relative',
          height: '60vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <div
          style={{
            zIndex: 2,
            position: 'relative',
            textAlign: 'center',
            width: '50%',
          }}
        >
          {showForm && (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <h1>Dúvidas? Envia-nos uma mensagem! :)</h1>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="name"
                    name="uName"
                    required
                    fullWidth
                    id="uName"
                    label="Nome"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
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
                    label="Tema"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="message"
                    label="Mensagem"
                    id="message"
                    autoComplete="message"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, width: '50%', borderRadius: '8px' }}
              >
                Enviar Mensagem
              </Button>
            </Box>
          )}
          {!showForm && <div>Obrigado, até breve!</div>}
        </div>
      </div>
      <div style={{ zIndex: 1, position: 'absolute' }}>
        <Particle />
      </div>
    </ThemeProvider>
  );
}
