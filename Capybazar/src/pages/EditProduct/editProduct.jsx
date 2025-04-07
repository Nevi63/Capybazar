import React, { useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import { Box, TextField, Button, IconButton } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import UploadIcon from '@mui/icons-material/Upload';
import Swal from 'sweetalert2'

function editProduct() {
  const { productId } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
      fetchCategories();
      fetchProduct();
  }, []);

  const fetchProduct = async () =>{
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        setName(data.name);
        setPrice(data.price);
        setDescription(data.description);
        setCategoryId(data.categoryId._id);
        setImageBase64(data.image);
        setStock(data.stock);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
  }
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

  
  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = "El nombre del producto es obligatorio";
    if (!price || isNaN(price) || price <= 0) errors.price = "El precio debe ser un número positivo";
    if (!stock || isNaN(stock) || stock <= 0) errors.stock = "El stock debe ser un número entero positivo";
    if (!categoryId) errors.categoryId = "Debe seleccionar una categoría";
    if (!description.trim()) errors.description = "La descripción es obligatoria";
    if (!imageBase64) errors.image = "Debe subir una imagen";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

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
      const response = await fetch(`http://localhost:5000/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });

      const result = await response.json();
      if (response.ok) {
         await Swal.fire({
           title: "✅ Producto editadp correctamente",
           text: "✅✅✅",
           icon: "success"
         });
        navigate('/productList');  // Redirige a la lista de productos

      } else {
        await Swal.fire({
          title: "Sucedio un error",
          text: result.message,
          icon: "error"
        });
      }
    } catch (err) {
      console.error("Error al crear el producto:", err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <h1>Editar Producto</h1>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Box sx={{ flex: 1 }}>
          <TextField
  //required
  label="Product Name"
  variant="filled"
  fullWidth
  color="secondary"
  focused
  value={name}
  onChange={(e) => setName(e.target.value)}
  sx={{ margin: '1rem' }}
  error={!!errors.name}
  helperText={errors.name}
/>

<TextField
  //required
  label="Price"
  type="number"
  variant="filled"
  fullWidth
  color="secondary"
  focused
  value={price}
  onChange={(e) => setPrice(e.target.value)}
  sx={{ margin: '1rem' }}
  error={!!errors.price}
  helperText={errors.price}
/>

<TextField
  //required
  label="Stock"
  type="number"
  variant="filled"
  fullWidth
  color="secondary"
  focused
  value={stock}
  onChange={(e) => setStock(e.target.value)}
  sx={{ margin: '1rem' }}
  error={!!errors.stock}
  helperText={errors.stock}
/>

<FormControl fullWidth variant="filled" color="secondary" focused sx={{ margin: '1rem' }}>
  <InputLabel>Category</InputLabel>
  <Select
    value={categoryId}
    onChange={(e) => setCategoryId(e.target.value)}
    error={!!errors.categoryId}
  >
    {categories.map((cat) => (
      <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
    ))}
  </Select>
  {errors.categoryId && <p style={{ color: 'red' }}>{errors.categoryId}</p>}
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
  error={!!errors.description}
  helperText={errors.description}
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
            {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}
          </Box>
        </Box>
        <Button type="submit" variant="contained" color="secondary" sx={{ mt: 3 }}>
          Editar Producto
        </Button>
      </form>
    </Box>
  );
}

export default editProduct
