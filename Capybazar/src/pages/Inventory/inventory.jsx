import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Inventory() {
    const [isEditing, setIsEditing] = useState(false);
    const [products, setProducts] = useState([]);

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
    const saveChanges = async () => {
        const token = localStorage.getItem('token');

        try {
            const promises = products.map(async (product) => {
                const response = await fetch(`http://localhost:5000/products/${product._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        stock: product.stock
                    })
                });

                if (!response.ok) {
                    const result = await response.json();
                    console.error(`❌ Error en producto ${product._id}:`, result.message);
                }
            });

            await Promise.all(promises);
            
            alert('✅ Cambios guardados correctamente');
            setIsEditing(false);
            fetchProducts();  // Vuelve a cargar los productos
        } catch (error) {
            console.error('❌ Error al guardar cambios:', error);
            alert('Error al guardar cambios');
        }
    };

    const handleEditClick = () => {
        if (isEditing) {
            saveChanges();  // Guarda los cambios solo al hacer clic en "Guardar"
        }
        setIsEditing(!isEditing);
    };

    const handleCantidadChange = (id, value) => {
        setProducts((prevProducts) => 
            prevProducts.map((product) => 
                product._id === id ? { ...product, stock: Number(value) } : product
            )
        );
    };

    const columns = [
        { field: 'name', headerName: 'Nombre', width: 200 },
        { field: 'price', headerName: 'Precio', width: 90, type: 'number' },
        { field: 'description', headerName: 'Descripcion', width: 600 },
        {
            field: 'stock',
            headerName: 'Cantidad',
            width: 120,
            renderCell: (params) => (
                isEditing ? (
                    <TextField
                        type="number"
                        value={params.row.stock}
                        onChange={(e) => handleCantidadChange(params.row.id, e.target.value)}
                        size="small"
                    />
                ) : (
                    params.row.stock
                )
            )
        }
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <span style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h1>Inventory</h1>
                <Button color='primary' variant="contained" onClick={handleEditClick}>
                    {isEditing ? 'Guardar' : 'Editar Inventario'}
                </Button>
            </span>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={products.map((p) => ({ id: p._id, ...p }))}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    sx={{ border: 0 }}
                />
            </Paper>
        </div>
    );
}

export default Inventory;
