import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function NumberInput(prop) {
  const [value, setValue] = useState(0);

  const handleIncrement = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const handleDecrement = () => {
    setValue((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(isNaN(newValue) ? 0 : newValue);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'initial' }}>
        <Button
        color='accent'
        variant='contained'
        onClick={handleDecrement}
        sx={{
            borderRadius: '50% 0 0 50%',
            border: '1px solid rgba(0, 0, 0, 0.23)',
            padding: '0px', // Elimina el padding interno
            minWidth: '25px', // Ajusta el ancho mínimo
            height: '30px',
            marginLeft: '-1px',
        }}
      >
        <RemoveIcon />
      </Button>
      <TextField
        value={value}
        onChange={handleInputChange}
        InputProps={{
          style: {
            width: '60px', // Ajusta el ancho del TextField
            height:'32px',
            backgroundColor: 'white',
            textAlign: 'center'
          }
        }}
        variant="outlined" // Usar variant outlined para tener un borde consistente
      />
      <Button
        color='accent'
        variant='contained'
        onClick={handleIncrement}
        sx={{
            borderRadius: '0 50% 50% 0',
            border: '1px solid rgba(0, 0, 0, 0.23)',
            padding: '0px', // Elimina el padding interno
            minWidth: '25px', // Ajusta el ancho mínimo
            height: '30px',
            marginRight: '-1px',
        }}
      >
        <AddIcon sx={{m:0, p:0}} />
      </Button>
      
    </Box>
  );
}

export default NumberInput;