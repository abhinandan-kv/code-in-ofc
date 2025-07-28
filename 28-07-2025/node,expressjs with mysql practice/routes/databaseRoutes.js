import {showAllTable, addNewRow, addNewRowUser, patchRowField, dynamicPatchRowField, deleteRowById, dropTable, createNewTable,uploadFile,createTableWithCustomSchema, innerJoin, leftJoin, rightJoin, crossJoin, selfJoin, fullJoin, aggregateFn, customAggregateFn} from "../controllers/databaseControllers.js";

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

router.get("/innerjoin", innerJoin)

router.get("/leftjoin", leftJoin)

router.get("/rightjoin", rightJoin)

router.get("/crossjoin", crossJoin)

router.get("/selfjoin", selfJoin)

router.get("/fulljoin", fullJoin)

router.post("/ag/:fn/:col", aggregateFn)

router.post("/cag", customAggregateFn)

export default router;
