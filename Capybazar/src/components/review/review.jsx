import React from 'react'
import { Typography, Button, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import image from "../../assets/images/download.jpg";
import DeleteIcon from '@mui/icons-material/Delete';

function review(props) {
  return (
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
            <span style={{color:'white'}} >
              06-06-2020
             { props.delete && <Button sx={{ ml:2, p: 1, minWidth: 0 }} color='error' variant='contained'> <DeleteIcon></DeleteIcon></Button>}
            </span>
        </Box>        
        <p style={{color:'white'}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad quaerat, ipsum totam vel corporis beatae iusto consectetur quasi incidunt necessitatibus?</p>
    </Box>
  )
}

export default review
