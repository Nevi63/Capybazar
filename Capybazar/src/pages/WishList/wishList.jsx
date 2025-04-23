import  React, {useState, useEffect} from 'react'
import { Box } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import WishlistProduct from '../../components/wishlistProduct/wishlistProduct';
import CircularProgress from '@mui/material/CircularProgress';

function wishList() {
    const [wishlist, setWishlist] = useState([]);
    const [filteredWishlist, setFilteredWishlist] = useState([]);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    
    const removeFromWishlist = (productId) => {
        setWishlist(prev => prev.filter(p => p._id !== productId));
        setFilteredWishlist(prev => prev.filter(p => p._id !== productId)); // Remove from filtered wishlist
    };
    useEffect(() => {
        const fetchWishlist = async () => {
          try {
            const res = await fetch('http://localhost:5000/wishlist', {
              headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setLoading(false);
            setWishlist(data.wishlist);
            setFilteredWishlist(data.wishlist);  // Initialize filtered wishlist
          } catch (err) {
            console.error("❌ Error al cargar wishlist:", err);
          }
        };
    
        fetchWishlist();
    }, []);
     
    const handleChange = (event) => {
        const value = event.target.value;
        setFilter(value);
        applyFilter(value);
    };
    const applyFilter = (filterType) => {
        let sortedWishlist = [...wishlist];
        if (filterType === '3') {
            // Sort by date Ascending (original order)
            sortedWishlist = [...wishlist];  // Use original order (no change)
        } else if (filterType === '4') {
            // Sort by date Descending (reverse order)
            sortedWishlist = [...wishlist].reverse(); // Reverse the original wishlist
        } else if (filterType === '1') {
            // Sort alphabetically A-Z
            sortedWishlist.sort((a, b) => a.name.localeCompare(b.name));
        } else if (filterType === '2') {
            // Sort alphabetically Z-A
            sortedWishlist.sort((a, b) => b.name.localeCompare(a.name));
        }
        setFilteredWishlist(sortedWishlist);
    };

  return (
    <Box sx={{px:15, py:5}}>
    <Box sx={{display:'flex', justifyContent:'space-between'}}>
        <h1>Lista de deseos</h1>
            
        <FormControl sx={{width:'250px', alignSelf:'center'}} color='secondary'>
            <InputLabel id="demo-simple-select-label">Filtros</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="Filtros"
                onChange={handleChange}
            >
                 <MenuItem value={'1'}>Alfabético(A-Z)</MenuItem>
                 <MenuItem value={'2'}>Alfabético(Z-A)</MenuItem>
                 <MenuItem value={'3'}>Por fecha(Ascendente)</MenuItem>
                 <MenuItem value={'4'}>Por fecha(Descendente)</MenuItem>
            </Select>
        </FormControl>
    </Box>
    {loading === true && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress />
        </Box>
    )}
    <Box sx={{backgroundColor:'primary.main', display:'flex', flexDirection:'column', px:3}}>
    {loading === false && filteredWishlist.length === 0 ? (
    <p style={{ padding: '1rem', textAlign: 'center' }}>Tu wishlist está vacía.</p>
  ) : (
    filteredWishlist.map((product, index) => (
      <React.Fragment key={product._id}>
        <WishlistProduct product={product} onDelete={removeFromWishlist} />
        {index < filteredWishlist.length - 1 && <hr style={{ width: '100%', borderColor: 'black' }} />}
      </React.Fragment>
    ))
  )}
                
    </Box>
    </Box>
  )
}

export default wishList
