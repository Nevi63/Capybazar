import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Slider, InputLabel, MenuItem,
  FormControl, Select, List, ListItem, ListItemButton, ListItemText
} from '@mui/material';
import Product from '../../components/product/product';
import { useLocation } from 'react-router-dom';
import { debounce } from 'lodash';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const minDistance = 10;
const valuetext = (value) => value > 1000 ? '$+1000' : `$${value}`;

function AdvancedSearch() {
  const query = useQuery();
  const searchTerm = query.get('query') || '';
  const [results, setResults] = useState([]);
  const [value2, setValue2] = useState([0, 2000]);
  const [sort, setSort] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  // Obtener categorías
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("❌ Error al cargar categorías:", err));
  }, []);

  const fetchResults = debounce(() => {
    const token = localStorage.getItem('token');
    const params = new URLSearchParams({
      query: searchTerm,
      minPrice: value2[0],
      maxPrice: value2[1] > 1000 ? '+1000' : value2[1],
      category: categoryId,
      sort: sort
    });

    fetch(`http://localhost:5000/products/search?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Token inválido");
        return res.json();
      })
      .then(data => setResults(data))
      .catch(err => {
        console.error('❌ Error al buscar productos:', err);
        alert("No autorizado. Inicia sesión nuevamente.");
      });
  }, 500);

  // Triggers para búsqueda
  useEffect(() => {
    fetchResults();
  }, [searchTerm, value2, categoryId, sort]);

  const handlePriceChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;
    if (newValue[1] - newValue[0] < minDistance) {
      const clamped = activeThumb === 0
        ? Math.min(newValue[0], 2000 - minDistance)
        : Math.max(newValue[1], minDistance);
      const adjusted = activeThumb === 0
        ? [clamped, clamped + minDistance]
        : [clamped - minDistance, clamped];
      setValue2(adjusted);
    } else {
      setValue2(newValue);
    }
  };

  return (
    <Box sx={{ display: 'flex', position: 'relative', height: '100%' }}>
      {/* Filtros laterales */}
      <Box sx={{
        display: 'flex', flexDirection: 'column', flexBasis: '15%', backgroundColor: 'primary.main',
        height: 'calc(100vh - 70px)', position: 'sticky', top: '70px', left: 0,
      }}>
        {/* Categorías */}
        <Box sx={{ p: 1 }}>
          <List sx={{ backgroundColor: 'white', borderRadius: '5px', p: 0 }}>
            <ListItem sx={{ backgroundColor: 'accent.main', borderRadius: '5px 5px 0 0' }}>
              <ListItemText primary="Categorías" />
            </ListItem>
            <ListItemButton selected={!categoryId} onClick={() => setCategoryId('')}>
              <ListItemText primary="Todas" />
            </ListItemButton>
            {categories.map(cat => (
              <ListItemButton
                key={cat._id}
                selected={categoryId === cat._id}
                onClick={() => setCategoryId(cat._id)}
              >
                <ListItemText primary={cat.name} />
              </ListItemButton>
            ))}
          </List>
        </Box>

        {/* Rango de precio */}
        <Box sx={{ p: 3 }}>
          <p style={{ color: 'white' }}>Rango de precio</p>
          <Slider
            color='secondary'
            min={0}
            max={1001}
            value={value2}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            getAriaValueText={(value) => value > 1000 ? '$+1000' : `$${value}`}
            valueLabelFormat={(value) => value > 1000 ? '$+1000' : `$${value}`}
            disableSwap
          />

        </Box>

        {/* Ordenamiento */}
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
          <FormControl sx={{ width: '180px', backgroundColor: 'white' }} color="secondary" variant="filled">
            <InputLabel id="sort-select-label">Ordenar por</InputLabel>
            <Select
              labelId="sort-select-label"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <MenuItem value="">Orden por defecto</MenuItem>
              <MenuItem value="az">Alfabético (A-Z)</MenuItem>
              <MenuItem value="za">Alfabético (Z-A)</MenuItem>
              <MenuItem value="dateAsc">Fecha (Ascendente)</MenuItem>
              <MenuItem value="dateDesc">Fecha (Descendente)</MenuItem>
              <MenuItem value="reviews">Más estrellas</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Resultados */}
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Box sx={{
          display: "flex",
          flexWrap: "wrap",
          px: 0,
          justifyContent: { xs: "center", md: "flex-start" },
        }}>
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
