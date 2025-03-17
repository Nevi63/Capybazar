import React from 'react'
import { Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import image from "../../assets/images/download.jpg";
import Review from '../../components/review/review';
function productInformation() {
  return (
    <div style={{padding: "2rem"}}>
      <h1>Información del producto</h1>
      <Box sx={{display:{sm: 'block', md: 'flex'}, justifyContent:'space-between', m:2}}>
        <Box sx={{width:{sm: '100%',md:'50%'}}}>
            <h2 style={{fontWeight:'normal'}}>Miku de peluche</h2>
            <h3 style={{fontWeight:'normal', margin: 0}}>MXN 200.00</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nihil et corrupti rerum amet inventore deleniti, laboriosam minus dolor explicabo error recusandae cupiditate fugiat blanditiis voluptates, quisquam quos hic harum.</p>
            <Typography variant="body2" sx={{ color: "text.secondary", fontSize:'10px' }}>
            <StarIcon sx={{ fontSize:'20px' }} />
            <StarIcon sx={{ fontSize:'20px' }} />
            <StarIcon sx={{ fontSize:'20px' }} />
            <StarIcon sx={{ fontSize:'20px' }} />
            </Typography>
        </Box>
            <Box
            component="img"
            src={image}
            alt="Producto"
            sx={{
                minHeight: { sm: '100px', md:'300px'},
                maxHeight: {sm:'400px', md:'500px'},
                maxWidth: {xs: '100%' ,sm:'100%', md:'45%'},
                objectFit: 'contain', // Evita que se deforme
                borderRadius: '10px' // Bordes redondeados para un mejor diseño
            }}
            />

      </Box>

      <Box
      sx={{
        backgroundColor:'primary.main',
        borderRadius: '10px',
        padding: '2rem'}}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <h1 style={{fontWeight: 'normal', margin: 0}}>Reviews</h1>
        </div>
        <div>
            <Review></Review>
            <Review></Review>
            <Review></Review>
          
        </div>
      </Box>
    </div>
  )
}

export default productInformation
