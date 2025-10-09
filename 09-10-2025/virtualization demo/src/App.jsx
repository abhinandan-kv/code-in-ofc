import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import VirtualizedListExample from "./Components/VirtualizedListExample";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <VirtualizedListExample />
    </>
  );
}

export default App;
