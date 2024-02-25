import React, { useState } from 'react';
import { Box, Button, Container, MobileStepper, Paper, ThemeProvider, Typography, createTheme, useTheme } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

export default function Carousel({data, maxWidth}) {
  const defaultTheme = createTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const maxSteps = data.length;


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="xl" sx={{ marginTop: '30px' , marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div>
      <Box
        sx={{
          maxWidth: maxWidth, 
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center', // Centraliza a imagem
          alignItems: 'center', // Alinha verticalmente
        }}
      >
        <img
          src={data[activeStep].image}
          alt={data[activeStep].name}
          style={{ width: '100%', height: 'auto' }} // Ajusta a imagem para caber no container
        />
      </Box>
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: maxWidth, flexGrow: 1 }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Seguinte
            {defaultTheme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {defaultTheme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Anterior
          </Button>
        }
      />
        </div>
      </Container>
    </ThemeProvider>
  )
}