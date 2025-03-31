import { AppBar, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from "../../assets/logo_s.svg";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const pagesByUserType = {
  vendedor: ['Productos', 'Inventario', 'Reportes'],
  admin: ['Productos', 'Categorías'],
  cliente: ['Buscar'],
  guest: ['Buscar'],
};
const pagesSeller = ['Productos', 'Inventario', 'Reportes'];
const pagesAdmin = ['Productos', 'Categorías'];
const settingsGuest = ['Iniciar Sesión', 'Registrarse'];
const settingsClient = ['Mi cuenta', 'Historial de compras', 'Lista de deseos', 'Cerrar Sesión'];
const settingsSeller = ['Mi cuenta', 'Cerrar Sesión'];

function Navbar() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('guest');
  const [searchTerm, setSearchTerm] = useState(''); // 🟢 CORREGIDO: definición del estado

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserType(parsedUser.userType);
    } else {
      setUserType('guest');
    }
  }, []);

  const routeMap = {
    'Productos': '/productList',
    'Inventario': '/inventory',
    'Reportes': '/reports',
    'Categorías': '/categoryList',
    'Buscar': '/advancedSearch',
    'Iniciar Sesión': '/login',
    'Registrarse': '/signup',
    'Mi cuenta': '/editProfile',
    'Carrito': '/cart',
    'Historial de compras': '/purchaseHistory',
    'Lista de deseos': '/wishList',
    'Cerrar Sesión': '/logout'
  };

  const navigateTo = (page) => {
    const route = routeMap[page];
    if (typeof route === 'string') {
      navigate(route);
    } else if (typeof route === 'object') {
      navigate(userType === 'admin' ? route.admin : route.default);
    }
  };

  const goToHome = () => navigate('/');

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <AppBar position="sticky" color='primary'>
      <Container maxWidth="none">
        <Toolbar disableGutters>
          <Box component="img" src={logo} alt="Logo"
            sx={{ width: 50, height: 50, mr: 1, display: { xs: 'none', md: 'flex' }, '&:hover': { cursor: 'pointer' } }}
            onClick={goToHome}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={goToHome}
            sx={{ mr: 2, fontSize: 25, color: 'inherit', textDecoration: 'none', display: { xs: 'none', md: 'flex' }, '&:hover': { cursor: 'pointer' } }}
          >
            Capybazar
          </Typography>

          <Box sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            justifyContent: userType === "cliente" || userType === "guest" ? "center" : "flex-start"
          }}>
            {(userType === "cliente" || userType === "guest") && (
              <TextField
                variant="outlined"
                placeholder="Buscar..."
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/advancedSearch?query=${encodeURIComponent(searchTerm)}`);
                  }
                }}
                sx={{
                  backgroundColor: "white", borderRadius: 1, mr: 2, width: '100%',
                  maxWidth: '1000px', mx: 3, my: 2, color: 'inherit', textTransform: 'none', fontSize: 16
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => navigate(`/advancedSearch?query=${encodeURIComponent(searchTerm)}`)}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}

            {(userType === "vendedor" || userType === "admin") &&
              (userType === "vendedor" ? pagesSeller : pagesAdmin).map((page) => (
                <Button key={page} onClick={() => navigateTo(page)} sx={{ mx: 1, my: 2, color: 'inherit', textTransform: 'none', fontSize: 16 }}>
                  {page}
                </Button>
              ))}
          </Box>

          {/* Responsive Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              {pagesByUserType[userType]?.map((page) => (
                <MenuItem key={page} onClick={() => { navigateTo(page); handleCloseNavMenu(); }}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box component="img" src={logo} alt="Logo" onClick={goToHome}
            sx={{ width: 50, height: 50, display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            onClick={goToHome}
            sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontSize: 25, color: 'inherit', textDecoration: 'none' }}
          >
            Capybazar
          </Typography>

          <Tooltip title="Opciones">
            <Button onClick={handleOpenUserMenu} color="secondary" variant="contained" sx={{ p: 1, minWidth: 0 }}>
              <AccountCircleIcon />
              <ArrowDropDownIcon />
            </Button>
          </Tooltip>

          {(userType === "cliente") && (
            <Button onClick={() => navigateTo('Carrito')} color="secondary" variant="contained" sx={{ mx: 2, p: 1 }}>
              <ShoppingCartIcon />
            </Button>
          )}

          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            sx={{ mt: '45px' }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {(userType === "guest" ? settingsGuest : userType === "cliente" ? settingsClient : settingsSeller).map((setting) => (
              <MenuItem key={setting} onClick={() => { navigateTo(setting); handleCloseUserMenu(); }}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
