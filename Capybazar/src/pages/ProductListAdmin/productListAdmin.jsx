import React from 'react'
import { Button, Box } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';

function productListAdmin() {
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
      {
        field: 'acciones',
        headerName: 'Acciones',
        sortable: false,
        width: '200',
        renderCell: (params) => (
            <div>
                <Button sx={{m:1}} variant="contained" color="error" onClick={() => handleDelete(params.row.id)}>
                    <DeleteIcon />
                </Button>
                <Button sx={{m:1}} variant="contained" color="primary" onClick={() => handleMore(params.row.id)}>
                    <MoreVertIcon />
                </Button>
            </div>
        ),
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
        <h1>Lista de productos</h1>
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

export default productListAdmin
