import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home';
import Login from './pages/Login/login';
import Signup from './pages/Signup/signup';
import Cart from './pages/Cart/Cart';
import WishList from './pages/WishList/WishList';
import PurchaseHistory from './pages/PurchaseHistory/PurchaseHistory';
import EditProfile from './pages/EditProfile/EditProfile';
import AdvancedSearch from './pages/AdvancedSearch/advancedSearch';
import CheckOut from './pages/CheckOut/CheckOut';
import ProductInformationClient from './pages/ProductInformationClient/ProductInformationClient';
import CreateProduct from './pages/CreateProduct/CreateProduct';
import Inventory from './pages/Inventory/Inventory';
import ProductInformation from './pages/ProductInformation/ProductInformation';
import ProductList from './pages/ProductList/ProductList';
import CategoryList from './pages/CategoryList/CategoryList';
import ProductInformationAdmin from './pages/ProductInformationAdmin/ProductInformationAdmin';
import ProductListAdmin from './pages/ProductListAdmin/ProductListAdmin';
import { Typography } from '@mui/material';
import Logout from './pages/logout';
import { GuestRoute, GuestClientRoute, ClientRoute, SellerRoute, AdminRoute, AuthenticatedRoute } from './RouteGuards'; // Importa tus guardias
import Navbar from './components/navbar/navbar';
import Reports from './pages/Reports/reports';
import { useLocation } from 'react-router-dom';
function App() {
  const userType = localStorage.getItem("userType") || 'guest';

  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";
  
  // cliente, guest, vendedor, admin
  return (
    <>
       {!hideNavbar && userType && <Navbar userType={userType} />}
      <Routes>
        {/* guest & client*/}
        <Route  element={<GuestClientRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/advancedSearch" element={<AdvancedSearch />} />
          <Route path="/productInfo" element={<ProductInformationClient />} />
        </Route>

        {/* guest */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* anyone logged in */}
        <Route element={<AuthenticatedRoute />}>
            <Route path="/editProfile" element={<EditProfile />} />
            <Route path="/logout" element={<Logout />} />
        </Route>

        {/* client */}
        <Route element={<ClientRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/purchaseHistory" element={<PurchaseHistory />} />
          <Route path="/checkOut" element={<CheckOut />} />
        </Route>

        {/* seller */}
        <Route element={<SellerRoute />}>
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/editProduct" element={<CreateProduct />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/productInformation" element={<ProductInformation />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/reports" element={<Reports />} />
        </Route>

        {/* admin */}
        <Route element={<AdminRoute />}>
          <Route path="/categoryList" element={<CategoryList />} />
          <Route path="/productListAdmin" element={<ProductListAdmin />} />
          <Route path="/reviewManagement" element={<ProductInformationAdmin />} />
        </Route>

        <Route path="*" element={<Typography sx={{ p: 5 }} variant="h4">Página no encontrada</Typography>} />
      </Routes>
    </>
  );
}

export default App;