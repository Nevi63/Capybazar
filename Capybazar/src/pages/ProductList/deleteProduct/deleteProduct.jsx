import React from 'react'
import { Box, Button } from "@mui/material";
import Swal from 'sweetalert2';

function deleteProduct({id, onClose, onProductDeleted }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const token = localStorage.getItem('token'); 
        console.log("Token enviado:", token); // 👀 Verificar token
        
        const url = `http://localhost:5000/products/${id}`

        const method ='DELETE';

        const response = await fetch(url, {
            method: method,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log("Respuesta del servidor:", data); // 👀 Depuración

        if (response.ok) {
            onProductDeleted();
            onClose();
            await Swal.fire({
              title: "Producto eliminado exitosamente",
              text: "✅✅✅",
              icon: "success"
            });
        } else {  
            await Swal.fire({
              title: "Sucedio un error",
              text: data.message,
              icon: "error"
            });
        }
    } catch (error) {
        console.error('Error al crear la categoría:', error);
    }
};

  return (
      <Box sx={{display:'flex', flexDirection:'column', gap:2, p:2, alignItems:'center'}}>
        <h3>¿Estas seguro de que quieres eliminar este producto?</h3>
        <span style={{display:'flex', justifyContent:'center', gap:5}}>
            <Button sx={{alignSelf:'center', height:'40px'}} color='success' variant='contained' onClick={handleSubmit}>Sí</Button>
            <Button sx={{alignSelf:'center', height:'40px'}} color='error' variant='contained' onClick={onClose}>No</Button>
        </span>
      </Box>
  )
}

export default deleteProduct
