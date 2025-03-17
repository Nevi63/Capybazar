import {React, useState} from 'react'
import { Typography, Button, IconButton, TextField, Box,  InputAdornment } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Product from '../../components/product/product';
function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 10;

function advancedSearch() {
    const [age, setAge] = useState('');
            
            const handleChange = (event) => {
             setAge(event.target.value);
            };

    const [selectedIndex, setSelectedIndex] = useState(1);
  
    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };
    const [value1, setValue1] = useState([20, 37]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const [value2, setValue2] = useState([20, 37]);

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };
  
  return (
    <Box sx={{display: 'flex',position: 'relative', height: '100%'}}>
      <Box sx={{display:'flex', flexDirection:'column', flexBasis:'15%', backgroundColor:'primary.main',
                height: 'calc( 100vh - 70px)',
                position: 'sticky',
                top: '70px',
                left: 0,}}> 
        <Box sx={{p:1}}>
            <List component="nav" aria-label="secondary mailbox folder" sx={{backgroundColor:'white', borderRadius:'5px', p:0}}>
                <ListItem sx={{backgroundColor: 'accent.main', borderRadius: '5px 5px 0 0'}}>
                    <ListItemText primary="Categorías"/>
                </ListItem>
                <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
                sx={{
                    '&.Mui-selected': { // Selector para el estado "selected"
                      backgroundColor: '#f1d8b7', // Cambia el color aquí
                      '&:hover':{
                        backgroundColor: '#eacca5',
                      }
                    },
                  }}
                >
                    <ListItemText primary="Trash" />
                </ListItemButton>
                <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
                sx={{
                    '&.Mui-selected': { // Selector para el estado "selected"
                      backgroundColor: '#f1d8b7', // Cambia el color aquí
                      '&:hover':{
                        backgroundColor: '#eacca5',
                      }
                    },
                    borderRadius:'0 0 5px 5px'
                  }}
                >
                    <ListItemText primary="Spam" />
                </ListItemButton>
            </List>
        </Box>
        <Box sx={{p:3}}>
            <p>Rango de precio</p>
            
            <Slider
                color='secondary'
                getAriaLabel={() => 'Minimum distance shift'}
                value={value2}
                onChange={handleChange2}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
            />
        </Box>
        <Box sx={{p:1, display: 'flex', width: '100%', justifyContent: 'center'}}>
            <FormControl sx={{width:'180px', alignSelf:'center', backgroundColor: 'white'}} color='secondary' variant="filled">
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
      </Box>
      <Box sx={{ display:'flex', justifyContent:'center', width:'100%'}}>
        
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          px:0,
          justifyContent: { xs: "center", md: "flex-start" }, // xs = pantallas chicas, md = medianas en adelante
        }}
      >
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </Box> 
      </Box>
    </Box>
  )
}

export default advancedSearch
