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

export const Footer = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const socialNetworks = [
    {id: 1, name: "email", URL: "mailto:nei@estg.ipp.pt"},
    {id: 2, name: "linkedin", URL: "https://www.linkedin.com/company/estg-nei"},
    {id: 3, name: "instagram", URL: "https://www.instagram.com/nei_estg/"},
    {id: 4, name: "discord", URL: "https://discord.gg/xbD38MS2e8"},
    {id: 5, name: "linktree", URL: "https://linktr.ee/nei.estg"},
  ];

  return (
    <div style={{ position: 'relative' }}>
      <Box
        component="footer"
        style={{ backgroundColor: "#002855", color: "#ffffff" }}
        sx={{
          p: 6,
        }}
      >
      <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6} style={{ display: "flex", alignItems: "center" }}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent={isSmallScreen ? "center" : "center"}
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
                    sx={{ marginTop: "10px" ,
                      textAlign: { xs: "center", sm: "center", md: "center" },
                    }}
                    variant="h6"
                  >
                    NEI
                  </Typography>
                  <Typography variant="body2" sx={{ textAlign: "center" }}>
                    Núcleo de Estudantes de Informática da ESTG
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography
                variant="h6"
                gutterBottom
                align={isSmallScreen ? "center" : "center"}
              >
                Links
              </Typography>
              <Box
                display="flex"
                justifyContent={isSmallScreen ? "center" : "center"}
              >
                <Button
                  component={RouterLink}
                  sx={{ marginLeft: "0px", color: "#ffffff", textTransform: 'lowercase', }}
                  to={routes.aboutFAQpage.path}
                >
                  <Typography variant="button" sx={{ textTransform: 'capitalize' }}>
                    Sobre Nós
                  </Typography>
                </Button>
              </Box>

              <Box
                display="flex"
                justifyContent={isSmallScreen ? "center" : "center"}
              >
                <Button
                  component={RouterLink}
                  sx={{ marginLeft: "0px", color: "#ffffff", textTransform: 'lowercase', }}
                  to={routes.blogpage.path}
                >
                  <Typography variant="button" sx={{ textTransform: 'capitalize' }}>
                    Blog
                  </Typography>
                </Button>
              </Box>

              <Box
                display="flex"
                justifyContent={isSmallScreen ? "center" : "center"}
              >
                <Button
                  component={RouterLink}
                  sx={{ marginLeft: "0px", color: "#ffffff", textTransform: 'lowercase', }}
                  to={routes.calendarpage.path}
                >
                  <Typography variant="button" sx={{ textTransform: 'capitalize' }}>
                    Calendário
                  </Typography>
                </Button>
              </Box>

              <Box
                display="flex"
                justifyContent={isSmallScreen ? "center" : "center"}
              >
                <Button
                  component={RouterLink}
                  sx={{ marginLeft: "0px", color: "#ffffff", textTransform: 'lowercase', }}
                  to={routes.materialspage.path}
                >
                  <Typography variant="button" sx={{ textTransform: 'capitalize' }}>
                    Materiais UC's
                  </Typography>
                </Button>
              </Box>

              <Box
                display="flex"
                justifyContent={isSmallScreen ? "center" : "center"}
              >
                <Button
                  component={RouterLink}
                  sx={{ marginLeft: "0px", color: "#ffffff", textTransform: 'lowercase', }}
                  to={routes.privacypolicypage.path}
                >
                  <Typography variant="button" sx={{ textTransform: 'capitalize' }}>
                    Política de Privacidade
                  </Typography>
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography
                variant="h6"
                gutterBottom
                align={isSmallScreen ? "center" : "center"}
              >
                Redes Sociais
              </Typography>
              
              {socialNetworks.map((sn, index) => (
                <Box
                display="flex"
                justifyContent={{ xs: "center", md: "center" }}
              >
                <Button key={sn.id}
                  component={RouterLink}
                  sx={{ marginLeft: "0px", color: "#ffffff", textTransform: 'lowercase', }}
                  to={sn.URL}
                >
                  <Typography variant="button" sx={{ textTransform: 'capitalize' }}>
                    {sn.name}
                  </Typography>
                  </Button>
                </Box>
              ))}
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