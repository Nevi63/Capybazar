import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Product from '../../components/product/product'
import { Box } from "@mui/material";
import ImageCarousel from '../../components/carousel/carousel';

function home() {
  return (
    <div>
      <ImageCarousel></ImageCarousel>
      <Box sx={{  display: 'flex', justifyContent: 'center', width: '100%' }}>
        
        <Box
           sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: {xs: 'center', sm: 'center', md:"flex-start"},
            alignItems: "center",
            gap: 2, 
            width: "90%",
            mx:'auto',
            p: 4,
            boxSizing: "border-box",
          }}
        >
           {[...Array(18)].map((_, i) => (
            <Product key={i} />
          ))}
        </Box> 
      </Box>
    </div>
  )
}

export default home
