import React from 'react'
import { Card, CardMedia, CardContent, Typography, Button, IconButton, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import image from "../../assets/images/download.jpg";
import AddIcon from '@mui/icons-material/Add';
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
            <Box sx={{backgroundColor: 'accent.main', p:2, borderRadius: '10px', my:2}}>
                <Box sx={{display: 'flex', justifyContent:'space-between'}}>
                    
                    <Box sx={{display:'flex'}}>
                        <img
                            src={image}
                            alt="Perfil"
                            style={{
                            width: 50, // Tamaño de la imagen
                            height: 50,
                            marginRight: 10,
                            borderRadius: "50%", // Hace que sea circular
                            objectFit: "cover" // Ajusta la imagen sin deformarla
                            }}
                        />
                        <Box>
                            <span style={{ fontWeight: 'bold', color:'white' }}>Tilin777</span>
                            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: '10px' }}>
                            <StarIcon sx={{ fontSize: '20px' }} />
                            <StarIcon sx={{ fontSize: '20px' }} />
                            <StarIcon sx={{ fontSize: '20px' }} />
                            <StarIcon sx={{ fontSize: '20px' }} />
                            </Typography>
                        </Box>

                    </Box>
                    <span style={{color:'white'}}>06-06-2020</span>
                </Box>
                
                <p style={{color:'white'}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad quaerat, ipsum totam vel corporis beatae iusto consectetur quasi incidunt necessitatibus?</p>
            </Box>
            <Box sx={{backgroundColor: 'accent.main', p:2, borderRadius: '10px', my:2}}>
                <Box sx={{display: 'flex', justifyContent:'space-between'}}>
                    
                    <Box sx={{display:'flex'}}>
                        <img
                            src={image}
                            alt="Perfil"
                            style={{
                            width: 50, // Tamaño de la imagen
                            height: 50,
                            marginRight: 10,
                            borderRadius: "50%", // Hace que sea circular
                            objectFit: "cover" // Ajusta la imagen sin deformarla
                            }}
                        />
                        <Box>
                            <span style={{ fontWeight: 'bold', color:'white' }}>Tilin777</span>
                            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: '10px' }}>
                            <StarIcon sx={{ fontSize: '20px' }} />
                            <StarIcon sx={{ fontSize: '20px' }} />
                            <StarIcon sx={{ fontSize: '20px' }} />
                            <StarIcon sx={{ fontSize: '20px' }} />
                            </Typography>
                        </Box>

                    </Box>
                    <span style={{color:'white'}} >06-06-2020</span>
                </Box>
                
                <p style={{color:'white'}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad quaerat, ipsum totam vel corporis beatae iusto consectetur quasi incidunt necessitatibus?</p>
            </Box>
        </div>
      </Box>
    </div>
  )
}

export default productInformation
