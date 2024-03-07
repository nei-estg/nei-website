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
import Terminal from '@src/components/terminal/terminal';
import routes from '@src/router/Routes';

const defaultTheme = createTheme();

export default function FrontPage() {
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    document.title = routes.frontpage.name;
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
        <div
          id="bgnr"
          style={{
            position: window.innerWidth <= 1000 ? 'relative' : 'absolute',
            marginTop: window.innerWidth <= 1000 ? '300px' : '0',
            marginBottom: window.innerWidth <= 1000 ? '-300px' : '0',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            justifyContent: 'space-between',
            width: '80%',
            zIndex: '3',
            flexDirection: window.innerWidth <= 1200 ? 'column' : 'row',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h1 style={{ color: 'white' }}>Bem-vindo ao NEI!</h1>
            <p style={{ color: 'white' }}>Prepara-te para passar maior parte do teu tempo aqui!</p>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Terminal />
          </div>
        </div>
        <img
          className="hide-on-small"
          src="estg2.png"
          alt="Banner Image"
          style={{ width: '100%', position: 'relative', zIndex: '2' }}
        ></img>
        <div
          id="scrollButton"
          className="hide-on-small"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: '3',
          }}
        >
          <button
            onClick={() => {
              const element = document.getElementById('scrollDiv');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Scroll />
          </button>
        </div>
        <div
          style={{
            position: 'relative',
            zIndex: '2',
            marginTop: '80px',
            marginBottom: '80px',
          }}
        >
          <div
            id="scrollDiv"
            style={{
              display: 'flex',
              justifyContent: 'center', // Align items along the horizontal axis
              alignItems: 'center', // Align items along the vertical axis
              textAlign: 'center',
              flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
            }}
          >
            <div id="div1" style={{ margin: '20px' }}>
              <a href={routes.aboutFAQpage.path} style={{ textDecoration: 'none' }}>
                <h1 style={{ color: 'white' }}>Sobre o Nosso Núcleo</h1>
                <a href="/about" target="_blank" style={{ textDecoration: 'none' }}>
                  <img
                    src="logo.png"
                    alt="Descrição da imagem"
                    style={{ height: '150px', width: '150px' }}
                  />
                </a>
                <p style={{ color: 'white', fontWeight: 'bold' }}>
                  Direção, Cursos, entre outros.
                </p>
              </a>
            </div>

            <div id="div1" style={{ margin: '20px' }}>
              <a href={routes.blogpage.path} target="_blank" style={{ textDecoration: 'none' }}>
                <h1 style={{ color: 'white' }}>Atividades</h1>
                <img
                  src="/icon/laptop.png"
                  alt="Descrição da imagem"
                  style={{ height: '150px', width: '150px' }}
                />
                <p style={{ color: 'white', fontWeight: 'bold' }}>
                  Eventos e Atividades mais recentes.
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>

      <CssBaseline />
      <div
        style={{
          zIndex: 2,
          position: 'relative',
          minHeight: '60vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white'
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
              <h1 className="responsive-header">Dúvidas? Envia-nos uma mensagem! :)</h1>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="name"
                    name="uName"
                    required
                    fullWidth
                    id="uName"
                    label="Nome"
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
                    autoComplete=""
                    multiline
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2, 
                  width: { xs: '100%', sm: '50%' }, 
                  borderRadius: '8px' 
                }}
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
