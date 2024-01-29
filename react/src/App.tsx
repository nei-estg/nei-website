import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./components/footer/Footer";
import NavBar from "./components/NavBar";

function App() {
  return (
  <>
    <CssBaseline />
    <BrowserRouter>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <NavBar/>
        <Container maxWidth={false} disableGutters={true}>
          <Router />
        </Container>
        <Footer />
      </Box>
    </BrowserRouter>
  </>
  );
}

export default App;
