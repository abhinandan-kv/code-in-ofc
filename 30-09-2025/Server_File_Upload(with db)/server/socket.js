import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { io } from "./socketApp.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

export const checkFileExists = (filename, callback) => {
  console.log(filename);
  const filePath = path.join(uploadDir, filename);

  if (fs.existsSync(filePath)) {
    callback({ exists: true });
  } else {
    callback({ exists: false });
  }
};

export const uploadChunk = (data, callback) => {
  const filePath = path.join(uploadDir, data.fileName);

  fs.appendFile(filePath, data.chunk, (err) => {
    if (err) {
      console.error("Error writing chunk:", err);
      callback({ success: false, error: err.message });
    } else {
      const progress = Math.round(((data.offset + data.chunk.byteLength) / data.fileSize) * 100);
      console.log(progress);
      socket.emit("upload_progress", { progress });
      callback({ success: true });
    }
  });
};

export const uploadComplete = (data) => {
  console.log(`File ${data.fileName} uploaded successfully!`);
};

export const disconnect = () => {
  console.log("User disconnected");
};

// io.on("connection", (socket) => {
//   console.log("A user connected", socket.id);

//   // socket.on("check_file_exists", (filename, callback) => {
//   //   console.log(filename);
//   //   const filePath = path.join(uploadDir, filename);

//   //   if (fs.existsSync(filePath)) {
//   //     callback({ exists: true });
//   //   } else {
//   //     callback({ exists: false });
//   //   }
//   // });

//   // socket.on("upload_chunk", (data, callback) => {
//   //   const filePath = path.join(uploadDir, data.fileName);

//   //   fs.appendFile(filePath, data.chunk, (err) => {
//   //     if (err) {
//   //       console.error("Error writing chunk:", err);
//   //       callback({ success: false, error: err.message });
//   //     } else {
//   //       const progress = Math.round(((data.offset + data.chunk.byteLength) / data.fileSize) * 100);
//   //       console.log(progress);
//   //       socket.emit("upload_progress", { progress });
//   //       callback({ success: true });
//   //     }
//   //   });
//   // });

//   // socket.on("upload_complete", (data) => {
//   //   console.log(`File ${data.fileName} uploaded successfully!`);
//   // });

//   // socket.on("disconnect", () => {
//   //   console.log("User disconnected");
//   // });
// });

