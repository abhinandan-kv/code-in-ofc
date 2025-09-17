import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByValue } from "./app/features/counterSlice";

// debounce function
const useDebouncedTimes = (inputValue, delay) => {
  const [debouncedTimes, setDebouncedTimes] = useState();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTimes(() => inputValue);
    }, delay);

    return () => clearTimeout(handler);
  }, [inputValue, delay]);

  return debouncedTimes;
};

function App() {
  const [times, setTimes] = useState(0);

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  // debounce calling
  const debouncedValue = useDebouncedTimes(times, 500);
  // debounce useEffect
  useEffect(() => {
    dispatch(incrementByValue(times));
    setTimes(() => 0);
  }, [debouncedValue]);

  function handleMutipleClicks(e) {
    setTimes(() => times + 1);
  }

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
      <h1>Vite + React</h1>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <p>{times}</p>
      <button onClick={handleMutipleClicks}>Increment By Clicks all at once</button>
    </>
  );
}

export default App;
