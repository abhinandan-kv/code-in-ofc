import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Post from "./Components/Post";
import DeletePost from "./Components/DeletePost";
import CreatePost from "./Components/CreatePost";
import UpdatePost from "./Components/UpdatePost";
import Home from "./Components/Home";
import Page404 from "./Components/Page404";
import Sidebar from "./Components/Sidebar";
import SidebarDisplay from "./Components/SidebarDisplay";
import LoginPage from "./Components/LoginPage";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout><Home/></Layout>}></Route>
        <Route path="/post" element={<Layout><Post /></Layout>} />
        <Route path="/delete" element={<Layout><DeletePost /></Layout>} />
        <Route path="/create" element={<Layout><CreatePost /></Layout>} />
        <Route path="/update" element={<Layout><UpdatePost /></Layout>} />
        {/* <Route path="/sidebar" element={<Sidebar/>}></Route> */}
        {/* <Route path="/sidebardisplay" element={<SidebarDisplay/>}></Route> */}
        <Route path="/login" element={<Layout><LoginPage/></Layout>}></Route>
        <Route path="/signup" element={<Layout><SignUp/></Layout>}></Route>

        <Route path="*" element={<Layout><Page404/></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
