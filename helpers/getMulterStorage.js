import multer from "multer";
import path from "path";
import fs from 'fs';

// Функция для создания конфигурации хранилища для multer
export default function getMulterStorage() {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.resolve('./uploads'); // Исправлено

      // Создание директории, если она не существует
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
    }
  });
}
