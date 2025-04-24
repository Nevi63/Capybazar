import React, { useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import { Typography, Button, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import image from "../../assets/images/download.jpg";
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Review from '../../components/review/review';
import Swal from 'sweetalert2';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import MakeReview from './modals/makeReview';
function productInformationClient() {
  const [canReview, setCanReview] = useState(false);
  const [reviews, setReviews] = useState([]);
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
  const [product, setProduct] = useState('');
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(true);

  //para modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchProduct(), fetchWishlist(), fetchReviews()]);
      setLoading(false);
    };
    fetchData();
  }, []);
  
  const fetchReviews = async() =>{
    if(token){
      try {
        const res = await fetch(`http://localhost:5000/reviews/can-review/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          // Verifica si el producto está en la wishlist
          console.log(data);
          setCanReview(data.canReview);
        }
      } catch (err) {
        console.error("❌ Error al obtener reviews:", err);
      }
    }

    try {
      const res = await fetch(`http://localhost:5000/reviews/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        // Verifica si el producto está en la wishlist
        console.log(data);
        setReviews(data);
      }
    } catch (err) {
      console.error("❌ Error al obtener reviews:", err);
    }
  }
  const fetchWishlist = async () => {
    if(token){
      try {
        const res = await fetch('http://localhost:5000/wishlist/ids', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          console.log(productId)
          // Verifica si el producto está en la wishlist
          const isProductInWishlist = data.wishlist.some(id => id === productId);
          setLiked(isProductInWishlist);
        }
      } catch (err) {
        console.error("❌ Error al obtener wishlist:", err);
      }
    }
  };
    const handleLike = async(event) => {
      event.stopPropagation();
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
  
      if (!user || !token) {
        return Swal.fire({
          title: "Inicia sesión",
          text: "Debes iniciar sesión para usar la wishlist.",
          icon: "warning"
        });
      }
  
      const newLiked = !liked;
      setLiked(newLiked);
      
      try {
        const url = `http://localhost:5000/wishlist/${product._id}`;
        const method = newLiked ? 'POST' : 'DELETE';
    
        const res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
    
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Error en wishlist');
      } catch (err) {
        console.error("❌ Error wishlist:", err);
        Swal.fire({
          title: "Error",
          text: "No se pudo actualizar la wishlist.",
          icon: "error"
        });
        setLiked(!newLiked); // revertir si falla
      }
    };

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      setProduct(data);
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
  };
  
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


  const AddToCart = async (event) => {
    event.stopPropagation();
    try {
  
      const res = await fetch(`http://localhost:5000/cart/${user._id}/add`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,          // Agregamos uno por clic
          mode: 'add'           // 📌 Esto es clave para que el backend lo sume
        })
      });
  
      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          title: '¡Agregado al carrito!',
          text: `${product.name} se agregó correctamente.`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        throw new Error(data.message || 'Algo salió mal');
      }
    } catch (err) {
      console.error('❌ Error al agregar al carrito:', err);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo agregar al carrito.',
        icon: 'error'
      });
    }
  };

  
  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        width: '100%',
      }}>
        <CircularProgress />
      </Box>
    );
  }
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
            <Button onClick={AddToCart} sx={{m:1}} color='accent' variant='contained'>Agregar al carrito</Button>
            {token && <Button onClick={handleLike} sx={{m:1}} color='primary' variant='contained'> {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />} 
            {liked ? 'Quitar de la wishlist' : 'Agregar a la wishlist'}</Button>}
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
          <Button onClick={handleOpen} sx={{m:1}} color='accent'disabled={!canReview}variant='contained'><AddIcon></AddIcon> Hacer una review</Button>
      </div> 
      <div>
        {reviews.length === 0 ? (
          <p style={{ color: 'gray', textAlign: 'center' }}>Todavía no hay reviews para este producto.</p>
        ) : (
          reviews.map((rev, idx) => (
            <Review key={idx} {...rev} />
          ))
        )}
      </div>
    </Box>
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
        <MakeReview 
          productId={productId}
          onClose={handleClose}
        />
      </Box>
    </Modal>
  </div>
  )
}

export default productInformationClient
