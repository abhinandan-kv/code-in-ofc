import React from "react";
import IpAddress from "./IpAddress";

const Footer = () => {
  return (
    <>
      <footer className="bg-primary ms-auto container-fluid py-3 h-25 d-flex align-bottom">
        <div className="container d-flex align-items-center justify-content-center align-content-center">
          <div>Brand_name</div>
          <div className="ms-auto d-flex gap-4 ">
            <div>Item1 </div>
            <div>Item2 </div>
            <div><IpAddress/> </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
