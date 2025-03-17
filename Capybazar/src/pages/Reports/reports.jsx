import {React, useState} from 'react'
import { Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function reports() {
      const [age, setAge] = useState('');
                
                const handleChange = (event) => {
                 setAge(event.target.value);
                };
    const columns = [
        { field: 'nombre', headerName: 'Nombre', width: 200 },
        { field: 'precio', headerName: 'Precio', width: 90, type: 'number'},
        {
          field: 'categoria',
          headerName: 'Categoría',
          width: 150,
        },
        {
          field: 'vendedor',
          headerName: 'Vendedor',
          width: 150,
        },
        {
          field: 'descripcion',
          headerName: 'Descripcion',
          width: 500,
        },
        
      ];
      
      const rows = [
        { id: 1, nombre: 'Luna Snow', precio: 100, categoria:'huh', vendedor:'tilin', descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde ipsa consectetur numquam doloribus libero fuga quod? Quis ex voluptatum neque." },
        { id: 2, nombre: 'Mantis', precio: 200,  categoria:'si', vendedor:'tilin', descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde ipsa consectetur numquam doloribus libero fuga quod? Quis ex voluptatum neque." },
        { id: 3, nombre: 'Adam Warlock', precio: 120, categoria:'no', vendedor:'tilin', descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde ipsa consectetur numquam doloribus libero fuga quod? Quis ex voluptatum neque." },
        { id: 4, nombre: 'Rocket', precio: 235, categoria:'huh', vendedor:'tilin', descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde ipsa consectetur numquam doloribus libero fuga quod? Quis ex voluptatum neque." },
        { id: 5, nombre: 'Invisible Woman', precio: 58, categoria:'no', vendedor:'tilin', descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde ipsa consectetur numquam doloribus libero fuga quod? Quis ex voluptatum neque." },
        { id: 6, nombre: 'Loki', precio: 160, categoria:'si', vendedor:'tilin', descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde ipsa consectetur numquam doloribus libero fuga quod? Quis ex voluptatum neque." },
        { id: 7, nombre: 'Cloak & Dagger', precio: 50, categoria:'huh', vendedor:'tilin', descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde ipsa consectetur numquam doloribus libero fuga quod? Quis ex voluptatum neque." },
      ];
      const paginationModel = { page: 0, pageSize: 5 };
  return (
    <Box sx={{p:5}}>
      <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
        <h1>Reportes</h1>
      </Box>
      <Box sx={{m:3}}>
        <FormControl sx={{width:'200px', alignSelf:'center', backgroundColor: 'white'}} color='secondary' variant="filled">
            <InputLabel id="demo-simple-select-label">Reportes</InputLabel>
            <Select 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Reportes"
                onChange={handleChange}
            >
                <MenuItem value={1}>Ventas por fecha</MenuItem>
                <MenuItem value={2}>Rating</MenuItem>
                <MenuItem value={3}>Ganancias</MenuItem>
                <MenuItem value={4}>huh?</MenuItem>
            </Select>
        </FormControl>
        <FormControl sx={{width:'200px', alignSelf:'center', backgroundColor: 'white', ml: 3}} color='secondary' variant="filled">
            <InputLabel id="demo-simple-select-label">Filtros</InputLabel>
            <Select 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Filtros"
                onChange={handleChange}
            >
                <MenuItem value={1}>Ascendente</MenuItem>
                <MenuItem value={2}>Descendente</MenuItem>
            </Select>
        </FormControl>
      </Box>
      <Paper sx={{ height: 400, width: '100%', margin: 'auto' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  )
}

export default reports
