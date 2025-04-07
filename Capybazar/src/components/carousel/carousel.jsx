import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScUD4YEbsDybK3wILoeKezLB-ANesskAAswQ&s",
  "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000083903/d551b2dee1b267f36000ce3ae52b20001cb26dc0fa0609a89defd7896e38ab66",
  "https://img.rtve.es/imagenes/hatsune-miku-artista-pop-digital-cazador-cerebros/1689160036357.jpg",
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
