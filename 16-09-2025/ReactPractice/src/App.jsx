import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Counter from "./Component/Counter";
import { Route, Routes } from "react-router-dom";
import CounterDisplay from "./Component/CounterDisplay";
import Posts from "./Component/Posts";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <ViteWithCounter />
              {/* <CounterDisplay /> */}
            </div>
          }
        />
        <Route path="/display" element={<CounterDisplay />} />
        <Route path="/post" element={<Posts />} />
      </Routes>
    </>
  );
}

export default App;

function ViteWithCounter() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        <Counter />
      </div>
    </>
  );
}
