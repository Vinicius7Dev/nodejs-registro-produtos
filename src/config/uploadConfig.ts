import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

// Pasta onde armazena as imagens dos produtos
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

// Configuração para o upload de arquivos
export default {
  tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;
      
      return callback(null, fileName);
    },
  }),
};
