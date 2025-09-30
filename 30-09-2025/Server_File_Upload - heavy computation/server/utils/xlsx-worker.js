import { isMainThread, parentPort, workerData } from "worker_threads";
import * as XLSX from "xlsx/xlsx.mjs";
import fs from "fs";

XLSX.set_fs(fs);

export default async function xlsx_comparision(existinFilePath, newFilePath) {
  const oldWorkbook = await XLSX.readFile(existinFilePath);
  console.log(oldWorkbook);

  // const oldDenseWB = await XLSX.read(existinFilePath, { dense: true });                                  // <-- optimization , but still reading to get desired data back
  // console.log(denseWB);

  const newWorkbook = await XLSX.readFile(newFilePath);
  console.log(newWorkbook);

  // const newDenseWB = await XLSX.read(newFilePath);                                                                       // <-- optimization , but still reading to get desired data back
  // console.log(newDenseWB);

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

  XLSX.writeFile(mergedWorkbook, existinFilePath);
}

if (!isMainThread) {
  const result = xlsx_comparision(workerData);

  parentPort.postMessage(result);
}
