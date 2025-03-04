import { React, useState } from "react";
import { Card, CardMedia, CardContent, Typography, Button, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import image from "../../assets/images/image.png";

function Product() {
  const [liked, setLiked] = useState(false);
  const [hover, setHover] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 10; // Rango de -10° a 10°
    const y = -((e.clientY - top) / height - 0.5) * 10;
    setTilt({ x, y });
  };

  return (
    <Card
    sx={{
      borderRadius: '20px',
      width: "265px",
      maxWidth: "100%",
      m: 2,
      position: "relative",
      cursor: "pointer",
      transform: `perspective(600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
      boxShadow: hover 
      ? "10px 10px 20px rgba(0, 0, 0, 0.3)"  // Sombra más intensa en hover
      : "3px 3px 10px rgba(0, 0, 0, 0.2)",  // Sombra más ligera sin hover
    }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setTilt({ x: 0, y: 0 }); // Resetear inclinación
      }}
      onMouseMove={handleMouseMove}
    >
      <CardMedia
        component="img"
        alt="producto"
        image={image}
        sx={{
          height: "180px", // Altura fija
          width: "100%", // Ocupar todo el ancho del card
          objectFit: "cover", // Evita que se deforme la imagen
        }}
      />


      {(hover || liked) && (
        <IconButton
          onClick={() => setLiked(!liked)}
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

      <CardContent sx={{backgroundColor:'primary.main'}}>
        <Typography  variant="h6" component="div">
          Producto
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", fontSize:'10px' }}>
          <StarIcon sx={{ fontSize:'20px' }} />
          <StarIcon sx={{ fontSize:'20px' }} />
          <StarIcon sx={{ fontSize:'20px' }} />
          <StarIcon sx={{ fontSize:'20px' }} />
        </Typography>
        <Typography variant="body" sx={{ color: "text.secondary", alignItems: "baseline", display: 'flex', justifyContent:'space-between' }}>
          MXN 2200.00
          <Button size="small" color="secondary" variant="contained" sx={{ textTransform: "none", ml:1 }}>
            Agregar al carrito
          </Button>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Product;
