import React, { useReducer, useState } from "react";
import CounterDisplay_State from "./CounterDisplay_State";
import CounterDisplay_Red from "./CounterDisplay_Red";

const Counter = () => {
  const [count, setCount] = useState(0);

  function handleIncrementState() {
    setCount(count + 1);
  }

  function handleDecrementState() {
    setCount(count - 1);
  }

  const [counter, dispatch] = useReducer(reducerFn, initialCounter);

  function handleIncrementRed() {
    dispatch({
      type: "increment",
    });
  }

  function handleDecrementRed() {
    dispatch({
      type: "decrement",
    });
  }

  return (
    <>
      <div>
        <CounterDisplay_State onAdd={handleIncrementState} onDec={handleDecrementState} />
        <p>{count}</p>
      </div>
      <hr />
      <div>
        <CounterDisplay_Red onAdd={handleIncrementRed} onDec={handleDecrementRed} />
        <p>{counter}</p>
      </div>
    </>
  );
};

export default Counter;

let initialCounter = 0;

function reducerFn(counter, action) {
  // console.log(action.type);

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
