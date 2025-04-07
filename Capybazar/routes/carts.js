import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// 📌 Obtener carrito del usuario → GET /cart/user/:userId
router.get('/user/:userId', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
      .populate({ path: 'products.productId', populate: { path: 'userId' } }) // incluye vendedor
      .populate('userId');
    res.json(cart || { products: [], total: 0 });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el carrito', error: err.message });
  }
});

// 📌 Agregar producto al carrito → PUT /cart/:userId/add
router.put('/:userId/add', authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    let cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      cart = new Cart({ userId: req.params.userId, products: [], total: 0 });
    }

    const index = cart.products.findIndex(p => p.productId.equals(productId));
    if (index > -1) {
      // Solo sumar si se trata de agregar explícitamente, NO si viene del input (cantidad ya establecida)
      if (req.body.mode === 'add') {
        cart.products[index].quantity += quantity;
      } else {
        cart.products[index].quantity = quantity;
      }
    } else {
      cart.products.push({ productId, quantity });
    }

    cart.total = await calculateTotal(cart.products);
    await cart.save();
    const updatedCart = await Cart.findById(cart._id)
      .populate({ path: 'products.productId', populate: { path: 'userId' } });
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: 'Error al agregar al carrito', error: err.message });
  }
});

// 📌 Remover producto del carrito → PUT /cart/:userId/remove
router.put('/:userId/remove', authMiddleware, async (req, res) => {
  const { productId } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    cart.products = cart.products.filter(p => !p.productId.equals(productId));
    cart.total = await calculateTotal(cart.products);
    await cart.save();
    const updatedCart = await Cart.findById(cart._id)
      .populate({ path: 'products.productId', populate: { path: 'userId' } });
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar del carrito', error: err.message });
  }
});

// 📌 Vaciar carrito del usuario → DELETE /cart/:userId/clear
router.delete('/:userId/clear', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    cart.products = [];
    cart.total = 0;
    await cart.save();
    res.json({ message: 'Carrito vaciado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al vaciar el carrito', error: err.message });
  }
});

// 🔹 Función para calcular total
const calculateTotal = async (products) => {
  let total = 0;
  for (const item of products) {
    const prod = await Product.findById(item.productId);
    if (prod) total += prod.price * item.quantity;
  }
  return total;
};

export default router;
