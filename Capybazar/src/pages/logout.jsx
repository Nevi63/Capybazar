import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Elimina el usuario del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('user');
    // Redirige al usuario a la página de inicio
    navigate('/login');
  }, [navigate]);

  return <p>Cerrando sesión...</p>; // Puedes mostrar un mensaje mientras se cierra la sesión
}

export default Logout;