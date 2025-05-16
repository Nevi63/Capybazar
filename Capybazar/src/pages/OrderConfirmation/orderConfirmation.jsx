import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

function orderConfirmation() {
  const navigate = useNavigate();

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
