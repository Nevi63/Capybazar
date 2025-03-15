import { Box, TextField, Button} from '@mui/material'
import React from 'react'
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function editProfile() {
  return (
    <Box sx={{p:7}}>
      <Box sx={{backgroundColor:'primary.main', p:2, py:6, borderRadius:'15px'}}>
        <Box  sx={{display:'flex', flexDirection:{sm:'column', md:'row'}, justifyContent:'space-evenly', width:'100%'}}>

            <Box sx={{display:'flex', flexDirection:'column', flexBasis:'35%', m:1}}>
                <h1  style={{fontWeight:'normal', margin:0}}>Editar usuario</h1>
                <TextField
                    sx={{m:1}}
                    required
                    id="filled-required"
                    label="Nombre(s)"
                    defaultValue=""
                    color="secondary"
                    variant="filled"
                    focused 
                />
                <TextField
                    sx={{m:1}}
                    required
                    id="filled-required"
                    label="Apellido(s)"
                    defaultValue=""
                    color="secondary"
                    variant="filled"
                    focused 
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Select Date"
                        sx={{
                            mx:1,
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
                <TextField
                    sx={{m:1}}
                    required
                    id="filled-required"
                    label="Correo"
                    defaultValue=""
                    color="secondary"
                    variant="filled"
                    focused 
                />
                <Button sx={{my:1}} variant='contained' color='secondary'>Guardar Datos</Button>
            </Box>
            <Box sx={{display:'flex', flexDirection:'column', flexBasis:'30%', justifyContent:'center', m:1}}>
                <h1 style={{fontWeight:'normal', margin:0}}>Editar Contraseña</h1>
                <TextField
                    sx={{m:1}}
                    required
                    type='password'
                    id="filled-required"
                    label="Contraseña"
                    defaultValue=""
                    color="secondary"
                    variant="filled"
                    focused 
                />
                <TextField
                    sx={{m:1}}
                    required
                    type='password'
                    id="filled-required"
                    label="Confirmar contraseña"
                    defaultValue=""
                    color="secondary"
                    variant="filled"
                    focused 
                />
                <Button sx={{my:1}} variant='contained' color='secondary'>Editar contraseña</Button>
            </Box>
            <Box sx={{display:'flex', flexDirection:'column', flexBasis:'20%', justifyContent:'center', m:1}}>
                <h1 style={{fontWeight:'normal', margin: 0}}>Editar foto de perfil</h1>
                <Box 
                    component={'img'} 
                    src='https://media1.tenor.com/m/KUUtQs-OOHAAAAAd/rana-que-salta-meme-meme-rana.gif'
                    sx={{height:'120px', width:'120px', borderRadius:'50%', alignSelf:'center', m:2}}
                    />
                <Button sx={{my:1}} variant='contained' color='secondary'>Subir foto</Button>
            </Box>
        </Box>
        <Box  sx={{display:'flex',flexDirection:{sm:'column', md:'row'}, justifyContent:'flex-end', width:'100%', px:1}}>
            <Button size='large' sx={{ mr:{ sm:0, md:4}, alignSelf:'flex-end', width:{sm:'100%', md:'auto'}}} variant='contained' color='error'>Eliminar cuenta</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default editProfile
