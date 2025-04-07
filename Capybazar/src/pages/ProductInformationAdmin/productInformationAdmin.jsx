import React from 'react'
import { Typography, Button, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import image from "../../assets/images/download.jpg";
import DeleteIcon from '@mui/icons-material/Delete';
import Review from '../../components/review/review';

function productInformationAdmin() {
  return (
    <div style={{padding: "2rem"}}>
    <Box sx={{display:{sm: 'block', md: 'flex'}, justifyContent:'space-between', m:2}}>
    <Box
          component="img"
          src={image}
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
          <h1 style={{fontWeight:'normal', margin: 0}}>MXN 200.00</h1>
          <h2 style={{fontWeight:'normal'}}>Miku de peluche</h2>
          <p style={{lineHeight:1}}>Por Tilin</p>
          <p style={{lineHeight:1}}>Categoría: Peluches</p>
          <Typography variant="body2" sx={{ color: "text.secondary", fontSize:'10px',lineHeight:1}}>
          <StarIcon sx={{ fontSize:'20px' }} />
          <StarIcon sx={{ fontSize:'20px' }} />
          <StarIcon sx={{ fontSize:'20px' }} />
          <StarIcon sx={{ fontSize:'20px' }} />
          </Typography>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nihil et corrupti rerum amet inventore deleniti, laboriosam minus dolor explicabo error recusandae cupiditate fugiat blanditiis voluptates, quisquam quos hic harum.</p>
    
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
      </div>
      <div>
          <Review delete></Review>
          <Review delete></Review>
          <Review delete></Review>
          
      </div>
    </Box>
  </div>
  )
}

export default productInformationAdmin
