import { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function reportsAdmin() {
  const [vendors, setVendors] = useState([]);
  const [clients, setClients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/adminReport', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setVendors(data.sellers || []);
      setClients(data.clients || []);
      setCategories(data.categories || []);
    } catch (err) {
      console.error('❌ Error al cargar reportes de admin:', err);
    } finally {
      setLoading(false);
    }
  };

  const columnsVendor = [
    { field: 'name', headerName: 'Vendedor', width: 200 },
    { field: 'totalSold', headerName: 'Productos vendidos', width: 200 },
    { field: 'totalRevenue', headerName: 'Ganancias', width: 200 }
  ];

  const columnsClient = [
    { field: 'name', headerName: 'Cliente', width: 200 },
    { field: 'totalBought', headerName: 'Productos comprados', width: 200 },
    { field: 'totalSpent', headerName: 'Dinero gastado', width: 200 }
  ];

  const columnsCategory = [
    { field: 'name', headerName: 'Categoría', width: 200 },
    { field: 'totalSold', headerName: 'Ventas totales', width: 200 },
    { field: 'totalRevenue', headerName: 'Ganancias', width: 200 }
  ];

  const buildChartData = (labels, values) => ({
    labels,
    datasets: [{
      label: 'Distribución',
      data: values,
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#B58863',
        '#68D391', '#00C9A7', '#FF6B6B', '#6A5ACD'
      ]
    }]
  });

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h4" gutterBottom>Reportes Administrativos</Typography>

      {loading ? (
        <Typography>Cargando...</Typography>
      ) : (
        <>
          {/* Vendedores */}
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Vendedores</Typography>
          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
            <Paper sx={{ flex: 1 }}>
              <DataGrid
                rows={vendors.map((v, i) => ({ id: i + 1, ...v }))}
                columns={columnsVendor}
                pageSizeOptions={[5, 10]}
                autoHeight
              />
            </Paper>
            <Paper sx={{ width: 400, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Pie data={buildChartData(vendors.map(v => v.name), vendors.map(v => v.totalRevenue))} />
            </Paper>
          </Box>

          {/* Clientes */}
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Clientes</Typography>
          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
            <Paper sx={{ flex: 1 }}>
              <DataGrid
                rows={clients.map((c, i) => ({ id: i + 1, ...c }))}
                columns={columnsClient}
                pageSizeOptions={[5, 10]}
                autoHeight
              />
            </Paper>
            <Paper sx={{ width: 400, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Pie data={buildChartData(clients.map(c => c.name), clients.map(c => c.totalSpent))} />
            </Paper>
          </Box>

          {/* Categorías */}
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Categorías</Typography>
          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
            <Paper sx={{ flex: 1 }}>
              <DataGrid
                rows={categories.map((cat, i) => ({ id: i + 1, ...cat }))}
                columns={columnsCategory}
                pageSizeOptions={[5, 10]}
                autoHeight
              />
            </Paper>
            <Paper sx={{ width: 400, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Pie data={buildChartData(categories.map(c => c.name), categories.map(c => c.totalRevenue))} />
            </Paper>
          </Box>
        </>
      )}
    </Box>
  );
}

export default reportsAdmin;
