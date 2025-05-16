import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// 📌 Reporte para administrador → GET /adminReport
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ message: 'No autorizado' });
    }

    const orders = await Order.find()
      .populate('userId', 'firstName lastName') // Cliente
      .populate({
        path: 'items.productId',
        populate: [
          { path: 'userId', select: 'firstName lastName' },     // Vendedor
          { path: 'categoryId', select: 'name' }                // Categoría
        ]
      });

    const sellerMap = {};
    const clientMap = {};
    const categoryMap = {};

    for (const order of orders) {
      // 🧍 CLIENTE
      const client = order.userId;
      const clientId = client?._id?.toString() || 'desconocido';
      const clientName = client ? `${client.firstName} ${client.lastName}` : 'Desconocido';

      if (!clientMap[clientId]) {
        clientMap[clientId] = { name: clientName, totalBought: 0, totalSpent: 0 };
      }

      for (const item of order.items) {
        const product = item.productId;
        if (!product) continue;

        // 🧍‍♂️ VENDEDOR
        const seller = product.userId;
        const sellerId = seller?._id?.toString() || 'desconocido';
        const sellerName = seller ? `${seller.firstName} ${seller.lastName}` : 'Desconocido';

        if (!sellerMap[sellerId]) {
          sellerMap[sellerId] = { name: sellerName, totalSold: 0, totalRevenue: 0 };
        }
        sellerMap[sellerId].totalSold += item.quantity;
        sellerMap[sellerId].totalRevenue += item.quantity * item.price;

        // 🛍️ CLIENTE (suma por cada producto)
        clientMap[clientId].totalBought += item.quantity;
        clientMap[clientId].totalSpent += item.quantity * item.price;

        // 🗂️ CATEGORÍA
        const category = product.categoryId;
        const categoryId = category?._id?.toString() || 'sinCategoria';
        const categoryName = category?.name || 'Sin categoría';

        if (!categoryMap[categoryId]) {
          categoryMap[categoryId] = { name: categoryName, totalSold: 0, totalRevenue: 0 };
        }
        categoryMap[categoryId].totalSold += item.quantity;
        categoryMap[categoryId].totalRevenue += item.quantity * item.price;
      }
    }

    res.json({
      sellers: Object.values(sellerMap),
      clients: Object.values(clientMap),
      categories: Object.values(categoryMap)
    });

  } catch (error) {
    console.error('❌ Error en reporte admin:', error);
    res.status(500).json({ message: 'Error al generar reporte', error: error.message });
  }
});

export default router;
