import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Counter1 from "./Component/Counter_1/Counter";
import Counter2 from "./Component/Counter_2/Counter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Counter 1 folder is a simple parent to child demostration */}
      {/* <Counter/> */}


      {/* Counter 2 folder is the one as per task requirements */}
      <Counter2 />
    </>
  );
}

export default App;
