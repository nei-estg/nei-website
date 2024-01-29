import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./components/footer/Footer";
import NavBar from "./components/NavBar";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "./App.css";

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
            fontFamily: "'Cabin', sans-serif",
            minHeight: "100vh",
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          <NavBar />
          <Container maxWidth={false} disableGutters={true}>
            <Router />
          </Container>
          <Footer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
