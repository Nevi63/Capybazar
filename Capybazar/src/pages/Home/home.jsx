import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Product from '../../components/product/product'
import { Box } from "@mui/material";
import ImageCarousel from '../../components/carousel/carousel';

function home() {
  return (
    <div>
      <Navbar userType='vendedor'></Navbar>
      <ImageCarousel></ImageCarousel>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "flex-start" }, // xs = pantallas chicas, md = medianas en adelante
        }}
      >
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </Box>
    </div>
  )
}

export default home
