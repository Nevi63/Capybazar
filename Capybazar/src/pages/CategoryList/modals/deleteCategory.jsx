import React from 'react'
import { Box, TextField, Button, IconButton } from "@mui/material";

function deleteCategory() {
  return (
      <Box sx={{display:'flex', flexDirection:'column', gap:2, p:2, alignItems:'center'}}>
        <h3>¿Estas seguro de que quieres eliminar esta categoría?</h3>
        <span style={{display:'flex', justifyContent:'center', gap:5}}>
            <Button sx={{alignSelf:'center', height:'40px'}} color='success' variant='contained'>Sí</Button>
            <Button sx={{alignSelf:'center', height:'40px'}} color='error' variant='contained'>No</Button>
        </span>
      </Box>
  )
}

export default deleteCategory
