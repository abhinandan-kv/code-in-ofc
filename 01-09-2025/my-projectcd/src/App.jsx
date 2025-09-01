import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useTheme } from "./Context/ThemeProvider";

function App() {
  const [count, setCount] = useState(0);
  const { val, setVal } = useTheme("light");

  return (
    <>
      <div className={val == "light" ? "text-fuchsia-500 text-2xl" : "dark:bg-black dark:text-4xl"}>
        <p>Hello world</p>
      </div>

      <button
        className={val == "light" ? " text-fuchsia-500 text-2xl border-2" : "dark:bg-black dark:text-4xl"}
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          setVal(val === "dark" ? "light" : "dark");
        }}
      >
        Switch Theme
      </button>
    </>
  );
}

export default App;
