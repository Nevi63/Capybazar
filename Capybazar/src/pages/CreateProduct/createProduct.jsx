import React from 'react'
import { Box, TextField, Button, IconButton } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import UploadIcon from '@mui/icons-material/Upload';

function createProduct() {
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div style={{ padding: '2rem'}}>
      <h1>Crear Producto</h1>
      <form  style={{justifyItems:'center'}}>
        <div style={{display: "flex", flexDirection:"row", width:'100%'}}>
            <div style={{display: "flex", flexDirection:"column", width:'50%'}}>
                <TextField
                    required
                    id="filled-required"
                    label="Nombre del producto"
                    defaultValue=""
                    color="secondary"
                    variant="filled"
                    focused 
                    sx={{margin:'1rem'}}
                />
                <TextField
                    required
                    id="filled-required"
                    label="Precio"
                    type="number"
                    defaultValue=""
                    color="secondary"
                    variant="filled"
                    focused 
                    sx={{margin:'1rem'}}
                />
                <FormControl variant="filled" color="secondary" focused sx={{margin:'1rem'}}>
                <InputLabel id="demo-simple-select-filled-label">Categoría</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={age}
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Categoria 1</MenuItem>
                    <MenuItem value={20}>Categoria 2</MenuItem>
                </Select>
                </FormControl>
                <TextField
                id="standard-textarea"
                label="Descripción"
                multiline
                focused
                rows={4}
                color="secondary"
                variant="filled"
                    sx={{margin:'1rem'}}
                />
            </div>
            <div style={{width:'35%', margin:'auto', }}>
                <div 
                style={{
                    backgroundColor:'rgb(254, 194, 142)', 
                    borderRadius: '10px', 
                    display:'flex', 
                    flexDirection:'column',
                    width:'100%',
                    alignItems:'center',
                    padding:'2rem',
                    paddingTop: '3rem',
                    paddingBottom: '3rem'
                    }}>
                    <UploadIcon sx={{color:'secondary.main', justifySelf:'center', fontSize:'120px'}}></UploadIcon>
                    <Button color="secondary" variant="contained">Subir foto</Button>
                </div>
            </div>
        </div>
        <Button color='secondary' variant='contained'>Crear producto</Button>
      </form>
    </div>
  )
}

export default createProduct
