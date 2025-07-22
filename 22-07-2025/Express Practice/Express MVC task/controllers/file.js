import express from "express";
import multer from "multer";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.array("files", 5),  (req, res) => {
  try {
    console.log(req.files)
     res.send("file uploaded successfully");
  } catch (err) {
    console.error(err);
  }
});

router.delete('/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = `uploads/${filename}`;
    
    fs.unlink(filePath, (err) => {
        if (err) {
        console.error(err);
        return res.status(500).send("Error deleting file");
        }
        res.send("File deleted successfully");
    });
});


export default router;
