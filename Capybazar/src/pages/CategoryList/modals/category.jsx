import React from 'react'
import { Box, TextField, Button, IconButton } from "@mui/material";

function Category(prop) {

  return (
    <Box sx={{display:'flex', flexDirection:'column', gap:2, p:2}}>
      {prop.action === 'create' ?( <h1>Crear categoría</h1>):(<h1>Editar categoría</h1>)}
      <TextField
        required
        id="filled-required"
        label="Correo"
        defaultValue=""
        color="secondary"
        variant="filled"
        focused 
      />
      <Button sx={{alignSelf:'center', height:'40px'}} color='primary' variant='contained'>{prop.action == 'create' ?( <p>Crear categoría</p>):(<p>Editar categoría</p>)}</Button>
      
    </Box>
  )
}

export default Category
