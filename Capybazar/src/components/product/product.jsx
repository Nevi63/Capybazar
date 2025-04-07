import { React, useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Typography, Button, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import image from "../../assets/images/image.png";
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';

function Product({ product }) {
  const [liked, setLiked] = useState(false);
  const [hover, setHover] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const fetchWishlist = async () => {
      try {
        const res = await fetch('http://localhost:5000/wishlist', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          // Verifica si el producto está en la wishlist
          const isProductInWishlist = data.wishlist.some(item => item._id === product._id);
          setLiked(isProductInWishlist);
        }
      } catch (err) {
        console.error("❌ Error al obtener wishlist:", err);
      }
    };

    if (user && token) {
      fetchWishlist();
    }
  }, [product._id]); // Vuelve a ejecutar cuando el producto cambia

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 10;
    const y = -((e.clientY - top) / height - 0.5) * 10;
    setTilt({ x, y });
  };

  const seeProduct = () => {
    navigate(`/productInfo/${product._id}`, { state: { product } }); // podrías pasar el producto aquí
  };

  const AddToCart = async (event) => {
    event.stopPropagation();
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
  
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

  return (
    <Card
      onClick={seeProduct}
      sx={{
        borderRadius: '20px',
        width: "280px",
        maxWidth: "100%",
        height: 'fit-content',
        m: 2,
        position: "relative",
        cursor: "pointer",
        transform: `perspective(600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
        boxShadow: hover
          ? "10px 10px 20px rgba(0, 0, 0, 0.3)"
          : "3px 3px 10px rgba(0, 0, 0, 0.2)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setTilt({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
    >
      <CardMedia
        component="img"
        alt={product.name}
        image={product.image || image} // usa imagen real o de fallback
        sx={{
          height: "180px",
          width: "100%",
          objectFit: "cover",
        }}
      />

      {(hover || liked) && (
        <IconButton
          onClick={handleLike}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: liked ? "red" : "white",
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: "50%",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
          }}
        >
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      )}

      <CardContent sx={{ backgroundColor: 'primary.main' }}>
        <Typography variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", fontSize: '10px' }}>
          <StarIcon /><StarIcon /><StarIcon /><StarIcon />
        </Typography>
        <Typography variant="body" sx={{ color: "text.secondary", display: 'flex', justifyContent: 'space-between' }}>
          MXN ${product.price}
          <Button onClick={AddToCart} size="small" color="secondary" variant="contained" sx={{ textTransform: "none", ml: 1 }}>
            Agregar al carrito
          </Button>
        </Typography>
      </CardContent>
    </Card>
  );
}


export default Product;
