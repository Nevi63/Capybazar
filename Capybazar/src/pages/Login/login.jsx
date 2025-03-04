import React from 'react'
import { Box, TextField, Button, IconButton } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import bgImage from '../../assets/images/capybarabackground3.jpg'
import { Link } from "react-router";

function login() {
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
          <IconButton
            sx={{
              color:  "black" 
            }}
          > <ArrowBackIosIcon /> 
          </IconButton>
          <h1 style={{margin: '0', fontWeight:'normal', color:'inherit'}}>Inicio de sesión</h1>
        </span>
        <TextField
          required
          id="filled-required"
          label="Correo"
          defaultValue=""
          color="secondary"
          variant="filled"
          focused 
        />
        <TextField
          id="filled-password-input"
          label="Password"
          type="password"
          color="secondary"
          autoComplete="current-password"
          variant="filled"
          focused 
        />
        <Button
        color='secondary'
        variant='contained'
        sx={{ my: 2, display: 'block',  textTransform: 'none', fontSize: 16  }}
        >Iniciar sesión</Button>
        <span style={{color:"brown"}}>¿Todavía no tienes una cuenta? <Link to="/signup" style={{color:"brown", textDecoration:"none", fontWeight:"bold"}}>Registrarse</Link></span>
      </Box>
    </div>
  )
}

export default login