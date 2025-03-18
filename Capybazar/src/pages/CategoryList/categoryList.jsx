import {React, useState} from 'react'
import { Box, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Category from './modals/category';
import Modal from '@mui/material/Modal';
import DeleteCategory from './modals/deleteCategory';

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
                <Button sx={{m:1}} variant="contained" color="success" onClick={handleOpenUpdate}>
                    <EditIcon />
                </Button>
                <Button sx={{m:1}} variant="contained" color="error" onClick={handleOpenDelete}>
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  return (
    <Box sx={{p:3}}>
      <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
        <h1>Lista de categorías</h1>
        <Button onClick={handleOpen} color='primary' variant='contained'><AddIcon></AddIcon> Crear categoría</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            borderRadius:'10px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
            bgcolor: 'background.paper',
            border: '0',
            boxShadow: 24,
            p: 4,
          }}>
          <Category action={'create'}></Category></Box>
        </Modal>
        <Modal
          open={openUpdate}
          onClose={handleCloseUpdate}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            borderRadius:'10px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
            bgcolor: 'background.paper',
            border: '0',
            boxShadow: 24,
            p: 4,
          }}>
          <Category></Category></Box>
        </Modal>
        <Modal
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            borderRadius:'10px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
            bgcolor: 'background.paper',
            border: '0',
            boxShadow: 24,
            p: 4,
          }}>
          <DeleteCategory></DeleteCategory></Box>
        </Modal>
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
