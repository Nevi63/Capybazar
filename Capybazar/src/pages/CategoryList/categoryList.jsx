import React from 'react'
import { Box, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
function categoryList() {
  const columns = [
      { field: 'nombre', headerName: 'Nombre', width: 600 },
      {
        field: 'acciones',
        headerName: 'Acciones',
        sortable: false,
        width: '600',
        renderCell: (params) => (
            <div>
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
    { id: 1, nombre: 'Luna Snow'},
    { id: 2, nombre: 'Mantis' },
    { id: 3, nombre: 'Adam Warlock'},
    { id: 4, nombre: 'Rocket' },
    { id: 5, nombre: 'Invisible Woman' },
    { id: 6, nombre: 'Loki'},
    { id: 7, nombre: 'Cloak & Dagger' },
  ];
  
  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <Box sx={{p:3}}>
      <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
        <h1>Lista de categorías</h1>
        <Button color='primary' variant='contained'><AddIcon></AddIcon> Crear categoría</Button>
      </Box>
      <Paper sx={{ height: 400, width: '100%' }}>
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

export default categoryList
