import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Supongamos que tienes una función para obtener el rol del usuario
const getUserRole = () => {
  // Aquí deberías obtener el rol del usuario desde tu estado de autenticación o backend
  // Ejemplo simulado:
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.role : null;
};

// Componente para proteger rutas de guest
export const GuestRoute = ({ children }) => {
  const role = getUserRole();
  if (!role) {
    return <Outlet />; // Permite el renderizado de la ruta si es cliente
  }
  return <Navigate to="/" replace />; // Redirige a la página de inicio si no es cliente
};
// Componente para proteger rutas de guest y cliente
export const GuestClientRoute = ({ children }) => {
  const role = getUserRole();
  if (!role || role ==='cliente') {
    return <Outlet />; // Permite el renderizado de la ruta si es cliente
  }
  return <Navigate to="/" replace />; // Redirige a la página de inicio si no es cliente
};

// Componente para proteger rutas de cliente
export const ClientRoute = ({ children }) => {
  const role = getUserRole();
  if (role === 'cliente') {
    return <Outlet />; // Permite el renderizado de la ruta si es cliente
  }
  return <Navigate to="/" replace />; // Redirige a la página de inicio si no es cliente
};

// Componente para proteger rutas de vendedor
export const SellerRoute = ({ children }) => {
  const role = getUserRole();
  if (role === 'vendedor') {
    return <Outlet />; // Permite el renderizado de la ruta si es vendedor
  }
  return <Navigate to="/" replace />; // Redirige a la página de inicio si no es vendedor
};

// Componente para proteger rutas de administrador
export const AdminRoute = ({ children }) => {
  const role = getUserRole();
  if (role === 'admin') {
    return <Outlet />; // Permite el renderizado de la ruta si es administrador
  }
  return <Navigate to="/" replace />; // Redirige a la página de inicio si no es administrador
};

// Componente para proteger rutas de usuarios autenticados
export const AuthenticatedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        return <Outlet />;
    }
    return <Navigate to="/login" replace />; // Redirige a login si no esta autenticado
};