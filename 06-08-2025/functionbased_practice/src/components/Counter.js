import { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  function handleClick(e) {
    let operator = e.target.value;
    // eslint-disable-next-line
    setCounter(eval(`counter ${operator} 1`));
  }

  return (
    <>
      <div>
        <h2>- Counter -</h2>
        <span>{counter}</span>
        <br />
        <button value="+" onClick={handleClick}>
          +
        </button>
        <button value="-" onClick={handleClick}>
          -
        </button>
      </div>
    </>
  );
};

export default Counter;
