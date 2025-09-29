import React, { useState } from "react";
import FileDropdown from "../FileDropdown";
import axiosInstance from "../../Utils/axios";

const Hero = () => {
  const [btn, setBtn] = useState(false);
  const [path, setPath] = useState(null);

  async function getData(e) {
    try {
      const result = await axiosInstance.get("/file/get", { withCredentials: true });
      console.log(result);

    } catch (error) {
      console.error(error);
    }
  }

  function handleClick(e) {
    e.preventDefault();
    setBtn(!btn);
    getData();
    // console.log();
  }

  return (
    <>
      <FileDropdown />
      <button onClick={handleClick}>Show Data</button>
    </>
  );
};

export default Hero;
