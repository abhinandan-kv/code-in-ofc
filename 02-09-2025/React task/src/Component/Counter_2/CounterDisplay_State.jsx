import React, { useState } from "react";

const CounterDisplay_State = ({onAdd, onDec}) => {

  return (
    <>
      <h1>State counters</h1>
      <div className="card">
        <button onClick={onAdd}>Increment</button>
        <button onClick={onDec}>Decrement</button>
      </div>
    </>
  );
};

export default CounterDisplay_State;
