import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import multer from 'multer';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();
// Configuración de multer para guardar en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📌 Endpoint: Crear usuario (Registro) → POST /users/create
// importamos el logger
import writeLog from '../utils/writeLog.js'; // ajusta la ruta si tu carpeta cambia

// 📌 Endpoint: Crear usuario (Registro) → POST /users/create
router.post('/create', async (req, res) => {
    writeLog('🟡 Inicio del proceso: Crear usuario');

    try {
        const { firstName, lastName, email, password, userType, birthdate } = req.body;

        if (!birthdate) {
            writeLog('🔴 Error: Fecha de nacimiento no proporcionada');
            return res.status(400).json({ message: 'La fecha de nacimiento es obligatoria.' });
        }

        const birthdateObj = new Date(birthdate);
        const today = new Date();

        if (birthdateObj > today) {
            writeLog('🔴 Error: Fecha de nacimiento mayor a la fecha actual');
            return res.status(400).json({ message: 'La fecha de nacimiento no puede ser mayor a hoy.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            writeLog(`🔴 Error: Usuario ya existente con email ${email}`);
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            userType: userType || 'cliente',
            birthdate: birthdateObj
        });

        await newUser.save();

        writeLog(`🟢 Usuario creado correctamente: ${email}`);
        res.status(201).json({ message: 'Usuario registrado exitosamente' });

    } catch (error) {
        writeLog(`🔴 Error en el servidor al crear usuario: ${error.message}`);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    } finally {
        writeLog('⚪ Fin del proceso: Crear usuario');
    }
});


// 📌 Endpoint: Iniciar sesión → POST /users/{userId}
router.post('/:userId', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user || user.deletedAt) {
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
            { expiresIn: '1m' }
        );

        res.json({ message: 'Inicio de sesión exitoso', token, user });

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

// 📌 Obtener usuario por ID → GET /users/:userId
router.get('/:userId', authMiddleware, async (req, res) => {
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
router.put('/photo/:userId',authMiddleware, upload.single('profilePicture'), async (req, res) => {
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
router.put('/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, birthdate, phoneNumber, address } = req.body;

    const updateFields = { firstName, lastName };

    // Validar y ajustar fecha si se proporciona
    if (birthdate) {
      const birthdateObj = new Date(birthdate);
      const localDate = new Date(birthdateObj.getTime() + birthdateObj.getTimezoneOffset() * 60000);

      if (localDate > new Date()) {
        return res.status(400).json({ message: 'La fecha de nacimiento no puede ser mayor a hoy.' });
      }

      updateFields.birthdate = localDate;
    }

    if (phoneNumber !== undefined) updateFields.phoneNumber = phoneNumber;
    if (address !== undefined) updateFields.address = address;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Datos actualizados correctamente', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// 📌 Cambiar contraseña → PUT /users/password/:userId
router.put('/password/:userId',authMiddleware, async (req, res) => {
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

// 📌 Baja lógica del usuario → DELETE /users/:userId
router.delete('/:userId', authMiddleware, async (req, res) => {
    const { userId } = req.params;
    writeLog(`🟡 Inicio del proceso: Baja lógica del usuario con ID ${userId}`);

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { deletedAt: new Date() },
            { new: true }
        );

        if (!user) {
            writeLog(`🔴 Error: Usuario no encontrado con ID ${userId}`);
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        writeLog(`🟢 Usuario dado de baja correctamente: ${user.email || userId}`);
        res.json({ message: 'Usuario dado de baja correctamente', user });
    } catch (error) {
        writeLog(`🔴 Error en el servidor al dar de baja al usuario ${userId}: ${error.message}`);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    } finally {
        writeLog(`⚪ Fin del proceso: Baja lógica del usuario con ID ${userId}`);
    }
});
  

export default router;
