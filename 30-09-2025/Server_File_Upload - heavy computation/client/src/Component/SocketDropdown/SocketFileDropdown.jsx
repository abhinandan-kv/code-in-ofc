import React, { useState, useEffect, useRef, useCallback } from "react";
import io from "socket.io-client";
import ProgressBar from "../ProgressBar";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

// const socket = io("http://localhost:3000");

const SocketFileDropdown = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  //react-dropzone starts
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    // console.log(acceptedFiles);
    setSelectedFile(acceptedFiles[0]);
  }, []);
  //   console.log(selectedFile);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  // react-dropzone ends

  const allowedExtension = ["xlsx", "csv"];

  const handleFileChange = (event) => {
    event.preventDefault();
    console.log(event);
    const fileExtension = event.target.files[0].name.split(".")[1];
    console.log(fileExtension);
    if (allowedExtension.includes(fileExtension)) {
      console.log("includes");
      toast.info("correct file uploaded!");

      setSelectedFile(event.target.files[0]);
      setUploadProgress(0);
    } else {
      toast.error("incorrect file extension");
    }
  };

  const uploadFile = () => {
    if (!selectedFile) return;

    const chunkSize = 512 * 100; //50kb
    let offset = 0;

    // const slice = selectedFile.slice(offset, offset + chunkSize);
    // console.log(slice);

    //   for some reason getting offset = NaN , at initialization itself

    const sendChunk = () => {
      const slice = selectedFile.slice(offset, offset + chunkSize);
      socket.emit(
        "upload_chunk",
        {
          fileName: selectedFile.name,
          fileSize: selectedFile.size,
          chunk: slice,
          offset: offset,
          totalChunks: Math.ceil(selectedFile.size / chunkSize),
        },
        (acknowledgment) => {
          console.log(acknowledgment);
          if (acknowledgment.success) {
            offset += slice.byteLength;
            const progress = Math.round((offset / selectedFile.size) * 100);

            console.log(progress);
            setUploadProgress(progress);

            if (offset < selectedFile.size) {
              sendChunk();
            } else {
              socket.emit("upload_complete", { fileName: selectedFile.name });
              alert("Upload Completed");
              setSelectedFile(null);
              console.log("File upload complete!");
            }
          } else {
            console.error("Error uploading chunk:", acknowledgment.error);
          }
        }
      );
    };
    // sendChunk();

    const replaceData = () => {
      const isConfirm = confirm("Data has to be replaced!");
      if (isConfirm) {
        sendChunk();
      } else {
        setSelectedFile(null);
      }
    };

    socket.emit("check_file_exists", selectedFile.name, (ackg) => {
      console.log("File extension ackged!", ackg.exists);

      if (!ackg.exists) {
        sendChunk();
      } else {
        replaceData(); //append advanced level will be implemented later just like normal html upload ref:fileController.js
      }
    });
    console.log(selectedFile);
  };

  useEffect(() => {
    socket.on("upload_progress", (data) => {
      console.log(data);
      setUploadProgress(data.progress);
    });

    return () => {
      socket.off("upload_progress");
    };
  }, []);

  return (
    // <div className="p-4">
    //   <input type="file" onChange={handleFileChange} className="bg-gray-600 me-3" />
    //   <button onClick={uploadFile} disabled={!selectedFile} className="bg-black p-1 px-7 text-white">
    //     Upload
    //   </button>
    //   {selectedFile && <p>To Upload: {selectedFile.name}</p>}
    //   {selectedFile && <p>Upload Progress: {0 ?? uploadProgress}%</p>}
    //   {/* {uploadProgress > 0 && <p>Progress: {uploadProgress}%</p>} */}
    // </div>
    <>
      <div className="h-screen  flex flex-col items-center justify-center bg-zinc-900 p-4 ">
        {/* have to implement the file name and small icon to show on place of drag and drop after uploading */}
        <div {...getRootProps()} className="flex items-center flex-col justify-center w-full bg-gray-600 rounded-xl" encType="multipart/form-data">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {selectedFile ? (
                <>
                  <svg
                    className="w-8 h-8 mb-4 text-gray-600 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      className="stroke-cyan-300"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="text-sm text-gray-500 underline dark:text-gray-400">{selectedFile.name}</p>
                </>
              ) : (
                <>
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  {isDragActive ? (
                    <p className="dark:text-white">Drop the files here ...</p>
                  ) : (
                    <>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">XLSX, CSV (MAX: 10MB)</p>
                    </>
                  )}{" "}
                </>
              )}
              {/* size limitation is not implemented yet */}
            </div>
            <input id="dropzone-file" type="file" className="hidden" name="file" onChange={handleFileChange} {...getInputProps()} />
          </label>
          <button
            type="submit"
            onClick={(e) => {
              e.stopPropagation();
              uploadFile();
            }}
            disabled={!selectedFile}
            className="max-w-sm mt-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            Upload
          </button>
        </div>
        {selectedFile && <ProgressBar percentage={uploadProgress} />}
        {/* <div>
          {selectedFile && <p className="dark:text-white">To Upload: {selectedFile.name}</p>}
          {selectedFile && <p className="dark:text-white">Upload Progress: {0 ?? uploadProgress}%</p>}
        </div> */}
      </div>
    </>
  );
};

export default SocketFileDropdown;
