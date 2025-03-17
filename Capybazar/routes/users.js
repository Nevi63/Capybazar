import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

// 📌 Endpoint: Crear usuario (Registro) → POST /users/create
router.post('/create', async (req, res) => {
    try {
        const { firstName, lastName, email, password, userType, birthdate } = req.body;

        if (!birthdate) {
            return res.status(400).json({ message: 'La fecha de nacimiento es obligatoria.' });
        }

        const birthdateObj = new Date(birthdate);
        const today = new Date();

        if (birthdateObj > today) {
            return res.status(400).json({ message: 'La fecha de nacimiento no puede ser mayor a hoy.' });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            userType: userType || 'cliente',
            birthdate: birthdateObj
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});


export default router;
