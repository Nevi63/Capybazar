import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import customSwal from '../../utils/customSwal';
function checkOut() {
  const [paymentMethod, setPaymentMethod] = useState(-1);
  const [cart, setCart] = useState(null);
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/cart/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error('Error al cargar el carrito', err);
    }
  };
  
const handleSubmit = async () => {
  if (paymentMethod < 0) {
    return customSwal.fire({ title: 'Método de pago requerido', text: 'Selecciona un método de pago.', icon: 'warning' });
  }

  if (!cart?.products?.length) {
    return customSwal.fire({ title: 'Carrito vacío', text: 'Agrega productos antes de finalizar la compra.', icon: 'warning' });
  }

  // Validaciones de campos
  const calle = document.getElementById('calle')?.value.trim();
  const colonia = document.getElementById('colonia')?.value.trim();
  const numero = document.getElementById('numero')?.value.trim();
  const municipio = document.getElementById('municipio')?.value.trim();
  const estado = document.getElementById('estado')?.value.trim();
  const cp = document.getElementById('cp')?.value.trim();

  if (!calle || !colonia || !numero || !municipio || !estado || !cp) {
    return customSwal.fire({ title: 'Campos obligatorios', text: 'Completa todos los campos de dirección.', icon: 'warning' });
  }

  if (isNaN(numero) || isNaN(cp)) {
    return customSwal.fire({ title: 'Formato inválido', text: 'El número y el código postal deben ser numéricos.', icon: 'warning' });
  }

  if (paymentMethod === 1) {
    const tarjeta = document.getElementById('tarjeta')?.value.trim();
    const expiracion = document.getElementById('expiracion')?.value.trim();
    const cvv = document.getElementById('cvv')?.value.trim();
    const nombreTitular = document.getElementById('nombreTitular')?.value.trim();

    const tarjetaRegex = /^\d{16}$/;
    const expiracionRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    if (!tarjetaRegex.test(tarjeta)) {
      return customSwal.fire({ title: 'Número de tarjeta inválido', text: 'Debe contener exactamente 16 dígitos numéricos.', icon: 'warning' });
    }

    if (!expiracionRegex.test(expiracion)) {
      return customSwal.fire({ title: 'Fecha de expiración inválida', text: 'Debe tener formato MM/AA.', icon: 'warning' });
    }

    if (!cvvRegex.test(cvv)) {
      return customSwal.fire({ title: 'CVV inválido', text: 'Debe contener exactamente 3 dígitos numéricos.', icon: 'warning' });
    }

    if (!nombreTitular) {
      return customSwal.fire({ title: 'Campo faltante', text: 'Debes ingresar el nombre del titular de la tarjeta.', icon: 'warning' });
    }
  }

  const confirm = await customSwal.fire({
    title: '¿Finalizar compra?',
    text: '¿Estás seguro de que deseas realizar el pedido?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, confirmar',
    cancelButtonText: 'Cancelar'
  });

  if (!confirm.isConfirmed) return;
    const order = {
      userId: user._id,
      total: cart.total,
      paymentMethod: paymentMethod === 0 ? 'paypal' : 'tarjeta',
      items: cart.products.map(p => ({
        productId: p.productId._id,
        quantity: p.quantity,
        price: p.productId.price
      }))
    };

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(order)
      });
    
      if (res.ok) {
        navigate('/order-confirmation');
      } else {
        const data = await res.json();
        customSwal.fire({
          title: 'Stock insuficiente',
          text: data.message || 'No hay suficiente stock para completar la compra.',
          icon: 'warning'
        });
        navigate('/cart');
      }
    } catch (err) {
      console.error('Error al crear la orden', err);
      customSwal.fire({
        title: 'Error',
        text: 'No se pudo completar la compra. Intenta más tarde.',
        icon: 'error'
      });
    }
  };
  return (
    <Box sx={{display:'flex', p: 5, justifyContent:'space-around', flexDirection:{xs: 'column', sm: 'column', md:'row'}, }}>
      <Box sx={{display:'flex', flexDirection:'column',  flexBasis:'50%', m:2}}>
        <h1>Finalizar compra</h1>
        <h3>Dirección de envío:</h3>
        <Box sx={{my:2, display:'flex'}}>
          <TextField
            required
            id="calle"
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
            id="colonia"
            label="Colonia"
            defaultValue=""
            color="secondary"
            variant="filled"
            focused 
          />
          <TextField
            sx={{ml:1, flexBasis:'15%'}}
            required
            id="numero"
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
            id="municipio"
            label="Municipio"
            defaultValue=""
            color="secondary"
            variant="filled"
            focused 
          />
          <TextField
            sx={{ml:1, flexBasis:'40%'}}
            required
            id="estado"
            label="Estado"
            defaultValue=""
            color="secondary"
            variant="filled"
            focused 
          />
          <TextField
            sx={{ml:1, flexBasis:'20%'}}
            required
            id="cp"
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
                    value={paymentMethod}
                    label="Método de pago"
                    onChange={e => setPaymentMethod(e.target.value)}
                >
                    <MenuItem value={0}>PayPal</MenuItem>
                    <MenuItem value={1}>Tarjeta de credito</MenuItem>
                </Select>
            </FormControl>
        </span>
        {paymentMethod === 1 && (
          <Box sx={{my: 2}}>
            <TextField
              required
              id="tarjeta"
              label="Número de tarjeta"
              fullWidth
              color="secondary"
              variant="filled"
              inputProps={{ maxLength: 16, pattern: "[0-9]{16}" }}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                required
                id="expiracion"
                label="Fecha de expiración (MM/AA)"
                color="secondary"
                variant="filled"
                inputProps={{ pattern: "(0[1-9]|1[0-2])\\/([0-9]{2})" }}
                sx={{ flex: 1 }}
              />
              <TextField
                required
                id="cvv"
                label="CVV"
                color="secondary"
                variant="filled"
                inputProps={{ maxLength: 3, pattern: "[0-9]{3}" }}
                sx={{ flex: 1 }}
              />
            </Box>
            <TextField
              required
              id="nombreTitular"
              label="Nombre del titular"
              fullWidth
              color="secondary"
              variant="filled"
              sx={{ mt: 2 }}
            />
          </Box>
        )}
        <Button onClick={handleSubmit} color='success' variant='contained' sx={{my:2}}>Finalizar compra</Button>
      </Box>
      <Box sx={{backgroundColor:'primary.main', flexBasis:'25%', display:'flex', flexDirection:'column', p:3, height:'fit-content'}}>
        <h3>Productos</h3>
        {cart?.products?.map(p => (
          <Box key={p.productId._id}>
            <Box className='uwu'  sx={{px: 2}}>
              <span style={{display:'flex', justifyContent:'space-between'}}>
                <p>{p.productId.name}</p>
                <p>{(p.productId.price).toFixed(2)}</p>
              </span>
              <span style={{display:'flex', justifyContent:'space-between'}}>
                <p>x{p.quantity}</p>
                <p>{(p.productId.price * p.quantity).toFixed(2)}</p>
              </span>

            </Box>
            <hr style={{border:'1px solid black', width:'100%'}} />
          </Box>
        ))}
        <span style={{display:'flex', justifyContent:'space-between'}}>
          <p>Total:</p>
          <p>MXN {(cart?.total.toFixed(2)) || 0}</p>
        </span>
      </Box>
      
    </Box>
  )
}

export default checkOut
