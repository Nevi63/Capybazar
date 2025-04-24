import express from 'express';
import Product from '../models/Product.js';
import Review from '../models/Review.js';
import Order from '../models/Order.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();
// ✅ Obtener todas las reviews de un producto
router.get('/:productId', async (req, res) => {
    const { productId } = req.params;
  
    try {
      const reviews = await Review.find({ productId, deletedAt: null })
        .populate('userId',[ 'firstName', 'lastName', 'profilePicture']) // opcional: para mostrar nombre del usuario
        .sort({ createdAt: -1 }); // más recientes primero
  
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener reviews', error: error.message });
    }
});
  
// ✅ Verificar si el usuario puede hacer una review del producto
router.get('/can-review/:productId', authMiddleware, async (req, res) => {
    const userId = req.user.userId;
    const { productId } = req.params;
  
    try {
      // Verifica si ya hizo review
      const existingReview = await Review.findOne({ userId, productId });
      if (existingReview) return res.json({ canReview: false });

      // Verifica si ha comprado el producto
      const hasPurchased = await Order.findOne({
        'userId': userId,
        'items.productId': productId
      });
  
      if (hasPurchased) {
        return res.json({ canReview: true });
      }
  
      res.json({ canReview: false });
    } catch (error) {
      res.status(500).json({ message: 'Error al verificar revisión', error: error.message });
    }
});

router.post('/', authMiddleware, async (req, res) => {
    const { productId, rating, review } = req.body;
    const userId = req.user.userId;
  
    if (!productId || !rating || !review) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }
  
    try {
      // Verificar que no haya ya una review activa
      const existingReview = await Review.findOne({ userId, productId, deletedAt: null });
      if (existingReview) {
        return res.status(400).json({ message: 'Ya has hecho una reseña de este producto' });
      }
  
      const newReview = new Review({
        userId,
        productId,
        rating,
        review
      });
  
      await newReview.save();

      // ⬇️ Calcular el nuevo promedio de rating
      const reviews = await Review.find({ productId, deletedAt: null });
      const avgRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

      // ⬇️ Actualizar el producto con el nuevo rating
      await Product.findByIdAndUpdate(productId, { rating: avgRating });

      res.status(201).json({ message: 'Review creada', review: newReview });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la review', error: error.message });
    }
  });
  router.delete('/:reviewId', authMiddleware, async (req, res) => {
    const { reviewId } = req.params;
    const userId = req.user.userId;
    console.log('HUH')
  
    try {
      const review = await Review.findOneAndUpdate(
        { _id: reviewId },
        { deletedAt: new Date() },
        { new: true }
      );
  
      if (!review) {
        return res.status(404).json({ message: 'Review no encontrada o ya eliminada' });
      }
  
      res.json({ message: 'Review eliminada' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la review', error: error.message });
    }
  });
  
export default router;  