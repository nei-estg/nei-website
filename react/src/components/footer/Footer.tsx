import React from 'react'
import './footer.css'
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

export const Footer = () => {
  return (
    <div>
        <Box component="footer" style={{ backgroundColor: '#a98467' }}
      sx={{
        p: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="text.primary" gutterBottom >
              NEI.
            </Typography>
            <Typography variant="body2" color="text.secondary" >
             Description
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="text.primary" gutterBottom >
              Morada
            </Typography>
            <Typography variant="body2" color="text.secondary" >
              R. do Parque Industrial, Lousada
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="text.primary" gutterBottom >
              Contacto
            </Typography>
            <Typography variant="body2" color="text.secondary" >
              Email: add email
            </Typography>
            <Typography variant="body2" color="text.secondary" >
              Tel: add tell
            </Typography>  
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="text.primary" gutterBottom >
              Redes Sociais
            </Typography>
            <Typography variant="body2">
                <FacebookIcon color="primary" />
            </Typography>
            <Typography variant="body2">
                <InstagramIcon color="primary" />
            </Typography>
            <Typography variant="body2">
                <TwitterIcon color="primary" />
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center" >
            {"Copyright © "}
            <Link color="inherit" href="" >
              NEI.
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  </div>
  )
}


export default Footer
