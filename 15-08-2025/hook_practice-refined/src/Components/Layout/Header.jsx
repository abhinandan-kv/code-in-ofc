import React from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import icon from "../../assets/logo.svg";

const Header = () => {
  return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 px-5 border-bottom bg-dark text-white">
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <img src={icon} className="me-2" width="40" height="32"></img>
        <span className="fs-4 text-white">Post Handlers</span>
      </a>
      <ul className="nav nav-pills">
        <li>
        {/* will handle this login button as it should not appear if user is already logged in */}
          <Link to="/login" className=" nav-link text-decoration-none text-white">
            Login                                 
          </Link>
        </li>
      </ul>
      <div className="dropdown ">
        <button
          className="btn btn-secondary dropdown-toggle bg-dark"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          All Operations
        </button>
        <ul className="dropdown-menu bg-dark p-3" aria-labelledby="dropdownMenuButton1">
          <li className="nav-item">
            <Link to="/create" className="nav-link text-decoration-none text-white">
              Create
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Update" className="nav-link text-decoration-none text-white">
              Update
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/delete" className=" nav-link text-decoration-none text-white">
              Delete
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/post" className="nav-link text-decoration-none text-white">
              All Posts
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
