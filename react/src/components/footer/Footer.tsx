import React from "react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Box, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import logo from "../../assets/logo.png";

export const Footer = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Box
        component="footer"
        style={{ backgroundColor: "#002855", color: "#ffffff" }}
        sx={{
          p: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={5}>
              <Grid container direction="row" alignItems="center" justifyContent={isSmallScreen ? 'center' : 'flex-start'}>
                <img
                  src={logo}
                  alt="logo"
                  style={{
                    marginRight: "10px",
                    height: "100px",
                    width: "100px",
                  }}
                />
                <div>
                  <Typography variant="body2">NEI</Typography>
                  <Typography variant="body2">
                    Núcleo de Estudantes de Informática da ESTG
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" gutterBottom align={isSmallScreen ? 'center' : 'inherit'}>
                Contacto
              </Typography>
              <Typography variant="body2" align={isSmallScreen ? 'center' : 'inherit'}>Sobre Nós</Typography>
              <Typography variant="body2" align={isSmallScreen ? 'center' : 'inherit'}>Email: nei@estg.ipp.pt</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="h6" gutterBottom align={isSmallScreen ? 'center' : 'inherit'}>
                Redes Sociais
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/pulsar-line/48/linktree.png"
                  alt="linktree"
                />
              </Box>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Typography variant="body2" align="center">
              {"Copyright © "}
              <Link color="inherit" href="/">
                NEI
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
};