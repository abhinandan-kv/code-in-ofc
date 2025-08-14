import React from "react";
import IpAddress from "./IpAddress";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-dark container-fluid py-3 fs-4 text-white ">
      <div className="container d-flex align-items-center justify-content-center">
        <div>Post Handlers</div>
        <div className="ms-auto d-flex gap-4">
          <div><Link to='/' className="text-decoration-none text-white">Home</Link></div>
          {/* <div><Link to='/home' className="text-decoration-none text-white">Home</Link></div> */}
          <div>
            <button type="button" className="btn btn-dark" title="Your IP">
              <IpAddress />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
