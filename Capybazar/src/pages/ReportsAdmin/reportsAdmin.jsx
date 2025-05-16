import { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function reports() {
  const [rows, setRows] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/orders/seller-report', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        setChartData(null);
        setRows([]);
      } else {
        setRows(data.map((item, index) => ({
          id: index + 1,
          nombre: item.name,
          precio: item.price,
          vendidos: item.totalSold,
          ganancias: item.totalRevenue,
          rating: item.rating
        })));

        setChartData({
          labels: data.map(item => item.name),
          datasets: [{
            label: 'Ganancias por producto',
            data: data.map(item => item.totalRevenue),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#B58863', '#68D391']
          }]
        });
      }
    } catch (err) {
      console.error('❌ Error al obtener reportes:', err);
      setChartData(null);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'precio', headerName: 'Precio', width: 100 },
    { field: 'vendidos', headerName: 'Vendidos', width: 100 },
    { field: 'ganancias', headerName: 'Ganancias', width: 150 },
    { field: 'rating', headerName: 'Rating', width: 100 }
  ];

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h4" gutterBottom>Reportes de ventas</Typography>

      {loading ? (
        <Typography>Cargando datos...</Typography>
      ) : rows.length === 0 ? (
        <Typography>No hay datos disponibles.</Typography>
      ) : (
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          alignItems: 'flex-start',
          justifyContent: 'space-between'
        }}>
          <Paper sx={{ width: { xs: '100%', md: '60%' }, height: 400 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[5, 10]}
              sx={{ border: 0 }}
            />
          </Paper>

          <Box sx={{ width: { xs: '100%', md: '40%' }, height: 400 }}>
            <Pie data={chartData} />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default reports;
