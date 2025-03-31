import React, { useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import { Typography, Button, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import image from "../../assets/images/download.jpg";
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Review from '../../components/review/review';
function productInformationClient() {
  const { productId } = useParams();
  const [name, setName] = useState('');
  const [seller, setSeller] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
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
        setSeller(data.userId.firstName + ' ' + data.userId.lastName);
        setDescription(data.description);
        setCategory(data.categoryId.name);
        setImageBase64(data.image);
        setStock(data.stock);
        setRating(data.rating);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
  }
  const renderStars = () => {
    const stars = [];
    const maxStars = 5;

    for (let i = 1; i <= maxStars; i++) {
        stars.push(
            <StarIcon 
                key={i} 
                sx={{ fontSize: '24px', color: i <= rating ? '#FFD700' : '#C0C0C0' }}
            />
        );
    }
    return stars;
  };
  return (
    <div style={{padding: "2rem"}}>
    <Box sx={{display:{sm: 'block', md: 'flex'}, justifyContent:'space-between', m:2}}>
    <Box
          component="img"
          src={imageBase64 || null}
          alt="Producto"
          sx={{
              flexBasis: '30%',
              minHeight: { sm: '100px', md:'300px'},
              maxHeight: {sm:'400px', md:'500px'},
              maxWidth: {xs: '100%' ,sm:'100%', md:'45%'},
              objectFit: 'contain', // Evita que se deforme
              borderRadius: '10px' // Bordes redondeados para un mejor diseño
          }}
          />
      <Box sx={{width:{sm: '100%',md:'50%'}}}>
          <h1 style={{fontWeight:'normal', margin: 0}}>MXN {price.toFixed(2)}</h1>
          <h2 style={{fontWeight:'normal'}}>{name}</h2>
          <p style={{lineHeight:1}}>Por {seller}</p>
          <p style={{lineHeight:1}}>Categoría: {category}</p>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {renderStars()} <span style={{ marginLeft: '10px' }}>({rating}/5)</span>
          </Typography>
          <p>{description}</p>
          <span>
            <Button sx={{m:1}} color='accent' variant='contained'>Agregar al carrito</Button>
            <Button sx={{m:1}} color='primary' variant='contained'> <FavoriteBorderIcon></FavoriteBorderIcon> Agregar a la wishlist</Button>
          </span>
      </Box>
         

    </Box>

    <Box
    sx={{
      backgroundColor:'primary.main',
      borderRadius: '10px',
      mt:5,
      padding: '2rem'}}>
      <div style={{display:'flex', justifyContent:'space-between'}}>
          <h1 style={{fontWeight: 'normal', margin: 0}}>Reviews</h1>
          <Button sx={{m:1}} color='accent' disabled variant='contained'><AddIcon></AddIcon> Hacer una review</Button>
      </div>
      <div>
        <Review></Review>
        <Review></Review>
        <Review></Review>
      </div>
    </Box>
  </div>
  )
}

export default productInformationClient
