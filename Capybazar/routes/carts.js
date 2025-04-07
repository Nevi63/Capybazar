import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// 📌 Agregar producto al carrito → PUT /cart/:userId/add
router.put('/:userId/add', authMiddleware, async (req, res) => {
    try {
      const { userId } = req.params;
      const { productId, quantity } = req.body;
  
      if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Producto o cantidad inválida.' });
      }
  
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: 'Producto no encontrado.' });
  
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        cart = new Cart({ userId, products: [], total: 0 });
      }
  
      const existingProduct = cart.products.find(p => p.productId.toString() === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
  
      // Recalcular total
      cart.total = 0;
      for (const item of cart.products) {
        const p = await Product.findById(item.productId);
        if (p) cart.total += p.price * item.quantity;
      }
  
      await cart.save();
      res.status(200).json({ message: 'Producto agregado al carrito', cart });
    } catch (error) {
      res.status(500).json({ message: 'Error al agregar al carrito', error: error.message });
    }
  });
  

export default router;
