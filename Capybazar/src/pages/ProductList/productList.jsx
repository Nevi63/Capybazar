import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import DeleteProduct from './deleteProduct/deleteProduct';
function productList() {
  const [products, setProducts] = useState([]);
  const paginationModel = { page: 0, pageSize: 5 };
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);  // Estado para la categoría seleccionada

  const handleOpenDelete  = (product) => {
    setSelectedProduct(product);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/products', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const handleView = (row) => { /* lógica para ver producto */ };
  const handleEdit = (row) => { navigate(`/editProduct/${row.id}`); };
  const handleDelete = (id) => {  handleOpenDelete(id) };

  const columns = [
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'price', headerName: 'Precio', width: 90, type: 'number' },
    {
      field: 'description',
      headerName: 'Descripción',
      width: 600,
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      sortable: false,
      width: 400,
      renderCell: (params) => (
        <div>
          <Button sx={{ m: 1 }} variant="contained" color="warning" onClick={() => handleView(params.row)}>
            <VisibilityIcon />
          </Button>
          <Button sx={{ m: 1 }} variant="contained" color="success" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </Button>
          <Button sx={{ m: 1 }} variant="contained" color="error" onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <span style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h1>Lista de productos</h1>
        <Button 
          color='primary' 
          variant="contained" 
          onClick={() => navigate('/createProduct')}
        >
          + Crear Producto
        </Button>
      </span>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={products.map((p) => ({ id: p._id, ...p }))}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
      <Modal open={openDelete} onClose={handleCloseDelete}>
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
            <DeleteProduct
              onProductDeleted={fetchProducts}
              id={selectedProduct} 
              onClose={handleCloseDelete}  />
          </Box>
        </Modal>
    </div>
  );
}

export default productList;
