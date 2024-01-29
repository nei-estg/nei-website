import React from 'react'
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import  GitHubIcon  from '@mui/icons-material/GitHub';

export const Footer = () => {
  return (
    <div>
        <Box component="footer" style={{ backgroundColor: '#002855', color: '#ffffff' }}
      sx={{
        p: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              NEI
            </Typography>
            <Typography variant="body2">
             Núcleo de Estudantes de Informática da ESTG
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Morada
            </Typography>
            <Typography variant="body2">
              Rua do Curral, Casa do Curral, Margaride
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Contacto
            </Typography>
            <Typography variant="body2">
              Email: nei@estg.ipp.pt (to be)
            </Typography>
            <Typography variant="body2">
              Tel: nao temos telemóvel
            </Typography>  
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Redes Sociais
            </Typography>
            <Typography variant="body2">
                <GitHubIcon color="primary"/>
            </Typography>
            <Typography variant="body2">
                <InstagramIcon color="primary"/>
            </Typography>
            <Typography variant="body2">
                <TwitterIcon color="primary"/>
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" align="center">
            {"Copyright © "}
            <Link color="inherit" href="/">
              NEI
            </Link>{" "}
            2023 - {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  </div>
  )
}


export default Footer
