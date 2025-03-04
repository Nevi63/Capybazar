import React from 'react'
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

function signup() {

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
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
          <IconButton
            sx={{
              color:  "black" 
            }}
          > <ArrowBackIosIcon /> 
          </IconButton>
          <h1 style={{margin: '0', fontWeight:'normal', color:'inherit'}}>Registro</h1>
        </span>
        <TextField
          required
          id="filled-required"
          label="Nombres"
          defaultValue=""
          color="secondary"
          variant="filled"
          focused 
        />
        <TextField
          required
          id="filled-required"
          label="Apellidos"
          defaultValue=""
          color="secondary"
          variant="filled"
          focused 
        />
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
        
        <FormControl variant="filled" color="secondary" focused sx={{  minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label">Tipo de usuario</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={age}
            onChange={handleChange}
          >
            <MenuItem value={10}>Vendedor</MenuItem>
            <MenuItem value={20}>Cliente</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
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
        <Button
        color='secondary'
        variant='contained'
        sx={{ my: 2, display: 'block',  textTransform: 'none', fontSize: 16  }}
        >Registrarse</Button>
        <span style={{color:"brown"}}>¿Ya tienes una cuenta? <Link to="/login" style={{color:"brown", textDecoration:"none", fontWeight:"bold"}}>Iniciar sesión</Link></span>

      </Box>
    </div>
  )
}

export default signup