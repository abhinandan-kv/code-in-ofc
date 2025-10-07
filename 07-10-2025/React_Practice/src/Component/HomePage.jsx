import React, { useEffect, useRef, useState } from "react";

const HomePage = () => {
  const [throttleVal, setThrottleVal] = useState();
  const lastThrottleTime = useRef();

  async function handleClick(...args) {
    console.log("Clicked");
  }
  async function throttleFn(fnName, delay) {
    const now = Date.now();
    if (now - lastThrottleTime >= delay) {
      console.log(delay);
      fnName();
      lastThrottleTime.current = now;
    }
  }

  return (
    <div>
      <button onClick={(e) => throttleFn(handleClick, 5000)} ref={lastThrottleTime}>
        Click
      </button>
    </div>
  );
};

export default HomePage;
