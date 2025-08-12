import React, { useCallback, useState } from "react";
import Child2 from "./child2";

const Parent2 = () => {
  const [message, setMessage] = useState("");
  const handleChildData = (data) => {
    setMessage(data);
  };

  return (
    <>
      <div>
        <span>Child to parent passing demo</span>
        <h3>Message from Child :{message}</h3>
        <Child2 onDataSend={handleChildData} />
      </div>
    </>
  );
};

export default Parent2;
