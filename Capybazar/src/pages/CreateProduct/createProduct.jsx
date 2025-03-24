import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, IconButton } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import UploadIcon from '@mui/icons-material/Upload';

function createProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/categories', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setCategories(data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const product = {
      name: name.trim(),
      price: parseFloat(price),
      stock: parseInt(stock),
      categoryId,
      description: description.trim(),
      image: imageBase64
    };

    try {
      const response = await fetch('http://localhost:5000/products/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });

      const result = await response.json();
      if (response.ok) {
        alert("✅ Producto creado correctamente");
        setName('');
        setPrice('');
        setStock('');
        setCategoryId('');
        setDescription('');
        setImageBase64('');
      } else {
        alert("❌ Error: " + result.message);
      }
    } catch (err) {
      console.error("Error al crear el producto:", err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <h1>Crear Producto</h1>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Box sx={{ flex: 1 }}>
          <TextField
  required
  label="Product Name"
  variant="filled"
  fullWidth
  color="secondary"
  focused
  value={name}
  onChange={(e) => setName(e.target.value)}
  sx={{ margin: '1rem' }}
/>

<TextField
  required
  label="Price"
  type="number"
  variant="filled"
  fullWidth
  color="secondary"
  focused
  value={price}
  onChange={(e) => setPrice(e.target.value)}
  sx={{ margin: '1rem' }}
/>

<TextField
  required
  label="Stock"
  type="number"
  variant="filled"
  fullWidth
  color="secondary"
  focused
  value={stock}
  onChange={(e) => setStock(e.target.value)}
  sx={{ margin: '1rem' }}
/>

<FormControl fullWidth variant="filled" color="secondary" focused sx={{ margin: '1rem' }}>
  <InputLabel>Category</InputLabel>
  <Select
    value={categoryId}
    onChange={(e) => setCategoryId(e.target.value)}
  >
    {categories.map((cat) => (
      <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
    ))}
  </Select>
</FormControl>

<TextField
  label="Description"
  multiline
  rows={4}
  variant="filled"
  fullWidth
  color="secondary"
  focused
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  sx={{ margin: '1rem' }}
/>
          </Box>
          <Box sx={{
            width: '35%', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgb(254, 194, 142)', borderRadius: '10px', p: 3
          }}>
            <UploadIcon sx={{ fontSize: 100, color: 'secondary.main', mb: 2 }} />
            <Button component="label" color="secondary" variant="contained">
              Upload Image
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
            {imageBase64 && (
              <img src={imageBase64} alt="Preview" style={{ marginTop: '1rem', width: '100%', maxHeight: '200px', objectFit: 'contain' }} />
            )}
          </Box>
        </Box>
        <Button type="submit" variant="contained" color="secondary" sx={{ mt: 3 }}>
          Create Product
        </Button>
      </form>
    </Box>
  );
}

export default createProduct
