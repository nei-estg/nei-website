import { createTheme, ThemeProvider, Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';


const defaultTheme = createTheme();


const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = "Página Não Encontrada - NEI";
  }, []);
  
  return (
  <ThemeProvider theme={defaultTheme}>
    <Container maxWidth="xl" sx={{ marginTop: '30px', marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', flexDirection: 'column' }}>
      <Typography variant="h4" align="center"
        sx={{
          color: '#1E2022',
          fontWeight: 700,
          marginBottom: '20px',
        }}
      >ERRO 404 - Página Não Encontrada</Typography>

      <Typography variant="h6" align="center"
        sx={{
          color: '#1E2022',
          fontWeight: 700,
        }}
      >A página que estás a procura, não existe.</Typography>
    </Container>
  </ThemeProvider>
  );
};

export default NotFoundPage;