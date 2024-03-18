import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FooterWrapper from "./components/footer/FooterWrapper";
import NavBarWrapper from "./components/navbar/NavBarWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./components/redux/store";


function App() {

  return (
    <Provider store={store}>
      <CssBaseline />
      <BrowserRouter>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          <NavBarWrapper />
          <Container maxWidth={false} disableGutters={true} sx={{ flexGrow: 1 }}>
            <Router />
          </Container>
          <FooterWrapper />
          <ToastContainer />
        </Box>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
