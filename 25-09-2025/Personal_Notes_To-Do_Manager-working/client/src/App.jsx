import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Todo from "./Component/Todo";
import AllRoutes from "./Routes/AllRoutes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster />
      <AllRoutes />
    </>
  );
}

export default App;
