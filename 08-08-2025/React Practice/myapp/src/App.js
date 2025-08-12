import logo from "./logo.svg";
import PropsPratice from "./components/PropsPractice.js";
import "./App.css";
import { useState } from "react";

function App() {
  const [flag, setFlag] = useState(false);

  function handleClick() {
    setFlag(true)
  }
  return (
    <div className="App">
      {/* <button onClick={handleClick}>Click here</button> */}
      {/* {flag ? <PropsPratice /> : ""} */}
      <PropsPratice />
    </div>
  );
}

export default App;
