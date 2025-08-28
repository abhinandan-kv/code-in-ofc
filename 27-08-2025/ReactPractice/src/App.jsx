import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import TaskUsingState from "./Component/TaskUsingState";
import TaskUsingReducer from "./Component/TaskUsingReducer";

function App() {
  return (
    <>
      {/* <TaskUsingState /> */}
      <TaskUsingReducer />
    </>
  );
}

export default App;
