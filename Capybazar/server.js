import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';


const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // 🟢 Aumenta el límite a 10 megas
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('🔥 Conectado a MongoDB'))
    .catch(err => console.log('Error al conectar a MongoDB:', err));


import './models/User.js';
import './models/Category.js';
import './models/Product.js';
import './models/Order.js';
import './models/Cart.js';
import './models/Review.js';

import userRoutes from './routes/users.js';
app.use('/users', userRoutes);
import categoryRoutes from './routes/categories.js';
app.use('/categories', categoryRoutes);
import productRoutes from './routes/products.js';
app.use('/products', productRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
