import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function orderConfirmation() {
  const navigate = useNavigate();

    useEffect(() => {
      const random = Math.floor(Math.random() * 90) + 1; // 1 a 5
      var selectedAudio = 'capybaracorto.mp3';
      if(random === 90){
        const random2 = Math.floor(Math.random() * 2) + 1; // 1 o 2
        if(random2 === 1){
          selectedAudio = 'homero.mp3';
          console.log( "gano el 50 50 gg");
        }else{
          selectedAudio = 'sefuelaluz.mp3';
          console.log( "perdio el 50 50 gg");
        }

      }
      console.log(random, selectedAudio);
      const audio = new Audio(`/sounds/${selectedAudio}`);
      audio.volume = 0.8;

    audio.play().catch(err => {
      console.warn('🔇 El navegador bloqueó la reproducción automática:', err);
    });
  }, []);

  return (
    <Box 
      sx={{ 
        minHeight: '80vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center', 
        p: 3 
      }}
    >
      <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        ¡Gracias por tu compra!
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Tu orden se ha completado exitosamente.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Volver al inicio
      </Button>
    </Box>
  );
}

export default orderConfirmation;
