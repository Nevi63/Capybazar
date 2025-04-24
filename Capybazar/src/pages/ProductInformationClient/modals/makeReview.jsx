import React, { useState } from 'react';
import { Box, TextField, Button, IconButton } from "@mui/material";
import { Star, StarBorder } from '@mui/icons-material';
import Swal from 'sweetalert2';
import './cat.css';

function makeReview({ productId, onClose, onReviewCreated }) {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
    
  const handleSubmit = async () => {
    if (!rating || !review) {
      Swal.fire('Error', 'Debes escribir una reseña y asignar una calificación', 'error');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId, rating, review })
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire('¡Gracias!', 'Tu reseña ha sido enviada', 'success');
        onReviewCreated?.();
        onClose?.();
      } else {
        Swal.fire('Error', data.message || 'No se pudo enviar la reseña', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'Error de conexión con el servidor', 'error');
    }
  };

  

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, zIndex:0 }}>
      <h1>Hacer una Review</h1>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <IconButton key={star} onClick={() => setRating(star)}>
            {rating >= star ? <Star color="warning" /> : <StarBorder />}
          </IconButton>
        ))}
      </Box>

      <TextField
        required
        label="Escribe tu reseña"
        fullWidth
        multiline
        rows={4}
        variant="filled"
        color="secondary"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <Button
        sx={{ alignSelf: 'center', height: '40px' }}
        color="primary"
        variant="contained"
        onClick={handleSubmit}
      >
        Subir review
      </Button>
    </Box>
  )
}

export default makeReview
