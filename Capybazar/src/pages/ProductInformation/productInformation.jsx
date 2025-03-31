import React, { useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import { Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Review from '../../components/review/review';
function productInformation() {
  
    const { productId } = useParams();
    const [name, setName] = useState('');
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
      <h1>Información del producto</h1>
      <Box sx={{display:{sm: 'block', md: 'flex'}, justifyContent:'space-between', m:2}}>
        <Box sx={{width:{sm: '100%',md:'50%'}}}>
            <h2 style={{fontWeight:'normal'}}>{name}</h2>
            <h3 style={{fontWeight:'normal', margin: 0}}>MXN {price.toFixed(2)}</h3>
            <p>{description}</p>
            <p><strong>Stock:</strong> {stock}</p>
            <p><strong>Categoría:</strong> {category}</p>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              {renderStars()} <span style={{ marginLeft: '10px' }}>({rating}/5)</span>
            </Typography>
        </Box>
            <Box
            component="img"
            src={imageBase64 || null}
            alt="Producto"
            sx={{
                minHeight: { sm: '100px', md:'300px'},
                maxHeight: {sm:'400px', md:'500px'},
                maxWidth: {xs: '100%' ,sm:'100%', md:'45%'},
                objectFit: 'contain', // Evita que se deforme
                borderRadius: '10px' // Bordes redondeados para un mejor diseño
            }}
            />

      </Box>

      <Box
      sx={{
        backgroundColor:'primary.main',
        borderRadius: '10px',
        padding: '2rem'}}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <h1 style={{fontWeight: 'normal', margin: 0}}>Reviews</h1>
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

export default productInformation
