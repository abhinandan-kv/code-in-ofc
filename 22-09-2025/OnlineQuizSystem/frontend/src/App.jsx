import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SignUp from "./Components/Pages/Auth/SignUp";
import { Toaster } from "sonner";
import LoginIn from "./Components/Pages/Auth/LoginIn";
import { Router, Routes } from "react-router-dom";
import AllRoutes from "./Routes/AllRoutes";

function App() {
  return (
    <>
      <Toaster />

      <AllRoutes />
    </>
  );
}

export default App;
