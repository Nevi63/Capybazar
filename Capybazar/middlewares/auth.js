import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No hay token proporcionado.' });
    }

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = verified; // Agregamos los datos del usuario a `req.user`
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token inválido.' });
    }
};

export default authMiddleware;
