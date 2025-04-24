import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js'; // Asegúrate de tener este modelo
import authMiddleware from '../middlewares/auth.js'; 

const router = express.Router();

// 📌 Hacer una compra
router.post('/', authMiddleware, async (req, res) => {
    console.log('entro a compra')
    try {
      const { items, total, paymentMethod } = req.body;
  
      if (!items?.length || !total || !paymentMethod) {
        return res.status(400).json({ message: 'Datos incompletos' });
      }
  
      const order = new Order({
        userId: req.user.userId,
        items,
        total,
        paymentMethod,
        createdAt: new Date()
      });
  
      await order.save();
  
      // 🧹 Vaciar carrito del usuario después de la compra
      await Cart.findOneAndUpdate(
        { userId: req.user.userId },
        { products: [], total: 0 }
      );
  
      res.status(201).json({ message: 'Orden creada y carrito vaciado', order });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la orden', error: error.message });
    }
  });

export default router;