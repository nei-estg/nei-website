import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FooterWrapper from "./components/footer/FooterWrapper";
import NavBar from "./components/navbar/NavBar";
import NavBarWrapper from "./components/navbar/NavBarWrapper";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Cabin, sans-serif',
    },
  });

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
          <NavBarWrapper/>
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