import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const images = [
  "https://m.media-amazon.com/images/I/61c0zPrli6L._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/819WTGUnYlL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/71FbgUpM+XL._SX3000_.jpg",
];
// Botón personalizado para la izquierda
const PrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      zIndex: 2,
      position: "absolute",
      left: 10,
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(0,0,0,0.5)",
      color: "white",
      "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
    }}
  >
    <ArrowBackIos />
  </IconButton>
);

// Botón personalizado para la derecha
const NextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      right: 10,
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(0,0,0,0.5)",
      color: "white",
      "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
    }}
  >
    <ArrowForwardIos />
  </IconButton>
);

const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />, // Personaliza el botón derecho
    prevArrow: <PrevArrow />, // Personaliza el botón izquierdo
  };

  return (
    <Box sx={{ width: "100%", maxHeight: "500px", mb: 2 }}>
      <Slider {...settings}>
        {images.map((img, index) => (
          <Box key={index} component="img" src={img} alt={`slide-${index}`} 
               sx={{ width: "100%", maxHeight: "500px", borderRadius: 2, objectFit: "fill" }} />
        ))}
      </Slider>
    </Box>
  );
};

export default ImageCarousel;
