import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Product from '../../components/product/product'
import { Box } from "@mui/material";
import ProductInformation from '../ProductInformation/productInformation';
function home() {
  return (
    <div>
      <Navbar userType='guest'></Navbar>
      {/* <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "flex-start" }, // xs = pantallas chicas, md = medianas en adelante
        }}
      >
        <Product />
        <Product />
        <Product />
      </Box> */}
      <ProductInformation></ProductInformation>
    </div>
  )
}

export default home
