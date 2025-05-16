import express from 'express';
import Product from '../models/Product.js';
import authMiddleware from '../middlewares/auth.js';
import Cart from '../models/Cart.js'; // Asegúrate de tener este import
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
  
      const products = await Product.find({ userId }).find({ deletedAt: null })
        .populate('categoryId', 'name') // opcional: trae el nombre de la categoría
        .sort({ createdAt: -1 });
  
      res.json(products);
    } catch (error) {
      console.error("❌ Error al obtener productos:", error);
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  });


  // 📌 Obtener todos los productos para el dashboard (no requiere token)
router.get('/public', async (req, res) => {
  try {
    const products = await Product.find({ deletedAt: null })
      .populate('categoryId', 'name')
      .populate('userId', 'firstName lastName')
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
});



  // 📌 Obtener todos los productos (solo para admins)
router.get('/admin', authMiddleware, async (req, res) => {
    try {
      const products = await Product.find({ deletedAt: null })
        .populate('categoryId', 'name') // solo queremos el nombre de la categoría
        .populate('userId', 'firstName lastName') // solo nombre del vendedor
        .sort({ createdAt: -1 });
  
      res.json(products);
    } catch (error) {
      console.error("❌ Error al obtener productos (admin):", error);
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  });

// 📌 Obtener búsqueda de productos → GET /products/search?query=&minPrice=&maxPrice=&category=&sort=
router.get('/search', authMiddleware, async (req, res) => {
  const { query = '', minPrice = 0, maxPrice = 10000, category, sort } = req.query;

  try {
    const filter = {
      name: { $regex: query, $options: 'i' },
      price: { $gte: Number(minPrice) },
      deletedAt: { $exists: false }
    };

    // 🛠️ Restaurar lógica +1000
    if (maxPrice !== '+1000') {
      filter.price.$lte = Number(maxPrice);
    }

    if (category) {
      filter.categoryId = category;
    }

    let sortOptions = {};
    switch (sort) {
      case '': sortOptions = {}; break;
      case 'az': sortOptions = { name: 1 }; break;
      case 'za': sortOptions = { name: -1 }; break;
      case 'dateAsc': sortOptions = { createdAt: 1 }; break;
      case 'dateDesc': sortOptions = { createdAt: -1 }; break;
      case 'reviews': sortOptions = { rating: -1 }; break;
    }

    const results = await Product.find(filter)
      .populate('categoryId')
      .populate('userId')
      .sort(sortOptions)
      .collation({ locale: 'en', strength: 1 });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar productos', error: error.message });
  }
});




// 📌 Obtener información de un producto por ID → GET /products/:productId
router.get('/:productId', async (req, res) => {
  try {
      const { productId } = req.params;

      const product = await Product.findById(productId)
          .populate('categoryId', 'name')  // Agrega nombre de la categoría
          .populate('userId', 'firstName lastName');  // Agrega info del creador

      if (!product) {
          return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.json(product);

  } catch (error) {
      console.error("❌ Error al obtener el producto:", error);
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});
  
  // 📌 Editar un producto solo si pertenece al usuario → PUT /products/:productId
router.put('/:productId', authMiddleware, async (req, res) => {
  try {
      const { productId } = req.params;
      const userId = req.user.userId;  // ID del usuario autenticado
      const { name, price, stock, description, image, categoryId } = req.body;

      // Buscar el producto y verificar si pertenece al usuario autenticado
      const product = await Product.findById(productId);

      if (!product) {
          return res.status(404).json({ message: 'Producto no encontrado' });
      }

      if (product.userId.toString() !== userId) {
          return res.status(403).json({ message: 'No tienes permiso para editar este producto' });
      }

      // Actualizar solo si pertenece al usuario
      const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          { name, price, stock, description, image, categoryId },
          { new: true }
      );

      res.json({ message: 'Producto actualizado', product: updatedProduct });

  } catch (error) {
      console.error("❌ Error al actualizar producto:", error);
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

  // 📌 Editar inventario
  router.put('/', authMiddleware, async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.userId;  // ID del usuario autenticado
        const { name, price, stock, description, image, categoryId } = req.body;
  
        // Buscar el producto y verificar si pertenece al usuario autenticado
        const product = await Product.findById(productId);
  
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
  
        if (product.userId.toString() !== userId) {
            return res.status(403).json({ message: 'No tienes permiso para editar este producto' });
        }
  
        // Actualizar solo si pertenece al usuario
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name, price, stock, description, image, categoryId },
            { new: true }
        );
  
        res.json({ message: 'Producto actualizado', product: updatedProduct });
  
    } catch (error) {
        console.error("❌ Error al actualizar producto:", error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  });

// 📌 Eliminar un producto (baja lógica) → DELETE /products/:productId
router.delete('/:productId', authMiddleware, async (req, res) => {
  try {
      const { productId } = req.params;
      const userId = req.user.userId;  // ID del usuario autenticado

      // Buscar el producto
      const product = await Product.findById(productId);

      if (!product) {
          return res.status(404).json({ message: 'Producto no encontrado' });
      }

      // Verificar que el producto pertenece al usuario autenticado
      if (product.userId.toString() !== userId) {
          return res.status(403).json({ message: 'No tienes permiso para eliminar este producto' });
      }

      // Baja lógica: asignar la fecha actual a `deletedAt`
      product.deletedAt = new Date();
      await product.save();

      // 🔄 Eliminar el producto de todos los carritos
    await removeProductFromCarts(productId);

      res.json({ message: 'Producto eliminado (baja lógica)', product });

  } catch (error) {
      console.error("❌ Error al eliminar producto:", error);
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});


// 📌 Eliminar un producto (solo para admins) → DELETE /products/:productId
router.delete('/admin/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.userId; // ID del usuario autenticado

    // Verificar si el usuario es un administrador
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden eliminar productos.' });
    }

    // Buscar el producto
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Baja lógica: asignar la fecha actual a `deletedAt`
    product.deletedAt = new Date();
    await product.save();
    // 🔄 Eliminar el producto de todos los carritos
    await removeProductFromCarts(productId);


    res.json({ message: 'Producto eliminado (baja lógica)', product });

  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});


// 📌 Función auxiliar para remover producto de carritos y recalcular total
const removeProductFromCarts = async (productId) => {
  const affectedCarts = await Cart.find({ 'products.productId': productId });
  for (const cart of affectedCarts) {
    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    cart.total = await calculateCartTotal(cart.products);
    await cart.save();
  }
};

const calculateCartTotal = async (products) => {
  let total = 0;
  for (const item of products) {
    const prod = await Product.findById(item.productId);
    if (prod && !prod.deletedAt) {
      total += prod.price * item.quantity;
    }
  }
  return total;
};

export default router;
