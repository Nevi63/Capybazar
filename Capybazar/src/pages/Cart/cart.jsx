import React, { useEffect, useState } from 'react';
import { Typography, Button, Box } from "@mui/material";
import Swal from 'sweetalert2';
import NumberInput from '../../components/numberInput/numberInput';
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from 'react-router-dom'

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/cart/user/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setLoading(false)
      setCart(data);
    } catch (err) {
      console.error('❌ Error al cargar el carrito', err);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/cart/${user._id}/add`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity: newQuantity })
      });
      if (res.ok) {
        fetchCart();
      }
    } catch (err) {
      console.error('❌ Error al actualizar cantidad', err);
    }
  };
  const goToCheckout = ()=>{
    navigate(`/checkout`);
  }

  const handleRemove = async (productId) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar producto?',
      text: "Esta acción quitará el producto del carrito.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (!confirm.isConfirmed) return;

    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/cart/${user._id}/remove`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId })
      });
      fetchCart();
    } catch (err) {
      console.error('❌ Error al remover producto', err);
    }
  };

  const handleClearCart = async () => {
    const confirm = await Swal.fire({
      title: '¿Vaciar carrito?',
      text: "Esta acción eliminará todos los productos del carrito.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar'
    });

    if (!confirm.isConfirmed) return;

    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/cart/${user._id}/clear`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchCart();
    } catch (err) {
      console.error('❌ Error al vaciar el carrito', err);
    }
  };

  return (
    <Box sx={{ p: 8, display: 'flex', flexDirection: { sm: 'column', md: 'row' } }}>
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
      { loading ==false &&(
        <Box sx={{ backgroundColor: 'primary.main', flexBasis: '70%', m: 2, p: 1 }}>
        <h1 style={{ fontWeight: 'normal', marginLeft: '2rem' }}>Carrito</h1>
        <hr style={{ border: '1px solid black' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {loading===false && cart?.products?.length > 0 ? (
            cart.products.map(item => (
              <Box key={item.productId._id} sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                <Box sx={{ display: 'flex' }}>
                  <Box
                    component={"img"}
                    src={item.productId.image}
                    sx={{ width: '120px', height: '120px', borderRadius: '10px', mr: 2, objectFit: 'cover' }}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <span>{item.productId.name}</span>
                    <span style={{ fontSize: '12px' }}>
                      por {item.productId.userId?.firstName || 'Vendedor'}
                    </span>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '1.5rem' }}>
                      <NumberInput
                        value={item.quantity}
                        onChange={(val) => handleQuantityChange(item.productId._id, val)}
                      />
                      <Button
                        sx={{ ml: 2 }}
                        variant="contained"
                        color="secondary"
                        onClick={() => handleRemove(item.productId._id)}
                      >
                        Eliminar
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'black', mx: 1 }}>
                  <p>MXN {item.productId.price * item.quantity}</p>
                </Box>
              </Box>
            ))
          ) : (
            <Typography sx={{ p: 2 }}>No hay productos en el carrito.</Typography>
          )}
          <hr style={{ border: '1px solid black', width: '100%' }} />
          <Box sx={{ textAlign: 'right', px: 2 }}>
            <p>Subtotal ({cart?.products?.length || 0} productos): MXN {cart?.total || 0}</p>
          </Box>
        </Box>
        <Button variant="outlined" color="error" onClick={handleClearCart} sx={{ m: 2 }}>
          Vaciar carrito
        </Button>
      </Box>
      )



      }

      <Box sx={{ backgroundColor: 'primary.main', flexBasis: '20%', m: 2, p: 4, height: 'fit-content', display: 'flex', flexDirection: 'column' }}>
        <Box>
          <p>Subtotal Productos:</p>
          <p>MXN {cart?.total || 0}</p>
        </Box>
        <Button onClick={goToCheckout} color='accent' variant='contained' sx={{ justifySelf: 'center' }}>Check Out</Button>
      </Box>
    </Box>
  );
}

export default Cart;
