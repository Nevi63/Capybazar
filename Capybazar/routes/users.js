import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import multer from 'multer';

const router = express.Router();
// Configuración de multer para guardar en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

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

// 📌 Obtener usuario por ID → GET /users/:userId
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select('-password');  // Excluir contraseña

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});


// 📌 Cambiar foto de perfil → PUT /users/:userId/photo
router.put('/photo/:userId', upload.single('profilePicture'), async (req, res) => {
    try {
        const { userId } = req.params;

        if (!req.file) {
            return res.status(400).json({ message: 'La imagen es obligatoria.' });
        }

        const mimeType = req.file.mimetype;  
        const extension = mimeType.split('/')[1];  

        // Convertir la imagen a base64
        const base64Image = `data:${mimeType};base64,${req.file.buffer.toString('base64')}`;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: base64Image }, 
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ 
            message: 'Foto de perfil actualizada', 
            user: updatedUser,
            fileType: extension 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});


// 📌 Actualizar datos del usuario → PUT /users/:userId
router.put('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { firstName, lastName, birthdate } = req.body;

        // Si hay fecha, ajustar zona horaria
        const birthdateObj = birthdate ? new Date(birthdate) : undefined;

        if (birthdateObj) {
            // Ajuste para que la fecha se guarde con la zona horaria correcta
            const localDate = new Date(birthdateObj.getTime() + birthdateObj.getTimezoneOffset() * 60000);
            
            
            if (localDate > new Date()) {
                return res.status(400).json({ message: 'La fecha de nacimiento no puede ser mayor a hoy.' });
            }

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { firstName, lastName, birthdate: localDate },
                { new: true }
            );

            res.json({ message: 'Datos actualizados correctamente', user: updatedUser });
        }

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

// 📌 Cambiar contraseña → PUT /users/password/:userId
router.put('/password/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { newPassword } = req.body;


        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});


export default router;
