// logRequestMiddleware.js
import writeLog from '../utils/writeLog.js';

const logRequestMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.originalUrl;
  const user = req.user ? `Usuario: ${req.user.userId} (${req.user.email})` : 'Usuario no autenticado';

  writeLog(`📥 Intento de acceso - [${method}] ${path} | ${user} | Hora: ${timestamp}`);

  const originalSend = res.send;
  res.send = function (body) {
    writeLog(`📤 Respuesta enviada - [${method}] ${path} | Status: ${res.statusCode}`);
    originalSend.call(this, body);
  };

  next();
};

export default logRequestMiddleware;
