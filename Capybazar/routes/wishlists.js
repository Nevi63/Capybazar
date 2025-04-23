import express from 'express';
import Product from '../models/Product.js';
import User from '../models/User.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// 📌 Agregar producto a wishlist → POST /wishlist/:productId
router.post('/:productId', authMiddleware, async (req, res) => {
    try {
      const userId = req.user.userId;
      const { productId } = req.params;
  
      const user = await User.findById(userId);
  
      if (user.wishlist.includes(productId)) {
        return res.status(400).json({ message: 'El producto ya está en la wishlist' });
      }
  
      user.wishlist.push(productId);
      await user.save();
  
      res.json({ message: 'Producto agregado a wishlist', wishlist: user.wishlist });
    } catch (error) {
      console.error("❌ Error al agregar a wishlist:", error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
});
  
// 📌 Quitar producto de wishlist → DELETE /wishlist/:productId
router.delete('/:productId', authMiddleware, async (req, res) => {
    try {
      const userId = req.user.userId;
      const { productId } = req.params;
  
      const user = await User.findById(userId);
      user.wishlist = user.wishlist.filter(p => p.toString() !== productId);
      await user.save();
  
      res.json({ message: 'Producto eliminado de wishlist', wishlist: user.wishlist });
    } catch (error) {
      console.error("❌ Error al quitar de wishlist:", error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
});

// 📌 Obtener wishlist del usuario → GET /wishlist
router.get('/', authMiddleware, async (req, res) => {
    try {
      const userId = req.user.userId;
  
      const user = await User.findById(userId).populate({
        path: 'wishlist',
        match: { deletedAt: { $exists: false } },
        populate:[ { path: 'categoryId', select: 'name' }, // opcional
        { path: 'userId', select: 'firstName lastName' }]
      });
  
      res.json({ wishlist: user.wishlist });
    } catch (error) {
      console.error("❌ Error al obtener wishlist:", error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
});

// 📌 Obtener solo IDs de productos en wishlist → GET /wishlist
router.get('/ids/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).populate({
      path: 'wishlist',
      match: { deletedAt: { $exists: false } },
      select: '_id' // solo trae el ID
    });

    const wishlistIds = user.wishlist.map(product => product._id);
    res.json({ wishlist: wishlistIds });
  } catch (error) {
    console.error("❌ Error al obtener wishlist:", error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

  export default router;