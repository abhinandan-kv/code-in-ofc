import multer, { diskStorage } from "multer";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __parentDirname = dirname(__dirname)

const storage = multer.diskStorage({
  destination: (req, files, cb) => {
    const uPath = "uploads/";
    fs.mkdirSync(uPath, { recursive: true });
    return cb(null, path.join(__parentDirname, uPath));
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    return cb(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;
