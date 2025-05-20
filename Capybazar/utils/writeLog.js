// utils/writeLog.js
import fs from 'fs';
import path from 'path';

const logDir = path.join(process.cwd(), 'logs');
const logPath = path.join(logDir, 'backend.log');

// Asegura que exista la carpeta de logs
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

function writeLog(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFile(logPath, logMessage, (err) => {
    if (err) console.error('Error al escribir en el log:', err);
  });
}

export default writeLog;
