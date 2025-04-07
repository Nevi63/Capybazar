import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Product from '../../components/product/product';
import { Box } from "@mui/material";
import ImageCarousel from '../../components/carousel/carousel';

function Home() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true); // 🟡 nuevo estado
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await fetch('http://localhost:5000/products/public');
        const productsData = await productsRes.json();

        setProducts(productsData);

        if (user && token) {
          const wishlistRes = await fetch(`http://localhost:5000/wishlist`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const wishlistData = await wishlistRes.json();
          setWishlist(wishlistData.wishlist.map(p => p._id));
          setLoading(false); // ✅ solo cuando todo haya terminado
        }
      } catch (err) {
        console.error("❌ Error al cargar datos:", err);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando...</p>; // o un spinner bonito

  return (
    <div>
      <ImageCarousel />
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: { xs: 'center', sm: 'center', md: "flex-start" },
            alignItems: "center",
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
              userLiked={wishlist.includes(String(product._id))}
            />
          ))}
        </Box>
      </Box>
    </div>
  );
}

export default Home;
