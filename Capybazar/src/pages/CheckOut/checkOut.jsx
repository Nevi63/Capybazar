import {React, useState} from 'react'
import { Box, TextField, Button, IconButton } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function checkOut() {
    const [age, setAge] = useState('');
            
            const handleChange = (event) => {
             setAge(event.target.value);
            };
  return (
    <Box sx={{display:'flex', p: 5, justifyContent:'space-around', flexDirection:{xs: 'column', sm: 'column', md:'row'}, }}>
      <Box sx={{display:'flex', flexDirection:'column',  flexBasis:'50%', m:2}}>
        <h1>Finalizar compra</h1>
        <h3>Dirección de envío:</h3>
        <Box sx={{my:2, display:'flex'}}>
          <TextField
            required
            id="filled-required"
            label="Calle"
            defaultValue=""
            color="secondary"
            variant="filled"
            focused 
            sx={{flexBasis:'50%'}}
          />
          <TextField
            sx={{ml:1, flexBasis:'35%'}}
            required
            id="filled-required"
            label="Colonia"
            defaultValue=""
            color="secondary"
            variant="filled"
            focused 
          />
          <TextField
            sx={{ml:1, flexBasis:'15%'}}
            required
            id="filled-required"
            label="Número"
            defaultValue=""
            color="secondary"
            variant="filled"
            focused 
          />
        </Box>
        <Box sx={{my:2, display:'flex'}}>
          <TextField
            sx={{flexBasis:'40%'}}
            required
            id="filled-required"
            label="Municipio"
            defaultValue=""
            color="secondary"
            variant="filled"
            focused 
          />
          <TextField
            sx={{ml:1, flexBasis:'40%'}}
            required
            id="filled-required"
            label="Estado"
            defaultValue=""
            color="secondary"
            variant="filled"
            focused 
          />
          <TextField
            sx={{ml:1, flexBasis:'20%'}}
            required
            id="filled-required"
            label="Código Postal:"
            defaultValue=""
            color="secondary"
            variant="filled"
            focused 
          />
        </Box>
        <span>
          <h4>Método de pago:</h4>
            <FormControl sx={{width:'100%', alignSelf:'center', backgroundColor: 'white'}} color='secondary' variant="filled">
                <InputLabel id="demo-simple-select-label">Método de pago</InputLabel>
                <Select 
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Método de pago"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>PayPal</MenuItem>
                    <MenuItem value={10}>Tarjeta de credito</MenuItem>
                </Select>
            </FormControl>
            <Button color='success' variant='contained' sx={{my:2}}>Finalizar compra</Button>
        </span>

      </Box>
      <Box sx={{backgroundColor:'primary.main', flexBasis:'25%', display:'flex', flexDirection:'column', p:3, height:'fit-content'}}>
        <h3>Productos</h3>
        <hr style={{border:'1px solid black', width:'100%'}} />
        <Box className='uwu' sx={{px: 2}}>
          <span style={{display:'flex', justifyContent:'space-between'}}>
            <p>Peluche Miku</p>
            <p>200.00</p>
          </span>
          <span style={{display:'flex', justifyContent:'space-between'}}>
            <p>x2</p>
            <p>400.00</p>
          </span>

        </Box>
        <hr style={{border:'1px solid black', width:'100%'}} />
        <Box className='uwu' sx={{px: 2}}>
          <span style={{display:'flex', justifyContent:'space-between'}}>
            <p>Peluche Miku</p>
            <p>200.00</p>
          </span>
          <span style={{display:'flex', justifyContent:'space-between'}}>
            <p>x2</p>
            <p>400.00</p>
          </span>

        </Box>
        <hr style={{border:'1px solid black', width:'100%', px:2}} />
        <span style={{display:'flex', justifyContent:'space-between'}}>
          <p>Total:</p>
          <p>MXN 100.00</p>
        </span>
      </Box>
      
    </Box>
  )
}

export default checkOut
