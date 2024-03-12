import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FooterWrapper from "./components/footer/FooterWrapper";
import NavBarWrapper from "./components/navbar/NavBarWrapper";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    typography: {
      fontFamily: 'Cabin, sans-serif',
    },
  });

  useEffect(() => {
    const handler = () => {
      console.log('Developer console is open!');
      alert('Developer console is open!');
    };

    window.addEventListener('devtoolschange', handler);

    return () => {
      window.removeEventListener('devtoolschange', handler);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: "100vh",
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          <NavBarWrapper darkMode={darkMode} setDarkMode={setDarkMode} />
          <Container maxWidth={false} disableGutters={true} sx={{ flexGrow: 1 }}>
            <Router />
          </Container>
          <FooterWrapper />
          <ToastContainer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
