import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Post from "./Components/Posts_Display/Post";
import DeletePost from './Components/Post_CRUD_Operations/DeletePost'
import CreatePost from "./Components/Post_CRUD_Operations/CreatePost";
import UpdatePost from "./Components/Post_CRUD_Operations/UpdatePost";
import Home from "./Components/Layout/Home";
import Page404 from "./Components/Page404/Page404";
import Sidebar from "./Components/Layout/Sidebar";
import SidebarDisplay from "./Components/Layout/SidebarDisplay";
import LoginPage from "./Components/Login_SignUp/LoginPage";
import SignUp from "./Components/Login_SignUp/SignUp";
import Layout from "./Components/Layout/Layout";
import useAuth from "./Components/utils/customHook/UseAuth";

function App() {
const ProtectedRoute=()=>{
  let auth = useAuth()

  return (
    auth ? <Outlet/> : <Navigate to='/login' />
  )
}

  return (
    <BrowserRouter>
      <Routes>
      {/* <Route path="/" element={<Layout><Home/></Layout>}></Route> */}
        <Route path="/post" element={<Layout><Post /></Layout>} />
        <Route path="/delete" element={<Layout><DeletePost /></Layout>} />
        <Route path="/create" element={<Layout><CreatePost /></Layout>} />
        <Route path="/update" element={<Layout><UpdatePost /></Layout>} />
        {/* <Route path="/sidebar" element={<Sidebar/>}></Route> */}
        {/* <Route path="/sidebardisplay" element={<SidebarDisplay/>}></Route> */}
        <Route path="/login" element={<Layout><LoginPage/></Layout>}></Route>
        <Route path="/signup" element={<Layout><SignUp/></Layout>}></Route>

        <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<Layout><Home/></Layout>} />
        </Route>
        <Route path="*" element={<Layout><Page404/></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
