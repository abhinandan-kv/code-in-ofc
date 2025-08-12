import { useRef } from "react";
import { Child4 } from "./child4";


export default function Parent4() {
  const inputRef = useRef(null);
  function handleClick() {
    inputRef.current.focus();
  }
  console.log(inputRef);
  return (
    <>
      {/* <input type="text" ref={inputRef} /> */}
      <Child4 ref={inputRef} /> 
      <button onClick={handleClick}>Focus to the input</button>
    </>
  );
}
