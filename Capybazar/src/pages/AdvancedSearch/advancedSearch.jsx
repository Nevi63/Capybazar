import React, { useState, useEffect } from 'react';
import { Typography, Button, IconButton, TextField, Box, InputAdornment } from "@mui/material";
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
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const minDistance = 10;

function valuetext(value) {
  return `$${value}`;
}

function AdvancedSearch() {
  const query = useQuery();
  const searchTerm = query.get('query') || '';
  const [results, setResults] = useState([]);

  const [selectedIndex, setSelectedIndex] = useState(1);
  const [value2, setValue2] = useState([0, 9999]);
  const [age, setAge] = useState('');

  const handleListItemClick = (event, index) => setSelectedIndex(index);
  const handleChange = (event) => setAge(event.target.value);

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 10000 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const token = localStorage.getItem('token');

      fetch(`http://localhost:5000/products/search?query=${encodeURIComponent(searchTerm)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          if (!res.ok) throw new Error("Token inválido o expirado");
          return res.json();
        })
        .then(data => {
          setResults(data);
        })
        .catch(err => {
          console.error('❌ Error al buscar productos:', err);
          alert("No autorizado. Inicia sesión nuevamente.");
        });
    }
  }, [searchTerm]);

  return (
    <Box sx={{ display: 'flex', position: 'relative', height: '100%' }}>
      {/* Sidebar */}
      <Box sx={{
        display: 'flex', flexDirection: 'column', flexBasis: '15%', backgroundColor: 'primary.main',
        height: 'calc(100vh - 70px)', position: 'sticky', top: '70px', left: 0,
      }}>
        <Box sx={{ p: 1 }}>
          <List component="nav" aria-label="categorías" sx={{ backgroundColor: 'white', borderRadius: '5px', p: 0 }}>
            <ListItem sx={{ backgroundColor: 'accent.main', borderRadius: '5px 5px 0 0' }}>
              <ListItemText primary="Categorías" />
            </ListItem>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
              sx={{
                '&.Mui-selected': { backgroundColor: '#f1d8b7', '&:hover': { backgroundColor: '#eacca5' } }
              }}
            >
              <ListItemText primary="Trash" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
              sx={{
                '&.Mui-selected': { backgroundColor: '#f1d8b7', '&:hover': { backgroundColor: '#eacca5' } },
                borderRadius: '0 0 5px 5px'
              }}
            >
              <ListItemText primary="Spam" />
            </ListItemButton>
          </List>
        </Box>

        {/* Filtros */}
        <Box sx={{ p: 3 }}>
          <p>Rango de precio</p>
          <Slider
            color='secondary'
            value={value2}
            onChange={handleChange2}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            disableSwap
          />
        </Box>
        <Box sx={{ p: 1, display: 'flex', width: '100%', justifyContent: 'center' }}>
          <FormControl sx={{ width: '180px', alignSelf: 'center', backgroundColor: 'white' }} color='secondary' variant="filled">
            <InputLabel id="demo-simple-select-label">Filtros</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Filtros"
              onChange={handleChange}
            >
              <MenuItem value={10}>Alfabético(A-Z)</MenuItem>
              <MenuItem value={20}>Alfabético(Z-A)</MenuItem>
              <MenuItem value={30}>Por fecha(Ascendente)</MenuItem>
              <MenuItem value={40}>Por fecha(Descendente)</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Resultados */}
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            px: 0,
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          {results.length === 0 ? (
            <Typography sx={{ mt: 4, color: 'gray', width: '100%', textAlign: 'center' }}>
              No se encontraron resultados.
            </Typography>
          ) : (
            results.map(product => (
              <Product key={product._id} product={product} />
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default AdvancedSearch;
