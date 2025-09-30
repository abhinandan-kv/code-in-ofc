import React from "react";

const ProgressBar = ({ percentage }) => {
  // console.log(percentage)
  return (
    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-2">
      <div
        className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
        style={{ width: percentage ? `${percentage}%` : "0%" }}
      >
        {null ?? percentage}
      </div>
    </div>
  );
};

export default ProgressBar;
