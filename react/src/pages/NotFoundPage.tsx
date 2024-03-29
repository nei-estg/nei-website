import {
  Container,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { RootState } from "@src/components/redux/store";
import routes from "@src/router/Routes";
import { useEffect } from "react";
import { useSelector } from "react-redux";


const NotFoundPage = () => {
  useEffect(() => {
    document.title = routes.notfoundpage.name;
  }, []);

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);


  return (
    <>

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
            fontWeight: 700,
          }}
        >
          A página que estás a procura, não existe.
        </Typography>
      </Container>
    </>
  );
};


export default NotFoundPage;
