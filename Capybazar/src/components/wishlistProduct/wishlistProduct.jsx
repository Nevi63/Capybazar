import  React, {useState, useEffect} from 'react'
import { Collapse, Box, Button, Typography } from "@mui/material";
import Swal from 'sweetalert2';
function wishlistProduct({product, onDelete }) {
    const [isDeleted, setIsDeleted] = useState(false);
    const handleDelete = async()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        try {
            const url = `http://localhost:5000/wishlist/${product._id}`;
            const method = 'DELETE';
          
            const res = await fetch(url, {
              method,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            });
          
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Error en wishlist');
            // Lógica para eliminar el producto del servidor...
            setIsDeleted(true); // Activa la animación de eliminación
            setTimeout(() => {
            onDelete(product._id); // Borra del estado después de la animación
            }, 300); // Tiempo que dura la animación
        } catch (err) {
            console.error("❌ Error wishlist:", err);
            Swal.fire({
              title: "Error",
              text: "No se pudo actualizar la wishlist.",
              icon: "error"
            });
        }
    }
  return (
    <Collapse in={!isDeleted} timeout={300}>
    <Box className="ProductPurchaseHistory" sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
      <Box className="ProductInformation" sx={{ display: 'flex' }}>
        <Box component={"img"} sx={{ width: '120px', height: '120px', borderRadius: '10px', mr: 2, objectFit: 'cover' }} src={product.image} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography>{product.name}</Typography>
          <Typography sx={{ fontSize: '12px' }}>por {product.userId.firstName} {product.userId.lastName}</Typography>
          <Typography>MXN {(product.price).toFixed(2)}</Typography>
        </Box>
      </Box>
      <Box className="botones" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', color: 'white', mx: 1 }}>
        <Button variant='contained' color='accent'>Agregar al carrito</Button>
        <Button variant='contained' color='secondary' onClick={handleDelete}>Eliminar de la wish list</Button>
      </Box>
    </Box>
  </Collapse>
  )
}

export default wishlistProduct
