import { AppBar, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import React from 'react';
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

function Navbar({ userType }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky" color='primary'>
      <Container maxWidth="none">
        <Toolbar disableGutters>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ width: 50, height: 50, mr: 1, display: { xs: 'none', md: 'flex' } }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{ mr: 2, fontSize: 25, color: 'inherit', textDecoration: 'none', display: { xs: 'none', md: 'flex' } }}
          >
            Capybazar
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' } ,
              justifyContent: userType === "cliente" || userType === "guest" ? "center" : "flex-start"
            }}
          >

            {(userType === "cliente" || userType === "guest") && (
              <TextField
                variant="outlined"
                placeholder="Buscar..."
                size="small"
                sx={{ backgroundColor: "white", borderRadius: 1, mr: 2, width:'100%', maxWidth:'1000px', mx:3, my: 2, color: 'inherit',textTransform: 'none', fontSize: 16 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}

            {(userType === "vendedor" || userType === "admin") &&
              (userType === "vendedor" ? pagesSeller : pagesAdmin).map((page) => (
                <Button key={page} sx={{ mx: 1,  my: 2, color: 'inherit',textTransform: 'none', fontSize: 16  }}>
                  {page}
                </Button>
              ))}
          </Box>

          {/* responsive */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pagesByUserType[userType]?.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center', color: 'inherit' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
                width: 50,
                height: 50,
                display: { xs: 'flex', md: 'none' }, mr: 1 
            }}
        />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontSize: 25,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Capybazar
        </Typography>

          <Tooltip title="Opciones">
            <Button onClick={handleOpenUserMenu} color="secondary" variant="contained" sx={{ p: 1, minWidth: 0 }}>
              <AccountCircleIcon />
              <ArrowDropDownIcon />
            </Button>
          </Tooltip>
          {(userType === "cliente" || userType === "guest") && (
            <Button color="secondary" variant="contained" sx={{ color: "white", mx: 2, p: 1}}>
              <ShoppingCartIcon />
            </Button>
          )}
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {(userType === "guest" ? settingsGuest : userType === "cliente" ? settingsClient : settingsSeller).map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
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
