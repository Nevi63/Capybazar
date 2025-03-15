import React from 'react'
import { Typography, Button, IconButton, Box } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function wishList() {
    const [age, setAge] = React.useState('');
        
        const handleChange = (event) => {
         setAge(event.target.value);
        };
  return (
    <Box sx={{px:15, py:5}}>
    <Box sx={{display:'flex', justifyContent:'space-between'}}>
        <h1>Historial de compras</h1>
            
        <FormControl sx={{width:'250px', alignSelf:'center'}} color='secondary'>
            <InputLabel id="demo-simple-select-label">Filtros</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Filtros"
                onChange={handleChange}
            >
                <MenuItem value={10}>Alfabético(A-Z)</MenuItem>
                <MenuItem value={10}>Alfabético(Z-A)</MenuItem>
                <MenuItem value={20}>Por fecha(Ascendente)</MenuItem>
                <MenuItem value={20}>Por fecha(Descendente)</MenuItem>
            </Select>
        </FormControl>
    </Box>
    <Box sx={{backgroundColor:'primary.main', display:'flex', flexDirection:'column', px:3}}>
                <Box className="ProductPurchaseHistory" sx={{display:'flex', justifyContent:'space-between', p:2}}>
                    <Box className="ProductInformation" sx={{display:'flex'}}>
                        <Box component={"img"} sx={{width:'120px', height:'120px', borderRadius:'10px', mr:2, objectFit: 'cover'}} src='https://cdn.milenio.com/uploads/media/2022/10/04/jose-jose-viralizan-video-apoyaba.jpg'></Box>
                        <Box sx={{display:'flex', flexDirection:'column'}}>
                            <span style={{  }}>Producto 1</span>
                            <span style={{ fontSize:'12px' }}>por Tilín</span>
                            <span style={{  }}>MXN 20.00</span>
                        </Box>
                    </Box>
                    <Box className="botones" sx={{display:'flex', flexDirection:'column', justifyContent:'space-evenly', color:'white', mx:1}}>
                        <Button variant='contained' color='accent'>Agregar al carrito</Button>
                        <Button variant='contained' color='secondary'>Eliminar de la wish list</Button>
                    </Box>
                </Box>
                <hr style={{ width:'100%', borderColor:'black'}}/>
                <Box className="ProductPurchaseHistory" sx={{display:'flex', justifyContent:'space-between', p:2}}>
                    <Box className="ProductInformation" sx={{display:'flex'}}>
                        <Box component={"img"} sx={{width:'120px', height:'120px', borderRadius:'10px', mr:2, objectFit: 'cover'}} src='https://cdn.milenio.com/uploads/media/2022/10/04/jose-jose-viralizan-video-apoyaba.jpg'></Box>
                        <Box sx={{display:'flex', flexDirection:'column'}}>
                            <span style={{  }}>Producto 1</span>
                            <span style={{ fontSize:'12px' }}>por Tilín</span>
                            <span style={{  }}>MXN 20.00</span>
                        </Box>
                    </Box>
                    <Box className="botones" sx={{display:'flex', flexDirection:'column', justifyContent:'space-evenly', color:'white', mx:1}}>
                        <Button variant='contained' color='accent'>Agregar al carrito</Button>
                        <Button variant='contained' color='secondary'>Eliminar de la wish list</Button>
                    </Box>
                </Box>
                
            </Box>
    </Box>
  )
}

export default wishList
