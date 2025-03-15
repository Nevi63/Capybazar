import {React, useState} from 'react'
import { Typography, Button, IconButton, TextField, Box,  InputAdornment } from "@mui/material";
import NumberInput from '../../components/numberInput/numberInput';
function cart() {
  return (
    <Box sx={{p:8, display: 'flex', flexDirection:{sm:'column', md:'row'}}}>
      <Box sx={{backgroundColor: 'primary.main', flexBasis:'70%', m: 2, p: 1}}>
        <h1 style={{fontWeight:'normal', marginLeft:'2rem'}}>Carrito</h1>
        <hr style={{border:'1px solid black'}}/>
        <Box sx={{display:'flex', flexDirection:'column'}}>
          <Box className="ProductPurchaseHistory" sx={{display:'flex', justifyContent:'space-between', p:2}}>
                <Box className="ProductInformation" sx={{display:'flex'}}>
                    <Box component={"img"} sx={{width:'120px', height:'120px', borderRadius:'10px', mr:2, objectFit: 'cover'}} src='https://cdn.milenio.com/uploads/media/2022/10/04/jose-jose-viralizan-video-apoyaba.jpg'></Box>
                    <Box sx={{display:'flex', flexDirection:'column'}}>
                        <span style={{  }}>Producto 1</span>
                        <span style={{ fontSize:'12px' }}>por Tilín</span>
                        <span style={{display:'flex', alignItems:'center', marginTop:'1.5rem'}}>
                          <NumberInput sx={{width:'200px'}}></NumberInput>
                           <Button sx={{ml:2}} variant='contained' color='secondary'>Eliminar</Button>
                          
                        </span>
                    </Box>
                </Box>
                <Box className="botones" sx={{display:'flex', flexDirection:'column', justifyContent:'space-evenly', color:'black', mx:1}}>
                    <p>MXN 20.00</p>
                </Box>
            </Box>

        <hr style={{border:'1px solid black', width: '100%'}}/>
          <Box className="ProductPurchaseHistory" sx={{display:'flex', justifyContent:'space-between', p:2}}>
                <Box className="ProductInformation" sx={{display:'flex'}}>
                    <Box component={"img"} sx={{width:'120px', height:'120px', borderRadius:'10px', mr:2, objectFit: 'cover'}} src='https://cdn.milenio.com/uploads/media/2022/10/04/jose-jose-viralizan-video-apoyaba.jpg'></Box>
                    <Box sx={{display:'flex', flexDirection:'column'}}>
                        <span style={{  }}>Producto 1</span>
                        <span style={{ fontSize:'12px' }}>por Tilín</span>
                        <span style={{display:'flex', alignItems:'center', marginTop:'1.5rem'}}>
                          <NumberInput sx={{width:'200px'}}></NumberInput>
                           <Button sx={{ml:2}} variant='contained' color='secondary'>Eliminar</Button>
                          
                        </span>
                    </Box>
                </Box>
                <Box className="botones" sx={{display:'flex', flexDirection:'column', justifyContent:'space-evenly', color:'black', mx:1}}>
                    <p>MXN 20.00</p>
                </Box>
            </Box>
            <hr style={{border:'1px solid black', width: '100%'}}/>
          <Box sx={{justifyItems:'right'}}>
            <p>Subtotal(3 productos): MXN 20.00</p>
          </Box>
        </Box>
      </Box>
      <Box sx={{backgroundColor: 'primary.main', flexBasis:'20%', m: 2, p: 4, height:'fit-content', display:'flex', flexDirection:'column'}}>
        <Box>
          <p>Subtotal Productos:</p>
          <p>MXN 20.00</p>
        </Box>
        <Button color='accent' variant='contained' sx={{justifySelf:'center'}}>Check Out</Button>
      </Box>
      
    </Box>
  )
}

export default cart
