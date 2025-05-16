import React, {useState, useEffect} from 'react'
import { Button, Box } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';
import customSwal from "../../utils/customSwal";

function purchaseHistory() {
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const seeProduct = (productId) => {
      navigate(`/productInfo/${productId}`); // podrías pasar el producto aquí
    };
    
    useEffect(() => {
        fetchOrders();
    }, []);
    useEffect(() => {
      if (filter === 30) {
        setOrders(prev => [...prev].sort((a, b) => new Date(a.date) - new Date(b.date)));
      } else if (filter === 40) {
        setOrders(prev => [...prev].sort((a, b) => new Date(b.date) - new Date(a.date)));
      } else if (filter === 10) {
        setOrders(prev => [...prev].sort((a, b) => a.items[0]?.productId?.name?.localeCompare(b.items[0]?.productId?.name)));
      } else if (filter === 20) {
        setOrders(prev => [...prev].sort((a, b) => b.items[0]?.productId?.name?.localeCompare(a.items[0]?.productId?.name)));
      }
    }, [filter]);

    const handleChange = (event) => {
     setFilter(event.target.value);
    };

    const handleAddToCart = async (productId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  try {
    const res = await fetch(`http://localhost:5000/cart/${user._id}/add`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        productId,
        quantity: 1,
        mode: 'add'
      })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al agregar al carrito');

    customSwal.fire({
      title: '¡Agregado al carrito!',
      text: `El producto se agregó correctamente.`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });
  } catch (err) {
    console.error("❌ Error al agregar al carrito:", err);
    customSwal.fire({
      title: "Error",
      text: "No se pudo agregar al carrito.",
      icon: "error"
    });
  }
    };


    const fetchOrders = async() =>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/orders/my-orders', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            const data = await response.json();
            setOrders(data);
            setLoading(false)
          } catch (error) {
            console.error('Error al obtener productos:', error);
          }
    }

if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        width: '100%',
      }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box sx={{px:15, py:5}}>
        <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <h1>Historial de compras</h1>
                
            <FormControl sx={{width:'250px', alignSelf:'center'}} color='secondary'>
                <InputLabel id="demo-simple-select-label">Filtros</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter}
                    label="Filtros"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Alfabético(A-Z)</MenuItem>
                    <MenuItem value={20}>Alfabético(Z-A)</MenuItem>
                    <MenuItem value={30}>Fecha de compra(Ascendente)</MenuItem>
                    <MenuItem value={40}>Fecha de compra(Descendente)</MenuItem>
                </Select>
            </FormControl>
        </Box>
        <Box sx={{display:'flex', flexDirection:'column'}}>
        {orders.map((order, idx) => (
            <Box key={idx}>
                <p>Compra del {new Date(order.date).toLocaleString()}</p>
                <p>Estado: pendiente</p>
                <Box sx={{ backgroundColor: 'primary.main', display: 'flex', flexDirection: 'column', px: 3 }}>
                {order.items.map((item, i) => (
                   <React.Fragment key={i}>
                   <Box className="ProductPurchaseHistory" sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                     <Box className="ProductInformation" sx={{ display: 'flex' }}>
                       <Box component="img" sx={{ width: '120px', height: '120px', borderRadius: '10px', mr: 2 }} src={item.productId.image || 'fallback.jpg'} />
                       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                         <span>{item.productId.name}</span>
                         <span style={{ fontSize: '12px' }}>por {item.productId.brand}</span>
                         <span>MXN {item.price}</span>
                         <span>x {item.quantity}</span>
                       </Box>
                     </Box>
                     <Box className="botones" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', color: 'white', mx: 1 }}>
                      <Button
                        variant="contained"
                        color="accent"
                        onClick={() => handleAddToCart(item.productId._id)} // ✅ función anónima
                      >
                        Agregar al carrito
                      </Button>

                       <Button onClick={()=>{seeProduct(item.productId._id)}} variant='contained' color='accent'>Ver Producto</Button>
                     </Box>
                   </Box>
                   {i < order.items.length - 1 && <hr style={{ width: '100%', borderColor: 'black' }} />}
                 </React.Fragment>
                ))}
                </Box>
            </Box>
        ))}
           
        </Box>
    </Box>
  )
}

export default purchaseHistory
