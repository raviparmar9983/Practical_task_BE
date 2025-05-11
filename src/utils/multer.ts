import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: './assets',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileExt = extname(file.originalname);
      const fileName = `${file.fieldname}-${uniqueSuffix}${fileExt}`;
      callback(null, fileName);
    },
  }),
};
