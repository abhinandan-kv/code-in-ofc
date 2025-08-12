import React from "react";

const Child2 = ({ onDataSend }) => {
  const dataToSend = " hello from child2";

  const sendDataToParent =()=>{
    onDataSend(dataToSend)
  }
  
  return (
    <>
      <button onClick={sendDataToParent}>Click me</button>
    </>
  );
};

export default Child2;
