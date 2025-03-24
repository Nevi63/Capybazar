import express from 'express';
import Product from '../models/Product.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// 📌 Crear un nuevo producto → POST /products/create
router.post('/create', authMiddleware, async (req, res) => {
    try {
      const userId = req.user.userId; // ✅ viene del token
      const { name, price, stock, categoryId, description, image } = req.body;
  
      if (!name || !price || !stock || !categoryId) {
        return res.status(400).json({ message: 'Faltan campos obligatorios.' });
      }
  
      const newProduct = new Product({
        userId,
        name,
        price,
        stock,
        categoryId,
        description,
        image
      });
  
      await newProduct.save();
  
      res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
  
    } catch (error) {
      console.error("❌ Error al crear producto:", error);
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  });

  // 📌 Obtener los productos del usuario autenticado → GET /products
router.get('/', authMiddleware, async (req, res) => {
    try {
      const userId = req.user.userId; // obtenido del token
  
      const products = await Product.find({ userId })
        .populate('categoryId', 'name') // opcional: trae el nombre de la categoría
        .sort({ createdAt: -1 });
  
      res.json(products);
    } catch (error) {
      console.error("❌ Error al obtener productos:", error);
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  });

  // 📌 Obtener todos los productos (solo para admins)
router.get('/admin', authMiddleware, async (req, res) => {
    try {
      const products = await Product.find()
        .populate('categoryId', 'name') // solo queremos el nombre de la categoría
        .populate('userId', 'firstName lastName') // solo nombre del vendedor
        .sort({ createdAt: -1 });
  
      res.json(products);
    } catch (error) {
      console.error("❌ Error al obtener productos (admin):", error);
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  });
  
  

export default router;
