import multer from "multer";
import path from "path";
import fs from 'fs';

// Функция для создания конфигурации хранилища для multer
export default function getMulterStorage() {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const projectName = req.body.projectName;
      const uploadPath = path.join('./templates', projectName, 'img');

      fs.mkdirSync(uploadPath, { recursive: true });

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
    }
  });
}