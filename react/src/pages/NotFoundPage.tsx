import { createTheme, ThemeProvider, Container } from '@mui/material';
import React from 'react';


const defaultTheme = createTheme();


const NotFoundPage: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="xl" sx={{ marginTop: '30px', marginBottom: '60px' }}>
        <div>
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default NotFoundPage;