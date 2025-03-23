import express from 'express';
import Category from '../models/Category.js';
import authMiddleware from '../middlewares/auth.js'; 

const router = express.Router();

// 📌 Obtener todas las categorías → GET /categories
router.get('/', authMiddleware, async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

// 📌 Obtener una categoría por ID → GET /categories/{categoryId}
router.get('/:categoryId', authMiddleware, async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

// 📌 Crear una nueva categoría → POST /categories/create
router.post('/create', authMiddleware, async (req, res) => {
    try {
        console.log("Datos recibidos en el backend:", req.body); // 👀 Depuración
        console.log("Tipo de req.body:", typeof req.body); // 👀 Verifica si es un objeto
        
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'El request está vacío, asegúrate de enviar datos en formato JSON.' });
        }

        const { nombre } = req.body;

        if (!nombre || nombre.trim() === "") {
            return res.status(400).json({ message: 'El nombre de la categoría es obligatorio y no puede estar vacío.' });
        }

        const nombreSanitizado = nombre.trim().toLowerCase();

        const existingCategory = await Category.findOne({ nombre: nombreSanitizado });
        if (existingCategory) {
            return res.status(400).json({ message: 'La categoría ya existe.' });
        }

        const newCategory = new Category({ name: nombreSanitizado });
        console.log("Guardando categoría:", newCategory);

        await newCategory.save();

        return res.status(201).json({ message: 'Categoría creada exitosamente', category: newCategory });

    } catch (error) {
        console.error("🚨 Error en el servidor:", error);
        return res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});


// 📌 Actualizar una categoría → PUT /categories/{categoryId}
router.put('/:categoryId', authMiddleware, async (req, res) => {
    try {
        const { nombre } = req.body;
        const { categoryId } = req.params;
        
        if (!nombre) {
            return res.status(400).json({ message: 'El nombre de la categoría es obligatorio.' });
        }

        const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name: nombre }, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        res.json({ message: 'Categoría actualizada exitosamente', category: updatedCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

// 📌 Eliminar una categoría → DELETE /categories/{categoryId}
router.delete('/:categoryId', authMiddleware, async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.categoryId);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        res.json({ message: 'Categoría eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

export default router;
