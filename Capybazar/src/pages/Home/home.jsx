import React, { useEffect, useState } from 'react';
import Product from '../../components/product/product';
import { Box } from "@mui/material";
import ImageCarousel from '../../components/carousel/carousel';
import CircularProgress from '@mui/material/CircularProgress';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await fetch('http://localhost:5000/products/public');
        const productsData = await productsRes.json();

        setLoading(false);
        setProducts(productsData);
      } catch (err) {
        console.error("❌ Error al cargar datos:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ImageCarousel />
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
    {loading === true ? (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '200px'
        }}
      >
        <CircularProgress />
      </Box>
    ) : (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: 'center', sm: 'center', md: "flex-start" },
          alignItems: "stretch",
          gap: 2,
          width: "90%",
          mx: 'auto',
          p: 4,
          boxSizing: "border-box",
        }}
      >
        {products.map(product => (
          <Product
            key={product._id}
            product={product}
          />
        ))}
      </Box>
    )}
  </Box>
    </div>
  );
}

export default Home;
