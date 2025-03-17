import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";

const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScUD4YEbsDybK3wILoeKezLB-ANesskAAswQ&s",
  "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000083903/d551b2dee1b267f36000ce3ae52b20001cb26dc0fa0609a89defd7896e38ab66",
  "https://img.rtve.es/imagenes/hatsune-miku-artista-pop-digital-cazador-cerebros/1689160036357.jpg",
];

const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ width: "100%", margin: "auto", mt: 4 }}>
      <Slider {...settings}>
        {images.map((img, index) => (
          <Box key={index} component="img" src={img} alt={`slide-${index}`} sx={{ width: "100%", borderRadius: 2 }} />
        ))}
      </Slider>
    </Box>
  );
};

export default ImageCarousel;
