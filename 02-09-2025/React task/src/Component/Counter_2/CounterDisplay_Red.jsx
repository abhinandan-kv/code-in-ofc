import React from "react";

const CounterDisplay_Red = ({ onAdd, onDec }) => {
  return (
    <>
      <h1>Reducer counters</h1>
      <div className="card">
        <button onClick={onAdd}>Increment</button>
        <button onClick={onDec}>Decrement</button>
      </div>
    </>
  );
};

export default CounterDisplay_Red;
