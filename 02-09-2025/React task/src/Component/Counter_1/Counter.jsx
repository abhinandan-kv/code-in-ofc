import React, { useReducer, useState } from "react";
import CounterDisplay from "./CounterDisplay";

const Counter = () => {
  const [count, setCount] = useState(0);

  const [counter, dispatch] = useReducer(reducerFn, initialCounter);

  function handleIncrement() {
    dispatch({
      type: "increment",
    });
  }

  function handleDecrement() {
    dispatch({
      type: "decrement",
    });
  }

  return (
    <>
      <div>
        <p>State counters</p>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>Increment</button>
          <button onClick={() => setCount((count) => count - 1)}>Decrement</button>
        </div>
        <CounterDisplay data={count} />
      </div>
      <hr />
      <div>
        <p>Reducer counters</p>
        <div className="card">
          <button onClick={handleIncrement}>Increment</button>
          <button onClick={handleDecrement}>Decrement</button>
        </div>
        <CounterDisplay data={counter} />
      </div>
    </>
  );
};

export default Counter;

let initialCounter = 0;

function reducerFn(counter, action) {
  console.log(action.type);

  switch (action.type) {
    case "increment": {
      counter = counter + 1;
      return counter;
    }
    case "decrement": {
      counter = counter - 1;
      return counter;
    }
    default: {
      throw new Error("Unknown action type" + action.type);
    }
  }
}
