import Grid from "@mui/material/Grid";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import routes from "@src/router/Routes";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import logo from "../../assets/logo.png";

export const FooterMain = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div style={{ zIndex: 9999, position: 'relative' }}>
      <Box
        component="footer"
        style={{ color: "#ffffff" }}
        sx={{
          p: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={5}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent={isSmallScreen ? "center" : "flex-start"}
              >
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
                  <Typography
                    sx={{
                      textAlign: { xs: "center", sm: "center", md: "left" },
                    }}
                    variant="body2"
                  >
                    NEI
                  </Typography>
                  <Typography variant="body2">
                    Núcleo de Estudantes de Informática da ESTG
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography
                variant="h6"
                gutterBottom
                align={isSmallScreen ? "center" : "inherit"}
              >
                Contacto
              </Typography>

              <Typography
                variant="body2"
                align={isSmallScreen ? "center" : "inherit"}
              >
                Email: nei@estg.ipp.pt
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography
                variant="h6"
                gutterBottom
                align={isSmallScreen ? "center" : "inherit"}
              >
                Links
              </Typography>
              <Box
                display="flex"
                justifyContent={isSmallScreen ? "center" : "flex-start"}
              >
                <Button
                  component={RouterLink}
                  sx={{ marginLeft: "-10px", color: "#ffffff" }}
                  to={routes.aboutFAQpage.path}
                >
                  Sobre Nós
                </Button>
              </Box>

              <Box
                display="flex"
                justifyContent={isSmallScreen ? "center" : "flex-start"}
              >
                <Button
                  component={RouterLink}
                  sx={{ marginLeft: "-15px", color: "#ffffff" }}
                  to={routes.blogpage.path}
                >
                  BLOG
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography
                variant="h6"
                gutterBottom
                align={isSmallScreen ? "center" : "inherit"}
              >
                Redes Sociais
              </Typography>
              <Box
                display="flex"
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <a
                  href="https://linktr.ee/nei.estg?fbclid=PAAaYh9fNTvpGLUa4_QOyGW3EhAatawD5xQ7XXIVufpv1WlJCF3jsy48RWjGA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    width="48"
                    height="48"
                    src="https://img.icons8.com/pulsar-line/48/linktree.png"
                    alt="linktree"
                  />
                </a>
              </Box>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Typography variant="body2" align="center">
              Made with ❤️ and ☕ by NEI's Web Development Team
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
};
