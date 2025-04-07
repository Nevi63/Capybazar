import React, { useState } from 'react';
import { Box, TextField, Button, IconButton } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import bgImage from '../../assets/images/capybarabackground.jpg'
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from "react-router";
import Swal from 'sweetalert2';
function signup() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: 'cliente',
    birthdate: null
});

// Manejar cambios en los campos de texto
const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

// Manejar cambio de fecha
const handleDateChange = (date) => {
    setFormData({ ...formData, birthdate: date });
};

// Manejar envío del formulario
const handleSubmit = async (e) => {
    e.preventDefault();

    
    const { firstName, lastName, email, password, birthdate } = formData;

    // Validar campos vacíos
    if (!firstName || !lastName || !email || !password || !birthdate) {
      await Swal.fire({
        title: "Campos incompletos",
        text: "Por favor completa todos los campos.",
        icon: "warning"
      });
      return;
    }

    // Validar correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      await Swal.fire({
        title: "Correo inválido",
        text: "Ingresa un correo electrónico válido.",
        icon: "error"
      });
      return;
    }

    // Validar contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      await Swal.fire({
        title: "Contraseña inválida",
        text: "Debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo.",
        icon: "error"
      });
      return;
    }

    try {
        const response = await fetch('http://localhost:5000/users/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        if (response.ok) {
            await Swal.fire({
              title: "Se registro el usuario exitosamente",
              text: "✅✅✅",
              icon: "success"
            });
            setFormData({ firstName: '', lastName: '', email: '', password: '', userType: 'cliente', birthdate: null });
        } else {
            
          await Swal.fire({
            title: "Sucedio un error",
            text: data.message,
            icon: "error"
          });
        }
    } catch (error) {
        console.error('Error en el registro:', error);
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
          <Link to="/">
            <IconButton
              sx={{
                color:  "black" 
              }}
              > <ArrowBackIosIcon /> 
            </IconButton>
          </Link>
          <h1 style={{margin: '0', fontWeight:'normal', color:'inherit'}}>Registro</h1>
        </span>
        <form onSubmit={handleSubmit}>
          <TextField  fullWidth name="firstName" label="Nombres" variant="filled" color="secondary" focused onChange={handleChange} value={formData.firstName} />
          <TextField  fullWidth name="lastName" label="Apellidos" variant="filled" color="secondary" focused onChange={handleChange} value={formData.lastName} />
          <TextField  fullWidth type="email" name="email" label="Correo" variant="filled" color="secondary" focused onChange={handleChange} value={formData.email} />
          <TextField  fullWidth type="password" name="password" label="Contraseña" variant="filled" color="secondary" focused onChange={handleChange} value={formData.password} />
        
          


          <FormControl fullWidth variant="filled" color="secondary" focused sx={{ mt:2, minWidth: 120 }}>
              <InputLabel>Tipo de usuario</InputLabel>
              <Select name="userType" value={formData.userType} onChange={handleChange}>
                  <MenuItem value="cliente">Cliente</MenuItem>
                  <MenuItem value="vendedor">Vendedor</MenuItem>
              </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de Nacimiento"
              value={formData.birthdate}
              onChange={handleDateChange}
              required
              disableFuture
              sx={{
                marginTop: "1rem",
                marginBottom: "0.5rem",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "brown" },
                  "&:hover fieldset": { borderColor: "saddlebrown" },
                  "&.Mui-focused fieldset": { borderColor: "sienna" },
                },
                "& .MuiInputLabel-root": { color: "brown" }, // Color normal
                "& .MuiInputLabel-root.Mui-focused": { color: "sienna" }, // Color cuando está en focus
                "& .MuiSvgIcon-root": { color: "brown" },
              }}
            />
          </LocalizationProvider>

          <Button fullWidth type="submit" color='secondary' variant='contained' sx={{ my: 2, textTransform: 'none', fontSize: 16 }}>
                        Registrarse
          </Button>
        </form>

        <span style={{color:"brown"}}>¿Ya tienes una cuenta? <Link to="/login" style={{color:"brown", textDecoration:"none", fontWeight:"bold"}}>Iniciar sesión</Link></span>

      </Box>
    </div>
  )
}

export default signup