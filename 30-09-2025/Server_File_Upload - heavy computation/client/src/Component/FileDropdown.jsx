import React, { useState } from "react";
import axiosInstance from "../Utils/axios";
import ProgressBar from "./ProgressBar";

const FileDropdown = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [progress, setProgress] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit!!", e);
    console.log("e.target[0].size", e.target[0].size);
    const formData = new FormData();
    formData.append("file", selectedFiles[0]);
    axiosInstance.post("/file/upload", formData, {
      headers: {
        "Content-Type": "mutipart/form-data",
      },
      onUploadProgress: (data) => {
        setProgress(Math.round((100 * data.loaded) / data.total));
      },
    });
  };

  return (
    <>
      <div className="h-screen  flex flex-col items-center justify-center bg-zinc-900 p-4 ">
        {/* have to implement the file name and small icon to show on place of drag and drop after uploading */}
        <form
          className="flex items-center flex-col justify-center w-full bg-gray-600 rounded-xl"
          //   action="http://localhost:3000/file/upload"
          //   method="post"
          encType="multipart/form-data"
          onSubmit={submitHandler}
        >
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
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
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              {/* size limitation is not implemented yet */}
              <p className="text-xs text-gray-500 dark:text-gray-400">XLSX, CSV (MAX: 10MB)</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              //   accept=".xlsx, .csv"
              className="hidden"
              name="file"
              onChange={(e) => setSelectedFiles(e.target.files)}
              onDrop={(e) => setSelectedFiles(e.target.files)}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDragOver={(e) => e.preventDefault()}
            />
          </label>
          <button
            type="submit"
            className="max-w-sm mt-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            Submit
          </button>
        </form>
        <ProgressBar percentage={progress} />
      </div>
    </>
  );
};

export default FileDropdown;
