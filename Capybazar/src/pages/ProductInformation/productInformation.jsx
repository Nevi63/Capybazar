import React from 'react'
import { Card, CardMedia, CardContent, Typography, Button, IconButton, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import image from "../../assets/images/image.png";

function productInformation() {
  return (
    <div style={{padding: "2rem"}}>
      <h1>Información del producto</h1>
      <div style={{display:'flex', margin: '2rem'}}>
        <div style={{width:'50%'}}>
            <h2 style={{fontWeight:'normal'}}>Miku de peluche</h2>
            <h3 style={{fontWeight:'normal', margin: 0}}>MXN 200.00</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nihil et corrupti rerum amet inventore deleniti, laboriosam minus dolor explicabo error recusandae cupiditate fugiat blanditiis voluptates, quisquam quos hic harum.</p>
            <Typography variant="body2" sx={{ color: "text.secondary", fontSize:'10px' }}>
            <StarIcon sx={{ fontSize:'20px' }} />
            <StarIcon sx={{ fontSize:'20px' }} />
            <StarIcon sx={{ fontSize:'20px' }} />
            <StarIcon sx={{ fontSize:'20px' }} />
            </Typography>
        </div>
        <div style={{ width: '50%', display: 'flex', justifyContent:'flex-end',  paddingRight: '2rem' }}>
            <img
            src={image}
            alt="Producto"
            style={{
                minHeight: '300px',
                maxHeight: '500px',
                objectFit: 'contain', // Evita que se deforme
                borderRadius: '10px' // Bordes redondeados para un mejor diseño
            }}
            />
        </div>

      </div>

      <Box
      sx={{
        backgroundColor:'primary.main',
        borderRadius: '10px',
        padding: '2rem'}}>
        <h1 style={{fontWeight: 'normal', margin: 0}}>Reviews</h1>
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
                            <span style={{ fontWeight: 'bold' }}>Tilin777</span>
                            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: '10px' }}>
                            <StarIcon sx={{ fontSize: '20px' }} />
                            <StarIcon sx={{ fontSize: '20px' }} />
                            <StarIcon sx={{ fontSize: '20px' }} />
                            <StarIcon sx={{ fontSize: '20px' }} />
                            </Typography>
                        </Box>

                    </Box>
                    <span >06-06-2020</span>
                </Box>
                
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad quaerat, ipsum totam vel corporis beatae iusto consectetur quasi incidunt necessitatibus?</p>
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
                            <span style={{ fontWeight: 'bold' }}>Tilin777</span>
                            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: '10px' }}>
                            <StarIcon sx={{ fontSize: '20px' }} />
                            <StarIcon sx={{ fontSize: '20px' }} />
                            <StarIcon sx={{ fontSize: '20px' }} />
                            <StarIcon sx={{ fontSize: '20px' }} />
                            </Typography>
                        </Box>

                    </Box>
                    <span >06-06-2020</span>
                </Box>
                
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad quaerat, ipsum totam vel corporis beatae iusto consectetur quasi incidunt necessitatibus?</p>
            </Box>
        </div>
      </Box>
    </div>
  )
}

export default productInformation
