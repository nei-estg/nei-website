import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

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
        <Container maxWidth={false} disableGutters={true}>
          <Router />
        </Container>
      </Box>
    </BrowserRouter>
  </>
  );
}

export default App;
