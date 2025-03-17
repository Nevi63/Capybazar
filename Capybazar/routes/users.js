import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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


// 📌 Endpoint: Iniciar sesión → POST /users/{userId}
router.post('/:userId', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar un token JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({ message: 'Inicio de sesión exitoso', token, user });

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

export default router;
