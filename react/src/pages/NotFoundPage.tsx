import {
  Container,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import routes from "@src/router/Routes";
import React, { useEffect, useState } from "react";


const NotFoundPage = () => {
  useEffect(() => {
    document.title = routes.notfoundpage.name;
  }, []);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  return (
    <ThemeProvider theme={createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } })}>

      <Container
        maxWidth="xl"
        sx={{
          marginTop: "30px",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: "#1E2022",
            fontWeight: 700,
            marginBottom: "20px",
          }}
        >
          ERRO 404 - Página Não Encontrada
        </Typography>

        <Typography
          variant="h6"
          align="center"
          sx={{
            color: "#1E2022",
            fontWeight: 700,
          }}
        >
          A página que estás a procura, não existe.
        </Typography>
      </Container>
    </ThemeProvider>
  );
};


export default NotFoundPage;
