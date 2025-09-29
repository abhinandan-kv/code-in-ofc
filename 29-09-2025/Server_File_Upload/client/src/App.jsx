import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FileDropdown from "./Component/FileDropdown";
import Hero from "./Component/Pages/Hero";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Hero /> */}

      <FileDropdown />
    </>
  );
}

export default App;
