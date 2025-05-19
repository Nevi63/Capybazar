import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Slider, InputLabel, MenuItem,
  FormControl, Select, List, ListItem, ListItemButton, ListItemText
} from '@mui/material';
import Product from '../../components/product/product';
import { useLocation, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import Swal from 'sweetalert2';
import CircularProgress from '@mui/material/CircularProgress';
import customSwal from '../../utils/customSwal';



function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const minDistance = 10;
const valuetext = (value) => value > 1000 ? '$+1000' : `$${value}`;

function AdvancedSearch() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get('query') || '';
  const [results, setResults] = useState([]);
  const [resultsFiltered, setResultsFiltered] = useState([]);
  const [value2, setValue2] = useState([0, 2000]);
  const [sort, setSort] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
        setLoading(false) 
        return res.json();
      })
      .then(data => setResults(data))
      .catch(err => {
        console.error('❌ Error al buscar productos:', err);
        customSwal.fire({
          title: "Sesión expirada",
          text: "No autorizado. Inicia sesión nuevamente.",
          icon: "error"
        }).then(() => {
          localStorage.removeItem('token'); // 🔑 limpia el token inválido
          localStorage.removeItem('user');
          localStorage.removeItem('userType');
          navigate('/');
          window.location.reload();
        });
      });
  }, 500);
  

  // Triggers para búsqueda
  //  useEffect(() => {
  //    fetchResults();
  //  }, [searchTerm, value2, categoryId, sort]);

  useEffect(() => {
    fetchResults();
  }, [location.search]); 
  useEffect(() => {
    let filtered = [...results];

    // Filtro por precio
    filtered = filtered.filter(p =>
      p.price >= value2[0] && (value2[1] > 1000 || p.price <= value2[1])
    );

    // Filtro por categoría
    if (categoryId) {
      filtered = filtered.filter(p => p.categoryId._id === categoryId);
    }

    // Ordenamiento
    if (sort === 'az') filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'za') filtered.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === 'dateAsc') filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sort === 'dateDesc') filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sort === 'reviews') filtered.sort((a, b) => b.rating - a.rating);

    setResultsFiltered(filtered);
}, [results, value2, categoryId, sort]);


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
  if (!localStorage.getItem('token')) return null;
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
          {loading === true && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexBasis: '70%',
                    height: '200px'
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
              {resultsFiltered && loading ==false && (
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Box sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: 'center', sm: 'center', md: "flex-start" },
          alignItems: "stretch",
          gap: 2,
          width: "90%",
          height: 'fit-content',
          mx: 'auto',
          p: 4,
          boxSizing: "border-box",
        }}>
          {resultsFiltered.length === 0 ? (
            <Typography sx={{ mt: 4, color: 'gray', width: '100%', textAlign: 'center' }}>
              No se encontraron resultados.
            </Typography>
          ) : (
            resultsFiltered.map(product => (
              <Product key={product._id} product={product} />
            ))
          )}
        </Box>
      </Box>

              )}
    </Box>
  );
}

export default AdvancedSearch;
