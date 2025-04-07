import { React, useState } from "react";
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
  
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
  
    if (!user || !token) {
      return Swal.fire({
        title: "Inicia sesión",
        text: "Debes iniciar sesión para agregar productos al carrito.",
        icon: "warning"
      });
    }
  
    try {
      const response = await fetch(`http://localhost:5000/cart/${user._id}/add`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Swal.fire({
          title: "Producto agregado",
          text: "Se agregó el producto al carrito 🛒",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        Swal.fire({
          title: "Error",
          text: data.message || "Ocurrió un error al agregar al carrito.",
          icon: "error"
        });
      }
    } catch (error) {
      console.error("❌ Error al agregar al carrito:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo conectar con el servidor.",
        icon: "error"
      });
    }
  };
  

  const handleLike = (event) => {
    event.stopPropagation();
    setLiked(!liked);
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
