import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from "@mui/material";
import Swal from 'sweetalert2'
import './cat.css'
function category({ action, id, nombreProp, onClose, onCategoryCreated }) {
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        if (action === 'edit' && nombreProp) {
          setNombre(nombreProp);
          console.log(id, nombreProp)
        }
    }, [action, nombreProp]);

    const handleChange = (e) => {
        setNombre(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!nombre.trim()) {
            // Mostrar SweetAlert si el nombre está vacío
            await Swal.fire({
                title: "Error",
                text: "El nombre de la categoría no puede estar vacío.",
                icon: "error"
            });
            return;
        }
    
        try {
            const token = localStorage.getItem('token'); 
            console.log("Token enviado:", token); // 👀 Verificar token
            console.log("Enviando datos al backend:", JSON.stringify({ nombre })); // 👀 Verificar datos antes de enviarlos
            
            
            const url = action === 'edit' 
            ? `http://localhost:5000/categories/${id}`
            : 'http://localhost:5000/categories/create';

            const method = action === 'edit' ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ nombre }) // 🔹 Asegurar que se envíe como JSON válido
            });
    
            const data = await response.json();
            console.log("Respuesta del servidor:", data); // 👀 Depuración
    
            if (response.ok) {
                await Swal.fire({
                    title: `Categoría ${action === 'edit' ? 'editada' : 'creada'} exitosamente`,
                    icon: "success"
                });
                setNombre('');
                onCategoryCreated();
                onClose();
            } else {
                await Swal.fire({
                    title: "Error",
                    text: data.message,
                    icon: "error"
                });
            }
        } catch (error) {
            console.error('Error al crear la categoría:', error);
            await Swal.fire({
                title: "Error",
                text: "Hubo un error al procesar la solicitud.",
                icon: "error"
            });
        }
  };
  
  

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, zIndex:0 }}>
            <h1>{action === 'create' ? 'Crear categoría' : 'Editar categoría'}</h1>
            <TextField
                required
                label="Nombre de la categoría"
                fullWidth
                variant="filled"
                color="secondary"
                focused
                value={nombre}
                onChange={handleChange}
            />
            <Button sx={{ alignSelf: 'center', height: '40px' }} color='primary' variant='contained' onClick={handleSubmit}>
                {action === 'create' ? 'Crear categoría' : 'Editar categoría'}
            </Button>
        </Box>
    );
}

export default category;
