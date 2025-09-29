import { response, Router } from "express";
import verifyToken from "../Middleware/verifyToken.js";
import upload from "../Middleware/upload.js";
import FileTable from "../models/fileModel.js";
import AuthTable from "../models/AuthModel.js";
import * as XLSX from "xlsx/xlsx.mjs";
import path from "path";
import * as fs from "fs";

XLSX.set_fs(fs);

const fileRouter = Router();

fileRouter.post("/upload", upload.single("file"), async (req, res) => {
  console.log("req.file",req.file);

  try {
    // const { id, email, name } = req.user;       // uncomment this after auth setup
    const id = 1;

    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const exisitingFile = await FileTable.findOne({
      where: {
        fileName: req.file.filename,
        userId: id,
      },
    });
    // const check = await XLSX.readFile("/uploads/Free_Test_Data_1MB_XLS.xls");
    // console.log(check);
    if (exisitingFile) {
      //   const resolvedFilePath = path.resolve(exisitingFile.dataValues.filePath);
      //   console.log(resolvedFilePath);
      console.log(exisitingFile.dataValues.filePath);
      const oldWorkbook = await XLSX.readFile(exisitingFile.dataValues.filePath);
      console.log(oldWorkbook);
      const newWorkbook = await XLSX.readFile(req.file.path);
      console.log(newWorkbook);

      const oldSheet = oldWorkbook.Sheets[oldWorkbook.SheetNames[0]]; //assuming sheet 1 is only having data
      const newSheet = newWorkbook.Sheets[newWorkbook.SheetNames[0]];

      const oldData = XLSX.utils.sheet_to_json(oldSheet);
      const newData = XLSX.utils.sheet_to_json(newSheet);

      //for not appending the same data
      const oldMap = new Map(oldData.map((row) => [row.id, row]));

      newData.forEach((row) => {
        if (oldMap.has(row.id)) {
          oldMap.set(row.id, { ...oldMap.get(row.id), ...row });
        } else {
          oldMap.set(row.id, row);
        }
      });
      const mergedData = Array.from(oldMap.values());

      //   const mergedData = [...oldData, ...newData];

      const mergedSheet = XLSX.utils.json_to_sheet(mergedData);

      const mergedWorkbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(mergedWorkbook, mergedSheet, "Sheet 1");

      XLSX.writeFile(mergedWorkbook, exisitingFile.dataValues.filePath);

      res.status(200).json({ message: "Data append successfully", response: mergedWorkbook });
    } else {
      const newFile = await FileTable.create({
        fileName: req.file.filename,
        filePath: req.file.path,
        mimeType: req.file.mimetype,
        size: req.file.size,
        userId: id,
      });

      res.status(200).json({ message: "File uploaded successfully", file: newFile });
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Server error during file upload.");
  }
});




// import { response, Router } from "express";
// import verifyToken from "../Middleware/verifyToken.js";
// import upload from "../Middleware/upload.js";
// import FileTable from "../models/fileModel.js";
// import AuthTable from "../models/AuthModel.js";
// import { getFile, uploadFile } from "../controllers/fileController.js";

// const fileRouter = Router();

// fileRouter.post("/upload", upload.single("file"), uploadFile);
// fileRouter.get("/get", verifyToken, getFile);

// export default fileRouter;



export default fileRouter;
