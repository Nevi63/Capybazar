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

const pagesSeller = ['Productos', 'Inventario', 'Reportes'];
const pagesAdmin = ['Productos', 'Categorías'];
const settingsGuest = ['Iniciar Sesión', 'Registrarse'];
const settingsClient = ['Mi cuenta', 'Historial de compras', 'Lista de deseos', 'Cerrar Sesión'];
const settingsSeller = ['Mi cuenta', 'Cerrar Sesión'];

function Navbar({ userType }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#f4b183" }}>
      <Container maxWidth="none">
        <Toolbar disableGutters>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ width: 50, height: 50, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{ mr: 2, fontSize: 25, color: 'inherit', textDecoration: 'none' }}
          >
            Capybazar
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: userType === "cliente" || userType === "guest" ? "center" : "flex-start"
            }}
          >

            {(userType === "cliente" || userType === "guest") && (
              <TextField
                variant="outlined"
                placeholder="Buscar..."
                size="small"
                sx={{ backgroundColor: "white", borderRadius: 1, mr: 2, width:'100%', maxWidth:'1000px', mx:3 }}
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
                <Button key={page} sx={{ mx: 1, color: 'inherit', fontWeight: 'bold' }}>
                  {page}
                </Button>
              ))}
          </Box>


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
