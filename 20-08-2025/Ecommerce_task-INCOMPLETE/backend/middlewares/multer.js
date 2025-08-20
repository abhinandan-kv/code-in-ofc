import multer from "multer";
import fs from "fs";
import path from "path";

export default function ImageUpload(req, res, next) {
  const { id } = req.user;

  const uploadPath = `uploads/vendor${id}/products`;

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, res, cb) => {
      const uniqueName = Date.now() + path.extname(file.originalname);
      cb(null, uniqueName);
    },
  });

  const upload = multer({ storage });
  upload.array("productImages", 10);

  next();
}
