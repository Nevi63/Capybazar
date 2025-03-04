import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
function productList() {
    const columns = [
      { field: 'nombre', headerName: 'Nombre', width: 200 },
      { field: 'precio', headerName: 'Precio', width: 90, type: 'number'},
      {
        field: 'descripcion',
        headerName: 'Descripcion',
        width: 600,
      },
      {
        field: 'acciones',
        headerName: 'Acciones',
        sortable: false,
        width: '400',
        renderCell: (params) => (
            <div>
                <Button sx={{m:1}} variant="contained" color="warning" onClick={() => handleView(params.row)}>
                    <VisibilityIcon />
                </Button>
                <Button sx={{m:1}}  variant="contained" color="success" onClick={() => handleEdit(params.row)}>
                    <EditIcon />
                </Button>
                <Button sx={{m:1}} variant="contained" color="error" onClick={() => handleDelete(params.row.id)}>
                    <DeleteIcon />
                </Button>
            </div>
        ),
    },
    ];
    
    const rows = [
      { id: 1, nombre: 'Luna Snow', precio: 100, descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde ipsa consectetur numquam doloribus libero fuga quod? Quis ex voluptatum neque." },
      { id: 2, nombre: 'Mantis', precio: 200, descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde ipsa consectetur numquam doloribus libero fuga quod? Quis ex voluptatum neque." },
      { id: 3, nombre: 'Adam Warlock', precio: 120, descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde ipsa consectetur numquam doloribus libero fuga quod? Quis ex voluptatum neque." },
      { id: 4, nombre: 'Rocket', precio: 235, descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde ipsa consectetur numquam doloribus libero fuga quod? Quis ex voluptatum neque." },
      { id: 5, nombre: 'Invisible Woman', precio: 58, descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde ipsa consectetur numquam doloribus libero fuga quod? Quis ex voluptatum neque." },
      { id: 6, nombre: 'Loki', precio: 160, descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde ipsa consectetur numquam doloribus libero fuga quod? Quis ex voluptatum neque." },
      { id: 7, nombre: 'Cloak & Dagger', precio: 50, descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde ipsa consectetur numquam doloribus libero fuga quod? Quis ex voluptatum neque." },
    ];
    
    const paginationModel = { page: 0, pageSize: 5 };
  return (
    <div style={{padding: '2rem'}}>
        <span style={{display: "flex", justifyContent:"space-between", alignItems: "baseline"}}>
            <h1>Lista de productos</h1>
            <Button color='primary' variant="contained"> + Crear Producto</Button>
        </span>
      <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
    </div>
  )
}

export default productList
