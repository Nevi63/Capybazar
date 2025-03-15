import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Inventory() {
    const [isEditing, setIsEditing] = useState(false);
    const [rows, setRows] = useState([
        { id: 1, nombre: 'Luna Snow', precio: 100, descripcion: "Lorem ipsum...", cantidad: 4 },
        { id: 2, nombre: 'Mantis', precio: 200, descripcion: "Lorem ipsum...", cantidad: 3 },
        { id: 3, nombre: 'Adam Warlock', precio: 120, descripcion: "Lorem ipsum...", cantidad: 6 },
        { id: 4, nombre: 'Rocket', precio: 235, descripcion: "Lorem ipsum...", cantidad: 5 },
        { id: 5, nombre: 'Invisible Woman', precio: 58, descripcion: "Lorem ipsum...", cantidad: 4 },
        { id: 6, nombre: 'Loki', precio: 160, descripcion: "Lorem ipsum...", cantidad: 7 },
        { id: 7, nombre: 'Cloak & Dagger', precio: 50, descripcion: "Lorem ipsum...", cantidad: 3 },
    ]);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleCantidadChange = (id, value) => {
        setRows(prevRows => prevRows.map(row => row.id === id ? { ...row, cantidad: Number(value) } : row));
    };

    const columns = [
        { field: 'nombre', headerName: 'Nombre', width: 200 },
        { field: 'precio', headerName: 'Precio', width: 90, type: 'number' },
        { field: 'descripcion', headerName: 'Descripcion', width: 600 },
        {
            field: 'cantidad',
            headerName: 'Cantidad',
            width: 120,
            renderCell: (params) => (
                isEditing ? (
                    <TextField
                        type="number"
                        value={params.row.cantidad}
                        onChange={(e) => handleCantidadChange(params.row.id, e.target.value)}
                        size="small"
                    />
                ) : (
                    params.row.cantidad
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
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    sx={{ border: 0 }}
                />
            </Paper>
        </div>
    );
}

export default Inventory;
