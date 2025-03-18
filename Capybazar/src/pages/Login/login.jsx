import React, { useState } from 'react';
import { Box, TextField, Button, IconButton } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import bgImage from '../../assets/images/capybarabackground3.jpg';
import { Link, useNavigate } from "react-router-dom";

function login() {

  const [formData, setFormData] = useState({
      email: '',
      password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');

      try {
          const response = await fetch(`http://localhost:5000/users/${formData.email}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData)
          });

          const data = await response.json();
          if (response.ok) {
              alert('Inicio de sesión exitoso');
              localStorage.setItem('token', data.token); // Guardar el token
              localStorage.setItem('userType', data.user.userType); // Guardar el token
              navigate('/'); // Redirigir al home o dashboard
          } else {
              setError(data.message);
          }
      } catch (error) {
          setError('Error al conectar con el servidor');
          console.error('Error en el login:', error);
      }
  };

  return (
    <div
    style={{
      display:'flex',
      alignItems: 'center',
      height: '100vh',
      justifyContent:'space-around',
      backgroundImage: `url(${bgImage})`
    }}>
      <Box 
      sx={{ 
        backgroundColor: "primary.main", 
        display: 'flex', 
        flexDirection: 'column',
        margin: '3rem',
        padding: '2.5rem',
        minHeight: 'auto',
        height: 'fit-content',
        borderRadius: '10px',
        width:'35%'}}>
        <span style={{display: 'flex'}}>
          <Link to='/'>
            <IconButton
              sx={{
                color:  "black" 
              }}
              > <ArrowBackIosIcon /> 
            </IconButton>
          </Link>
          <h1 style={{margin: '0', fontWeight:'normal', color:'inherit'}}>Inicio de sesión</h1>
        </span>

        <form onSubmit={handleSubmit}>
            <TextField
                required
                fullWidth
                name="email"
                label="Correo"
                variant="filled"
                color="secondary"
                focused
                onChange={handleChange}
                value={formData.email}
            />
            <TextField
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                variant="filled"
                color="secondary"
                focused
                onChange={handleChange}
                value={formData.password}
            />
            {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

            <Button
            fullWidth
                type="submit"
                color='secondary'
                variant='contained'
                sx={{ my: 2, display: 'block', textTransform: 'none', fontSize: 16 }}>
                Iniciar sesión
            </Button>
        </form>

        <span style={{color:"brown"}}>¿Todavía no tienes una cuenta? <Link to="/signup" style={{color:"brown", textDecoration:"none", fontWeight:"bold"}}>Registrarse</Link></span>
      </Box>
    </div>
  )
}

export default login