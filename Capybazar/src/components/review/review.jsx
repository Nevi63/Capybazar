import React, { useEffect } from 'react'
import { Typography, Button, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import image from "../../assets/images/download.jpg";
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

function review(props) {
  useEffect(()=>{
    console.log('props', props)
  })
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '¿Eliminar reseña?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) return;

    try {
      console.log(props._id)
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/reviews/${props._id}`, {
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Error al eliminar la reseña");

      Swal.fire('¡Eliminada!', 'La reseña ha sido eliminada.', 'success');

      if (props.onDelete) props.onDelete(props._id);
    } catch (err) {
      Swal.fire('Error', 'No se pudo eliminar la reseña.', 'error');
      console.error("❌ Error al eliminar review:", err);
    }
  };

  return (
    <Box sx={{backgroundColor: 'accent.main', p:2, borderRadius: '10px', my:2}}>
        <Box sx={{display: 'flex', justifyContent:'space-between'}}>
            
            <Box sx={{display:'flex'}}>
                <img
                    src={props.userId.profilePicture || image}
                    alt="Perfil"
                    style={{
                    width: 50, // Tamaño de la imagen
                    height: 50,
                    marginRight: 10,
                    borderRadius: "50%", // Hace que sea circular
                    objectFit: "cover" // Ajusta la imagen sin deformarla
                    }}
                />
                <Box>
                    <span style={{ fontWeight: 'bold', color:'white' }}>{props.userId.firstName} {props.userId.lastName}</span>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontSize: '10px' }}>
                    {[...Array(props.rating)].map((_, i) => (
                      <StarIcon key={i} sx={{ fontSize: '20px' }} />
                    ))}
                    </Typography>
                </Box>

            </Box>
            <span style={{color:'white'}} >
            {new Date(props.createdAt).toLocaleString('es-MX', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            })}
             { props.delete && <Button onClick={handleDelete} sx={{ ml:2, p: 1, minWidth: 0 }} color='error' variant='contained'> <DeleteIcon></DeleteIcon></Button>}
            </span>
        </Box>        
        <p style={{color:'white'}}>{props.review}</p>
    </Box>
  )
}

export default review
