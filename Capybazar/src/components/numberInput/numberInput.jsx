import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function NumberInput({ value, onChange }) {
  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    onChange(value > 1 ? value - 1 : 1); // 👈 Opcional: mínimo 1
  };

  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue > 0) {
      onChange(newValue);
    } else {
      onChange(1); // 👈 Opcional: mínimo 1
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'initial' }}>
      <Button
        color='accent'
        variant='contained'
        onClick={handleDecrement}
        sx={{
          borderRadius: '50% 0 0 50%',
          border: '1px solid rgba(0, 0, 0, 0.23)',
          padding: '0px',
          minWidth: '25px',
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
            width: '60px',
            height: '32px',
            backgroundColor: 'white',
            textAlign: 'center'
          }
        }}
        variant="outlined"
      />
      <Button
        color='accent'
        variant='contained'
        onClick={handleIncrement}
        sx={{
          borderRadius: '0 50% 50% 0',
          border: '1px solid rgba(0, 0, 0, 0.23)',
          padding: '0px',
          minWidth: '25px',
          height: '30px',
          marginRight: '-1px',
        }}
      >
        <AddIcon sx={{ m: 0, p: 0 }} />
      </Button>
    </Box>
  );
}

export default NumberInput;
