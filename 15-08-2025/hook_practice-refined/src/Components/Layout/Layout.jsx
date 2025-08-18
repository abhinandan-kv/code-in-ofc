
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  
  const [hovered, setHovered] =  useState(false)

  function handleMouseEnter() {
    setHovered(true)
    console.log("hover true")
  }

  function handleMouseLeave() {
    setHovered(false)
    console.log("hover false")
  }

  return (
    <div id="wrapper" className="d-flex flex-column min-vh-100">
      <Header />
      {/* <div className={`custom_sidebar ${hovered ? 'sidebar-expanded' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {<Sidebar />}
      </div> */}
      <main className="flex-fill m-3">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
