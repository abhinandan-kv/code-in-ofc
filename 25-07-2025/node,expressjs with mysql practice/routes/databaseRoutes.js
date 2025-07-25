import {showAllTable, addNewRow, addNewRowUser, patchRowField, dynamicPatchRowField, deleteRowById, dropTable, createNewTable,uploadFile,createTableWithCustomSchema} from "../controllers/databaseControllers.js";

import express from "express";

const router = express.Router();

router.get("/", showAllTable)

router.post("/postTable/:tablename", createNewTable)

router.get("/getNewR", addNewRow)

router.post("/postNewR", addNewRowUser)

router.patch("/patch/:id/:key/:value", patchRowField)

router.patch("/patch", dynamicPatchRowField)

router.delete("/delete/:id", deleteRowById)

router.delete("/delete/drop/:tablename", dropTable)

router.post("/postTableCustomSchema/:tablename",createTableWithCustomSchema)

router.post("/upload", uploadFile)


export default router;
