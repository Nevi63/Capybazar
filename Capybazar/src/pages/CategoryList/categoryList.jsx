import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Category from './modals/category';
import Modal from '@mui/material/Modal';

function categoryList() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 }); // 🔹 Estado para la paginación

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
        const token = localStorage.getItem('token'); // Obtener el token guardado
        const response = await fetch('http://localhost:5000/categories', { // 🔹 Corrección del endpoint
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        setCategories(data);
    } catch (error) {
        console.error('Error al obtener categorías:', error);
    }
};


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const columns = [
    { field: 'nombre', headerName: 'Nombre', width: 600 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      sortable: false,
      width: 600,
      renderCell: (params) => (
        <div>
          <Button sx={{ m: 1 }} variant="contained" color="success" onClick={handleOpenUpdate}>
            <EditIcon />
          </Button>
          <Button sx={{ m: 1 }} variant="contained" color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h1>Lista de categorías</h1>
        <Button onClick={handleOpen} color='primary' variant='contained'>
          <AddIcon /> Crear categoría
        </Button>

        <Modal open={open} onClose={handleClose}>
          <Box sx={{
            position: 'absolute',
            borderRadius: '10px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            border: '0',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}>
            <Category action={'create'} onClose={handleClose} onCategoryCreated={fetchCategories} />
          </Box>
        </Modal>
      </Box>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={categories.map((cat, index) => ({ id: index + 1, nombre: cat.name }))}
          columns={columns}
          pageSizeOptions={[5]} // 🔹 Máximo 5 categorías por página
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
}

export default categoryList;
