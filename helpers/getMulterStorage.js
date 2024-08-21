import multer from "multer";
import path from "path";
import fs from 'fs';

export default function getMulterStorage() {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.resolve('./uploads');

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const currentTime = new Date().toISOString().replace(/[-:.]/g, ''); // Удаляем лишние символы
      const uniqueSuffix = `${currentTime}${path.extname(file.originalname)}`;
      cb(null, uniqueSuffix);
    }
  });
}
