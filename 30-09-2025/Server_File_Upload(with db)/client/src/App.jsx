import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FileDropdown from "./Component/FileDropdown";
import Hero from "./Component/Pages/Hero";
import SocketFileDropdown from "./Component/SocketDropdown/SocketFileDropdown";
import {Toaster} from 'sonner'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Toaster richColors/>
      {/* <Hero /> */}

      {/* <FileDropdown /> */}
      <SocketFileDropdown />
    </>
  );
}

export default App;
