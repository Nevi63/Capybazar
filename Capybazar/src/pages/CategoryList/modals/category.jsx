import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from "@mui/material";

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
            alert("El nombre de la categoría no puede estar vacío.");
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
                alert(`Categoría ${action === 'edit' ? 'editada' : 'creada'} exitosamente`);
                setNombre('');
                onCategoryCreated();
                onClose();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error al crear la categoría:', error);
        }
  };
  
  

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
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
