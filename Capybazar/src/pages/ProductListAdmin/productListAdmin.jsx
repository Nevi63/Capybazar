import React, { useEffect, useState } from 'react';
import { Button, Box, Paper } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';

function productListAdmin() {
  const [products, setProducts] = useState([]);
  const paginationModel = { page: 0, pageSize: 5 };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/products/admin', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const data = await res.json();
      console.log("📦 Productos recibidos:", data); // 👈 VERIFICAMOS
      setProducts(data);
    } catch (error) {
      console.error("❌ Error al obtener productos:", error);
    }
  };
  

  const handleDelete = (id) => {
    // Por ahora puedes mostrar confirmación
    alert(`Eliminar producto con ID: ${id}`);
  };

  const handleMore = (id) => {
    alert(`Ver más del producto con ID: ${id}`);
  };

  const columns = [
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'price', headerName: 'Precio', width: 90, type: 'number' },
    {
      field: 'category',
      headerName: 'Categoría',
      width: 150,
      renderCell: (params) => {
        const catName = params?.row?.categoryId?.name;
        return catName || 'Sin categoría';
      }
    },
    {
      field: 'seller',
      headerName: 'Vendedor',
      width: 180,
      renderCell: (params) => {
        const user = params?.row?.userId;
        return user ? `${user.firstName} ${user.lastName}` : 'Desconocido';
      }
    },
    {
      field: 'description',
      headerName: 'Descripción',
      width: 500,
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <div>
          <Button sx={{ m: 1 }} variant="contained" color="error" onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </Button>
          <Button sx={{ m: 1 }} variant="contained" color="primary" onClick={() => handleMore(params.row._id)}>
            <MoreVertIcon />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ p: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h1>Lista de productos</h1>
      </Box>
      <Paper sx={{ height: 500, width: '100%', margin: 'auto' }}>
        <DataGrid
          rows={products.map((p) => ({ ...p, id: p._id }))}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
}

export default productListAdmin;
