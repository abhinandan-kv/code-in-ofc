import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./Component/Layout/Navbar";
import Footer from "./Component/Layout/Footer";
import Layout from "./Component/Layout/Layout";

function App() {

  return (
    <>
      {/* <Navbar />
      <Footer/> */}


        <Layout><div className="w-100 h-full">something is here</div></Layout>
    </>
  );
}

export default App;
