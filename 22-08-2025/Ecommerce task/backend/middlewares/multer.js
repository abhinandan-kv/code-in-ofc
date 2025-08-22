import multer from "multer";
import fs from "fs";
import path from "path";

export default function ImageUpload(req, res, next) {
  const { id } = req.user; 
  const uploadPath = `../../uploads/vendor${id}/products`;

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + "-" + file.originalname;
      cb(null, uniqueName);
    },
  });

  const upload = multer({ storage }).array("files", 10);

  upload(req, res, (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json({ message: "Image upload failed", error: err });
    }
    next();
  });
}
