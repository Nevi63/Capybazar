import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js'; // Asegúrate de tener este modelo
import authMiddleware from '../middlewares/auth.js'; 

const router = express.Router();
// 📌 Hacer una compra
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, total, paymentMethod } = req.body;

    if (!items?.length || !total || !paymentMethod) {
      return res.status(400).json({ message: 'Datos incompletos' });
    }

    // 🔍 Verificar stock antes de continuar
    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      if (product.deletedAt) {
        return res.status(400).json({ message: `El producto "${product.name}" ya no está disponible.` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `No hay suficiente stock para el producto "${product.name}". Solo hay ${product.stock} disponibles.`,
          maxAvailable: product.stock,
          productId: product._id
        });
      }
    }

    // ✅ Crear orden si pasa la validación
    const order = new Order({
      userId: req.user.userId,
      items,
      total,
      paymentMethod,
      createdAt: new Date()
    });

    await order.save();

    // 🧮 Disminuir stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity }
      });
    }

    // 🧹 Vaciar carrito
    await Cart.findOneAndUpdate(
      { userId: req.user.userId },
      { products: [], total: 0 }
    );

    res.status(201).json({ message: 'Orden creada y carrito vaciado', order });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la orden', error: error.message });
  }
});


// 📌Obtener órdenes del usuario
router.get('/my-orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .populate('items.productId')
      .sort({ date: -1 }); // orden descendente por fecha

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener órdenes', error: error.message });
  }
});


// 📌 Reporte de ventas por vendedor
router.get('/seller-report', authMiddleware, async (req, res) => {
  try {
    const sellerId = req.user.userId;

    const orders = await Order.find({ 'items.productId': { $exists: true } }).populate('items.productId');

    const report = {};

    for (const order of orders) {
      for (const item of order.items) {
        const product = item.productId;

        if (!product || String(product.userId) !== sellerId) continue;

        if (!report[product._id]) {
          report[product._id] = {
            name: product.name,
            price: item.price,
            totalSold: 0,
            totalRevenue: 0,
            rating: product.rating || 0
          };
        }

        report[product._id].totalSold += item.quantity;
        report[product._id].totalRevenue += item.price * item.quantity;
      }
    }

    const result = Object.entries(report).map(([productId, data]) => ({
      productId,
      ...data
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al generar el reporte', error: error.message });
  }
});

export default router;